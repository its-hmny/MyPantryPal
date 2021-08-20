// ------------------------------------------------------------------
// I m p o r t s
// ------------------------------------------------------------------
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";
import DatabaseConfig from "../data/database";
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
 * @return {Promise<GroceryList[]>}
 */
export const getGroceryLists = async () => {
  // Checks that the DB is open and working properly
  if (!database.isDBOpen()) throw Error(ERRORS.DATABASE_ERROR);
  // Executes the query
  const res = await database.query(`
    SELECT * FROM ${DB_TABLES.GROCERY_LIST}
    WHERE id != 0;
  `);
  return res.values;
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
  // Executes the query
  const res = await database.query(`
    INSERT INTO ${DB_TABLES.GROCERY_LIST} id, name
    VALUES("${id}", "${name}");
  `);
  // TODO CHECK
  return res.values;
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
  // TODO ADD MANUALLY CASCADING FOR QUANTITY RELATION
  await database.query(`
    DELETE FROM ${DB_TABLES.GROCERY_LIST}
    WHERE id != ${listId};
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
 * @return {Promise<Product>}
 */
export const getProductsBy = async (key: "name" | "barcode", value: string) => {
  // Checks that the DB is open and working properly
  if (!database.isDBOpen()) throw Error(ERRORS.DATABASE_ERROR);
  // Executes the query
  const res = await database.query(`
    SELECT * FROM ${DB_TABLES.PRODUCTS}
    WHERE ${key} == "${value}";
  `);
  return res.values;
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
