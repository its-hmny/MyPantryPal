/**
 * E N U M S
 */

/**
 * Enum containing every route reachable from the App
 * @enum {string}
 * @alias Routes
 *
 * @category Enum
 */
export enum ROUTES {
  // PUBLIC ROUTES
  SIGN_IN = "/sign-in",
  SIGN_UP = "/sign-up",

  // PRIVATE ROUTES
  DASHBOARD = "/dashboard",
  MY_PANTRY = "/my-pantry",
  PRODUCT_DETAILS = "/product/:id",
  GROCERIES_LIST = "/groceries-list",
  GROCERY_LIST_DETAILS = "/groceries-list/:id",
  PROFILE = "/profile",
  DEBUG = "/debug",
}

/**
 * Enum containing a key for every route
 * @enum {string}
 * @alias RouteKeys
 *
 * @category Enum
 */
export enum ROUTE_KEYS {
  // PUBLIC ROUTES
  SIGN_IN = "Sign In",
  SIGN_UP = "Sign Up",

  // PRIVATE ROUTES
  DASHBOARD = "Dashboard",
  MY_PANTRY = "My Pantry",
  PRODUCT_DETAILS = "Product",
  GROCERIES_LIST = "Grocery Lists",
  GROCERY_LIST_DETAILS = "Grocery List Details",
  PROFILE = "Profile",
  DEBUG = "Debug",
}

/**
 * Enum possible error message to be showed to the user
 * @enum {string}
 * @alias Errors
 *
 * @category Enum
 */
export enum ERRORS {
  GENERAL_ERROR = "We're sorry, something went wrong. Please try again later",
  REQURED_DATA = "Some required fields are empty, plase fill them up",
  LOGIN_ERROR = "There was an error and we couldn't complete the login. Please check your credentials",
  SIGNUP_ERROR = "There was an error and we couldn't complete registration process. Please try again later",
  DATABASE_ERROR = "There was an error ith the Database setup",
  PERMISSION_ERROR = "Please grant permission requested in order to use this functionality",
  PANTRY_NOT_FOUND = "Oops, couldn't find your pantry, please try again later",
  LIST_NOT_FOUND = "Oops, couldn't find the Grocery List you're looking for!",
  PRODUCT_NOT_FOUND = "Oops, couldn't find the Product you're looking for!",
}

/**
 * Enum of avaiable tables in SQLite database
 * @enum {string}
 * @alias DatabaseTables
 *
 * @category Enum
 */
export enum DB_TABLES {
  PRODUCTS = "Products",
  GROCERY_LIST = "GroceryLists",
  QUANTITIES = "Quantities",
}
