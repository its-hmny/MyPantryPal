// ------------------------------------------------------------------
// I m p o r t s
// ------------------------------------------------------------------
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";
import DatabaseConfig, { USER_PANTRY_ID } from "../data/dbConfig";
import { DB_TABLES } from "../data/enum";
import { GroceryList, Product } from "../data/interfaces";
import { readFromStorage, saveToStorage } from "./Storage";

// The shared database instance
export let database: SQLiteDBConnection;

/**
 * This function setup the database when called, if the dbConfig object
 * is undefined or the "setupDone" flag is set to false then the schema
 * is imported and all the previous data are deleted, upon completion the
 * database shared variable is set to refence the new DB
 * @function
 * @async
 */
export const initDatabase = async () => {
  // Create & setup a connection object
  const SQLite = new SQLiteConnection(CapacitorSQLite);
  const db = await SQLite.createConnection(
    "MyPantryPal",
    false,
    "no-encryption",
    1
  );

  // If the schema has been already imported from JSON and so the database
  // has been initialized this part is skipped since it overrides data
  const status = await readFromStorage<{ setupDone: boolean }>("dbConfig");
  if (!status?.setupDone) {
    // Import schema and default values
    await SQLite.importFromJson(JSON.stringify(DatabaseConfig));
    // Write in local storage that the database has been correctly initialized
    await saveToStorage("dbConfig", { setupDone: true });
  }

  // Open the database
  await db.open();
  // Update the shared instance
  database = db;
};

/**
 * This function removes all the record from the database, in fact
 * truncating the whole database and resetting it to an initial state
 * @function
 * @async
 *
 * @return {Promise<void>}
 */
export const truncateDatabase = async () => {
  // Database truncation promises
  const prodTruncate = await database.query(`
    DELETE FROM ${DB_TABLES.PRODUCTS} WHERE true;
  `);
  const listTruncate = await database.query(`
    DELETE FROM ${DB_TABLES.GROCERY_LIST} WHERE true;
  `);
  const qtyTruncate = await database.query(`
    DELETE FROM ${DB_TABLES.QUANTITIES} WHERE true;
  `);

  // Wait for completion of all truncation query
  await Promise.all([prodTruncate, listTruncate, qtyTruncate]);
};

// ------------------------------------------------------------------
// P a n t r y
// ------------------------------------------------------------------
/**
 * This function returns all the product (and the respective quantity)
 * present inside the Pantry
 * @function
 * @async
 *
 * @return {Promise<Product[]>}
 */
export const getPantryProduct = async () => {
  const res = await database.query(`
    SELECT * 
    FROM ${DB_TABLES.QUANTITIES} q, ${DB_TABLES.PRODUCTS} p 
    WHERE q.listId == "${USER_PANTRY_ID}" AND q.productId == p.id AND q.quantity != 0;
  `);

  // Then returns a comprehemsive payload interface compliant
  return res.values as Product[];
};

// ------------------------------------------------------------------
// G r o c e r y   L i s t s
// ------------------------------------------------------------------
/**
 * This function returns all the GroceryList avaiable to the user
 * with the respective Product (& quantities) inside them
 * @function
 * @async
 *
 * @return {Promise<GroceryList[] | undefined>}
 */
export const getGroceryLists = async () => {
  // Get a list of all the grocery list avaiaible
  const lists = (
    await database.query(`
      SELECT * FROM ${DB_TABLES.GROCERY_LIST}
      WHERE id != "${USER_PANTRY_ID}";
  `)
  ).values;

  if (!lists) return undefined;

  return await Promise.all(
    // Now for every list queries the products that are in them
    lists.map(async (list) => {
      const products = (
        await database.query(`
          SELECT * 
          FROM ${DB_TABLES.QUANTITIES} q, ${DB_TABLES.PRODUCTS} p 
          WHERE q.listId == "${list.id}" AND q.productId == p.id AND q.quantity != 0;
        `)
      ).values;
      // Then returns a comprehemsive payload interface compliant
      return { ...list, products } as GroceryList;
    })
  );
};

/**
 * This function returns all the data avaiable about a specific
 * GroceryList identified by the given id
 * @function
 * @async
 *
 * @param {string} listId - The id of the GroceryList
 * @return {Promise<GroceryList | undefined>}
 */
export const getGroceryList = async (listId: string) => {
  // Get a list of all the grocery list avaiaible
  const res = await database.query(`
    SELECT * FROM ${DB_TABLES.GROCERY_LIST}
    WHERE id == "${listId}";
  `);

  if (!res.values || !res.values.length) return undefined;

  const list = res.values[0];

  // Now queries the products that are in it
  const products =
    (
      await database.query(`
      SELECT * 
      FROM ${DB_TABLES.QUANTITIES} q, ${DB_TABLES.PRODUCTS} p 
      WHERE q.listId == "${listId}" AND q.productId == p.id AND q.quantity != 0;
    `)
    ).values || [];

  // Then returns a comprehemsive payload interface compliant
  return { ...list, products } as GroceryList;
};

/**
 * This function handles the creation of a new GroceryList entry
 * in the respective schema, a id isn't needed since is always
 * autogenerated by the function itself
 * @function
 * @async
 *
 * @param {Partial<GroceryList>} list - The data to be inserted
 * @return {Promise<any>}
 */
export const insertGroceryList = async (list: Partial<GroceryList>) => {
  // Destructures the list object
  const { name } = list;
  // Generate a uuid for the new list
  const buffer = new Uint32Array(1);
  window.crypto.getRandomValues(buffer);
  // Creates a new entry(
  await database.query(`
    INSERT INTO ${DB_TABLES.GROCERY_LIST} (id, name)
    VALUES("${buffer[0]}", "${name}");
  `);
};

