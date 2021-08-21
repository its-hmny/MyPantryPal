// ------------------------------------------------------------------
// I m p o r t s
// ------------------------------------------------------------------
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";
import DatabaseConfig, { USER_PANTRY_ID } from "../data/database";
import { DB_TABLES, ERRORS } from "../data/enum";
import { GroceryList, Product } from "../data/interfaces";

// The shared database instance
let database: SQLiteDBConnection;

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
  // Import schema and default values
  await SQLite.importFromJson(JSON.stringify(DatabaseConfig));
  // Open the database
  await db.open();
  // Update the shared instance
  database = db;
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
  // Checks that the DB is open and working properly
  if (!database.isDBOpen()) throw Error(ERRORS.DATABASE_ERROR);

  // Get a list of all the grocery list avaiaible
  const lists = (
    await database.query(`
    SELECT * FROM ${DB_TABLES.GROCERY_LIST}
    WHERE id != ${USER_PANTRY_ID};
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
      WHERE q.listId == ${list.id} AND q.productId == p.id;
    `)
      ).values;
      // Then returns a comprehemsive payload interface compliant
      return { ...list, products };
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
  // Checks that the DB is open and working properly
  if (!database.isDBOpen()) throw Error(ERRORS.DATABASE_ERROR);

  // Get a list of all the grocery list avaiaible
  const res = await database.query(`
    SELECT * FROM ${DB_TABLES.GROCERY_LIST}
    WHERE id == ${listId};
  `);

  if (!res.values || !res.values[0]) return undefined;

  const list = res.values[0];
  // Now queries the products that are in it
  const products =
    (
      await database.query(`
      SELECT * 
      FROM ${DB_TABLES.QUANTITIES} q, ${DB_TABLES.PRODUCTS} p 
      WHERE q.listId == ${listId} AND q.productId == p.id;
    `)
    ).values || [];

  // Then returns a comprehemsive payload interface compliant
  return { ...list, products };
};

/**
 * TODO COMMENT
 * @function
 * @async
 *
 * @return {Promise<any>}
 */
export const insertGroceryList = async (list: GroceryList) => {
  // Checks that the DB is open and working properly
  if (!database.isDBOpen()) throw Error(ERRORS.DATABASE_ERROR);
  // Destructures the list object
  const { id, name } = list;
  // Creates a new entry
  // TODO MANAGE id generation
  await database.query(`
    INSERT INTO ${DB_TABLES.GROCERY_LIST} id, name
    VALUES("${id}", "${name}");
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
  // Checks that the DB is open and working properly
  if (!database.isDBOpen()) throw Error(ERRORS.DATABASE_ERROR);

  // Executes the query
  await database.query(`
    DELETE FROM ${DB_TABLES.QUANTITIES}
    WHERE listId == ${listId} AND listId != 0;
  `);

  // Executes the query
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
 * @return {Promise<void>}
 */
export const insertProduct = async (list: Product) => {
  // Checks that the DB is open and working properly
  if (!database.isDBOpen()) throw Error(ERRORS.DATABASE_ERROR);
  // Destructures the list object
  const { id, name, description, barcode, img } = list;
  // Executes the query
  const res = await database.query(`
    INSERT INTO ${DB_TABLES.PRODUCTS} id, name, description, barcode, img
    VALUES(
      "${id}", "${name}", "${description}", "${barcode}", "${img ?? "NULL"}"
    );
  `);
  // TODO CHECK
  return res.values;
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
  // Checks that the DB is open and working properly
  if (!database.isDBOpen()) throw Error(ERRORS.DATABASE_ERROR);
  // Executes the query
  const res = await database.query(`
    SELECT * FROM ${DB_TABLES.PRODUCTS}
    WHERE id == "${productId}";
  `);
  return res.values;
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
  // Checks that the DB is open and working properly
  if (!database.isDBOpen()) throw Error(ERRORS.DATABASE_ERROR);
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
export const updateProduct = async (list: Partial<Product>) => {
  // Checks that the DB is open and working properly
  if (!database.isDBOpen()) throw Error(ERRORS.DATABASE_ERROR);
  // Destructures the list object
  const { id, name } = list;
  if (!!id) {
    // Executes the query
    const res = await database.query(`
      UPDATE ${DB_TABLES.GROCERY_LIST}
      SET name="${name}"
      WHERE id != ${id};
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
const addToList = async (listId: string, productId: string) => {};

/**
 * TODO COMMENT
 * @function
 * @async
 *
 * @param {string} listId -
 * @param {string} productId -
 */
const removeFromList = async (listId: string, productId: string) => {};

/**
 * TODO COMMENT
 * @function
 * @async
 *
 * @param {string} listId -
 */
const evadeList = async (listId: string) => {};
