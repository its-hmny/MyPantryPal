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
  PROFILE = "/profile",
  SETTINGS = "/settings",
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
  GROCERIES_LIST = "Groceries List",
  PROFILE = "Profile",
  SETTINGS = "Settings",
}