/**
 * This function removes all the products added to a GroceryList
 * by the user leaving said list empty
 * @function
 * @async
 *
 * @param {string} listId - The id of the list to be deleted
 * @return {Promise<void>}
 */
export const truncateGroceryList = async (listId: string) => {
  // Removes all the entry with the same litId from the Quantities table
  await database.query(`
    DELETE FROM ${DB_TABLES.QUANTITIES}
    WHERE listId == ${listId} AND listId != 0;
  `);
};

/**
 * This methods handles the deletion of a GroceryList, at first
 * removing all the product added to it and then deleting the
 * GroceryList itself
 * @function
 * @async
 *
 * @param {string} listId - The id of the list to be deleted
 * @return {Promise<void>}
 */
export const deleteGroceryList = async (listId: string) => {
  // Empties at first the grocery list
  await truncateGroceryList(listId);
  // Then removes it from its SQL Table
  await database.query(`
    DELETE FROM ${DB_TABLES.GROCERY_LIST}
    WHERE id == ${listId} AND id != 0;
`);
};

// ------------------------------------------------------------------
// P r o d u c t s
// ------------------------------------------------------------------
/**
 * This function handles the creation a new product, the id isn't needed
 * since is autogenerated by the function but if present is used the given one
 * @function
 * @async
 *
 * @param {Product} prod - The data about the product
 * @return {Promise<string>} - Returns the new id
 */
export const insertProduct = async (prod: Product) => {
  // Destructures the list object
  let { id, name, description, barcode, img } = prod;

  if (!id) {
    // Id is autogenerated
    const buffer = new Uint32Array(1);
    window.crypto.getRandomValues(buffer);
    id = buffer[0].toString();
  }
  // Executes the query
  await database.query(`
    INSERT INTO ${DB_TABLES.PRODUCTS} (id, name, description, barcode, img)
    VALUES(
      "${id}", "${name}", "${description}", 
      "${barcode}", ${img ? `"${img}"` : "NULL"}
    );
  `);

  return id;
};

/**
 * This function returns a copy of the product record in the database
 * if the id doesn't match a record in the DB then undefined is returned
 * @function
 * @async
 *
 * @param {string} productId - The uuid of the Product
 * @return {Promise<Product | undefined>}
 */
export const getProduct = async (productId: string) => {
  // Executes the query
  const res = await database.query(`
    SELECT * FROM ${DB_TABLES.PRODUCTS}
    WHERE id == "${productId}";
  `);

  // Check return value by the query
  if (!res.values || !res.values[0]) return undefined;
  return res.values[0] as Product;
};

/**
 * Thsi function returns a list of product filtered by the field name
 * and value given to it as arguments
 * @function
 * @async
 *
 * @param {"name" | "barcode"} key - The field to be searched
 * @param {string} value - The value/pattern to be searched
 * @return {Promise<Product[]>}
 */
export const getProductsBy = async (key: "name" | "barcode", value: string) => {
  // Executes the query
  const res = await database.query(`
    SELECT * FROM ${DB_TABLES.PRODUCTS}
    WHERE ${key} == "${value}";
  `);

  return res.values as Product[];
};

/**
 * Thsi function takes in input a Product object and updates the
 * respective record in the Database, if a id isn't provided in
 * the object then an error is throwed
 * @function
 * @async
 *
 * @param {Product} prod - The patch to be applied
 * @return {Promise<void>}
 */
export const updateProduct = async (prod: Product) => {
  // Destructures the list object
  const { id, name, description, barcode, img } = prod;
  if (!!id) {
    // Executes the query
    await database.query(`
      UPDATE ${DB_TABLES.PRODUCTS}
      SET name = "${name}", barcode = "${barcode}", 
        img = ${img ? `"${img}"` : "NULL"}, description = "${description}",
        last_modified = (strftime('%s', 'now'))
      WHERE id == "${id}";
    `);
  } else throw Error("Missing id for update operation");
};

// ------------------------------------------------------------------
// Q u a n t i t i e s
// ------------------------------------------------------------------
/**
 * This function changes the quantity registred for a given product and
 * list if the ids don't match any record then the query just ignores it
 * @function
 * @async
 *
 * @param {string} listId - The id of the list
 * @param {string} productId - The id of the product
 * @param {number} diff - A (signed) integer to increment/decrement
 */
export const changeQuantitytyInList = async (
  listId: string,
  productId: string,
  diff: number
) => {
  // Const get the previous data (if existent)
  const [previous] =
    (
      await database.query(`
        SELECT *
        FROM ${DB_TABLES.QUANTITIES}
        WHERE listId = "${listId}" AND productId = "${productId}" 
      `)
    ).values ?? [];

  // If a previous record is defined then update that
  if (!!previous) {
    await database.query(`
      UPDATE ${DB_TABLES.QUANTITIES}
      SET quantity = ${previous.quantity + diff},
        last_modified = (strftime('%s', 'now'))
      WHERE listId == "${listId}" AND productId == "${productId}";
    `);
  } else {
    // Generate a uuid for the new list
    const buffer = new Uint32Array(1);
    window.crypto.getRandomValues(buffer);
    // Else create it from scratch
    await database.query(`
      INSERT INTO ${DB_TABLES.QUANTITIES} (id, listId, productId, quantity)
      VALUES("${buffer[0]}", "${listId}", "${productId}", ${diff});
    `);
  }
};
