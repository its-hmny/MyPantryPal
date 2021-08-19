import { DB_TABLES } from "./enum";

const DatabaseConfig = {
  database: "MyPantryPal",
  encrypted: false,
  version: 1,
  mode: "full",

  tables: [
    {
      name: DB_TABLES.PRODUCTS,
      schema: [
        { column: "id", value: "INTEGER UNIQUE PRIMARY KEY NOT NULL" },
        { column: "name", value: "TEXT UNIQUE NOT NULL" },
        { column: "description", value: "TEXT NOT NULL" },
        { column: "barcode", value: "TEXT NOT NULL" },
        { column: "img", value: "TEXT" },
      ],
      values: [],
    },

    {
      name: DB_TABLES.GROCERY_LIST,
      schema: [
        { column: "id", value: "INTEGER UNIQUE PRIMARY KEY NOT NULL" },
        { column: "name", value: "TEXT NOT NULL" },
      ],
      values: [
        [0, "My Pantry"],
        [1, "Macellaio"],
        [2, "Fruttivendolo"],
        [3, "Lista Conad"],
      ],
    },

    {
      name: DB_TABLES.QUANTITIES,
      schema: [
        { column: "listId", value: "INTEGER NOT NULL" },
        { column: "productId", value: "INTEGER NOT NULL" },
        { column: "quantity", value: "INTEGER NOT NULL" },
        //{
        //  foreignkey: "listId, productId",
        //  value: "REFERENCES GroceryLists(id), Products(id) ON DELETE CASCADE",
        //},
      ],
      values: [],
    },
  ],
};

export default DatabaseConfig;
