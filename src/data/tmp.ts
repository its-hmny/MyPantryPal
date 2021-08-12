import { GroceryList, Product } from "./interfaces";

export const TestProds: Product[] = [
  {
    name: "Salmone",
    description: "Il salmone e' buono",
    quantity: 2,
    barcode: "123",
    id: "KWBQFGJVNBIJvwef'N'nn'weosvn'RWN",
  },
  {
    name: "Carciofi",
    description: "I carciofi in lorem ipsum",
    quantity: 3,
    barcode: "124",
    id: "fbwfgbwfwbeiBFWIEBFjenf;",
  },
  {
    name: "Spaghetti Barilla nome molto lungo",
    description: "Per fare la carbonara che e' buonissima",
    quantity: 10,
    barcode: "126",
    id: "fbwfgbwrbga;rba;rgjaropgjn",
  },
];

export const TestGroceriesList: GroceryList[] = [
  {
    id: "13",
    name: "Lista della Coop con un nome molto lungo",
    date: 16663846738,
    products: [],
  },
  {
    id: "14",
    name: "Lista della Sma",
    products: TestProds.slice(0, 2),
  },
  {
    id: "15",
    name: "Lista dell'Esselunga",
    date: 166638463293923,
    products: TestProds,
  },
];
