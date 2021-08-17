// ------------------------------------------------------------------
// I m p o r t s
// ------------------------------------------------------------------
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";
import DatabaseConfig from "../data/database";
import { ERRORS } from "../data/enum";

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

export const getGroceryLists = async () => {
  if (!database.isDBOpen()) 
    throw Error(ERRORS.DATABASE_ERROR);

  database.query("SELECT * FROM GroceryLists;");
};
