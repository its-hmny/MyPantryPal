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
  GROCERIES_LIST = "/groceries-list",
  GROCERY_LIST_DETAILS = "/groceries-list/:id",
  PROFILE = "/profile",
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
  GROCERIES_LIST = "Grocery Lists",
  GROCERY_LIST_DETAILS = "Grocery List Details",
  PROFILE = "Profile",
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
}
