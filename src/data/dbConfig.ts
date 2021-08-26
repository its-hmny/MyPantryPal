import { DB_TABLES } from "./enum";

export const USER_PANTRY_ID = "0";

const DatabaseConfig = {
  database: "MyPantryPal",
  encrypted: false,
  version: 1,
  mode: "partial",

  tables: [
    {
      name: DB_TABLES.PRODUCTS,
      schema: [
        { column: "id", value: "TEXT UNIQUE PRIMARY KEY NOT NULL" },
        { column: "name", value: "TEXT UNIQUE NOT NULL" },
        { column: "description", value: "TEXT NOT NULL" },
        { column: "barcode", value: "TEXT NOT NULL" },
        { column: "img", value: "TEXT" },
        {
          column: "last_modified",
          value: "INTEGER DEFAULT (strftime('%s', 'now'))",
        },
      ],
      values: [],
    },

    {
      name: DB_TABLES.GROCERY_LIST,
      schema: [
        { column: "id", value: "TEXT UNIQUE PRIMARY KEY NOT NULL" },
        { column: "name", value: "TEXT NOT NULL" },
      ],
      values: [],
    },

    {
      name: DB_TABLES.QUANTITIES,
      schema: [
        { column: "id", value: "INTEGER UNIQUE PRIMARY KEY NOT NULL" },
        { column: "listId", value: "TEXT NOT NULL" },
        { column: "productId", value: "TEXT NOT NULL" },
        { column: "quantity", value: "INTEGER NOT NULL" },
        {
          column: "last_modified",
          value: "INTEGER DEFAULT (strftime('%s', 'now'))",
        },
      ],
      values: [],
    },
  ],
};

export default DatabaseConfig;
