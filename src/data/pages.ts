// -----------------------------------------------------------------
// I m p o r t s
// -----------------------------------------------------------------
import { home, fastFood, cart, person, terminal } from "ionicons/icons";

import DashboardView from "../pages/Dashboard";
import GroceryListDeatilsView from "../pages/GroceryListDetail";
import MyGroceryListsView from "../pages/MyGroceryLists";
import MyPantryView from "../pages/MyPantry";
import SignInView from "../pages/SignIn";
import SignUpView from "../pages/SignUp";
import UserProfileView from "../pages/UserProfile";
import WelcomeView from "../pages/Welcome";

import { ROUTES, ROUTE_KEYS } from "./enum";
import { Page } from "./interfaces";

/**
 * An array with all the pages accessible from within the App
 */
const PAGES: { publicPages: Page[]; privatePages: Page[] } = {
  // Public Pages
  publicPages: [
    {
      path: ROUTES.SIGN_IN,
      key: ROUTE_KEYS.SIGN_IN,
      component: SignInView,
    },
    {
      path: ROUTES.SIGN_UP,
      key: ROUTE_KEYS.SIGN_UP,
      component: SignUpView,
    },
  ],

  // Private / Authenticated Pages
  privatePages: [
    {
      path: ROUTES.DASHBOARD,
      key: ROUTE_KEYS.DASHBOARD,
      component: DashboardView,
      icon: home,
    },
    {
      path: ROUTES.MY_PANTRY,
      key: ROUTE_KEYS.MY_PANTRY,
      component: MyPantryView,

      icon: fastFood,
    },
    {
      path: ROUTES.GROCERIES_LIST,
      key: ROUTE_KEYS.GROCERIES_LIST,
      component: MyGroceryListsView,
      icon: cart,
    },
    {
      path: ROUTES.GROCERY_LIST_DETAILS,
      key: ROUTE_KEYS.GROCERY_LIST_DETAILS,
      component: GroceryListDeatilsView,
    },
    {
      path: ROUTES.PROFILE,
      key: ROUTE_KEYS.PROFILE,
      component: UserProfileView,
      icon: person,
    },
    {
      path: ROUTES.DEBUG,
      key: ROUTE_KEYS.DEBUG,
      component: WelcomeView,
      icon: terminal,
    },
  ],
};

export default PAGES;
