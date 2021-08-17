const DatabaseConfig = {
  database: "MyPantryPal",
  encrypted: false,
  version: 1,
  mode: "full",

  tables: [
    {
      name: "Products",
      schema: [
        { column: "id", value: "INTEGER PRIMARY KEY NOT NULL AUTOINCREMENT" },
        { column: "name", value: "TEXT NOT NULL" },
        { column: "description", value: "TEXT NOT NULL" },
        { column: "barcode", value: "TEXT NOT NULL" },
        { column: "img", value: "TEXT" },
      ],
    },

    {
      name: "GroceryLists",
      schema: [
        { column: "id", value: "INTEGER PRIMARY KEY NOT NULL AUTOINCREMENT" },
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
      name: "Quantities",
      schema: [
        { column: "listId", value: "TEXT FOREIGN KEY NOT NULL" },
        { column: "productId", value: "TEXT FOREIGN KEY NOT NULL" },
        { column: "quantity", value: "INTEGER" },
      ],
    },
  ],
};

export default DatabaseConfig;
