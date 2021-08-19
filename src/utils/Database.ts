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
export let database: SQLiteDBConnection;

/**
 *
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

/**
 *
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
  return res.values ?? [];
};

/**
 *
 * @function
 * @async
 *
 * @return {Promise<void>}
 */
export const insertGroceryList = async (list: GroceryList) => {
  // Checks that the DB is open and working properly
  if (!database.isDBOpen()) throw Error(ERRORS.DATABASE_ERROR);
  // Destructures the list object
  const { id, name } = list;
  // Executes the query
  const res = await database.query(`
    INSERT INTO ${DB_TABLES.GROCERY_LIST} a, b, c
    VALUES(x, y, z);
  `);
  return res.values ?? [];
};

/**
 *
 * @function
 * @async
 *
 * @return {Promise<void>}
 */
export const updateProduct = async (list: Partial<Product>) => {
  // Checks that the DB is open and working properly
  if (!database.isDBOpen()) throw Error(ERRORS.DATABASE_ERROR);
  // Destructures the list object
  const { id: listId, ...others } = list;
  if (!!listId) {
    // Executes the query
    const res = await database.query(`
      UPDATE ${DB_TABLES.GROCERY_LIST}
      SET ${mapUpdateFields(others)}s
      WHERE id != ${listId};
    `);
    return res.values ?? [];
  } else throw Error("Missing id for update operation");
};
