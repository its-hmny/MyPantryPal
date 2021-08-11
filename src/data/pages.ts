// -----------------------------------------------------------------
// I m p o r t s
// -----------------------------------------------------------------
import { ROUTES, ROUTE_KEYS } from "./enum";
import { Page } from "./interfaces";

import { home, fastFood, cart, person } from "ionicons/icons";

import DashboardView from "../pages/Dashboard";
import GroceryListDeatilsView from "../pages/GroceryListDetail";
import MyGroceryListsView from "../pages/MyGroceryLists";
import MyPantryView from "../pages/MyPantry";
import SignInView from "../pages/SignIn";
import SignUpView from "../pages/SignUp";
import UserProfileView from "../pages/UserProfile";

/**
 * An array with all the pages accessible from within the App
 */
const PAGES: { publicPages: Page[]; privatePages: Page[] } = {
  // Public Pages
  publicPages: [
    {
      //exact: true,
      path: ROUTES.SIGN_IN,
      key: ROUTE_KEYS.SIGN_IN,
      component: SignInView,
      //layout: IonPage,
    },
    {
      //exact: true,
      path: ROUTES.SIGN_UP,
      key: ROUTE_KEYS.SIGN_UP,
      component: SignUpView,
      //layout: IonPage,
    },
  ],

  // Private / Authenticated Pages
  privatePages: [
    {
      //exact: true,
      path: ROUTES.DASHBOARD,
      key: ROUTE_KEYS.DASHBOARD,
      component: DashboardView,
      //layout: IonPage,
      icon: home,
    },
    {
      //exact: true,
      path: ROUTES.MY_PANTRY,
      key: ROUTE_KEYS.MY_PANTRY,
      component: MyPantryView,
      //layout: IonPage,
      icon: fastFood,
    },
    {
      //exact: true,
      path: ROUTES.GROCERIES_LIST,
      key: ROUTE_KEYS.GROCERIES_LIST,
      component: MyGroceryListsView,
      //layout: IonPage,
      icon: cart,
    },
    {
      //exact: true,
      path: ROUTES.GROCERY_LIST_DETAILS,
      key: ROUTE_KEYS.GROCERY_LIST_DETAILS,
      component: GroceryListDeatilsView,
      //layout: IonPage,
    },
    {
      //exact: true,
      path: ROUTES.PROFILE,
      key: ROUTE_KEYS.PROFILE,
      component: UserProfileView,
      //layout: IonPage,
      icon: person,
    },
  ],
};

export default PAGES;
