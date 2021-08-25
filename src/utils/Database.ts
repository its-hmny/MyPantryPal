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
 * TODO COMMENT
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

// ------------------------------------------------------------------
// P a n t r y
// ------------------------------------------------------------------
/**
 * TODO COMMENT
 * @function
 * @async
 *
 * @return {Promise<Product[] | undefined>}
 */
export const getPantryProduct = async () => {
  const res = await database.query(`
    SELECT * 
    FROM ${DB_TABLES.QUANTITIES} q, ${DB_TABLES.PRODUCTS} p 
    WHERE q.listId == "${USER_PANTRY_ID}" AND q.productId == p.id;
  `);

  // Then returns a comprehemsive payload interface compliant
  return res.values as Product[];
};

// ------------------------------------------------------------------
// G r o c e r y   L i s t s
// ------------------------------------------------------------------
/**
 * TODO COMMENT
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
          WHERE q.listId == "${list.id}" AND q.productId == p.id;
        `)
      ).values;
      // Then returns a comprehemsive payload interface compliant
      return { ...list, products } as GroceryList;
    })
  );
};

/**
 * TODO COMMENT
 * @function
 * @async
 *
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
      WHERE q.listId == "${listId}" AND q.productId == p.id;
    `)
    ).values || [];

  // Then returns a comprehemsive payload interface compliant
  return { ...list, products } as GroceryList;
};

/**
 * TODO COMMENT
 * @function
 * @async
 *
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
 * TODO COMMENT
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
 * TODO COMMENT
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
 * TODO COMMENT
 * @function
 * @async
 *
 * @return {Promise<string>} - Returns the new id
 */
export const insertProduct = async (prod: Product) => {
  // Destructures the list object
  const { name, description, barcode, img } = prod;

  // Id is autogenerated
  const buffer = new Uint32Array(1);
  window.crypto.getRandomValues(buffer);
  const newId = buffer[0].toString();

  // Executes the query
  await database.query(`
    INSERT INTO ${DB_TABLES.PRODUCTS} (id, name, description, barcode, img)
    VALUES(
      "${newId}", "${name}", "${description}", 
      "${barcode}", ${img ? `"${img}"` : "NULL"}
    );
  `);

  return newId;
};

/**
 * TODO COMMENT
 * @function
 * @async
 *
 * @param {string} productId - The uuid of the Product
 * @return {Promise<Product>}
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
 * TODO COMMENT
 * @function
 * @async
 *
 * @param {string} productId - The uuid of the Product
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
 * TODO COMMENT
 * @function
 * @async
 *
 * @return {Promise<void>}
 */
export const updateProduct = async (prod: Partial<Product>) => {
  // Destructures the list object
  const { id, name, description, barcode, img } = prod;
  if (!!id) {
    // Executes the query
    const res = await database.query(`
      UPDATE ${DB_TABLES.PRODUCTS}
      SET name = "${name}", barcode = "${barcode}", 
        img = ${img ? `"${img}"` : "NULL"}, description = "${description}",
        last_modified = (strftime('%s', 'now'))
      WHERE id == "${id}";
    `);
    return res.values;
  } else throw Error("Missing id for update operation");
};

// ------------------------------------------------------------------
// Q u a n t i t i e s
// ------------------------------------------------------------------
/**
 * TODO COMMENT
 * @function
 * @async
 *
 * @param {string} listId -
 * @param {string} productId -
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
