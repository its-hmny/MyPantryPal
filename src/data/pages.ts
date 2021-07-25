// -----------------------------------------------------------------
// I m p o r t s
// -----------------------------------------------------------------
import SignInView from "../pages/auth/SignIn";
import SignUpView from "../pages/auth/SignUp";
import WelcomeView from "../pages/Welcome";

import { ROUTES, ROUTE_KEYS } from "./enum";
import { Page } from "./interfaces";

import { triangle } from "ionicons/icons";

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
      path: ROUTES.HOME,
      key: ROUTE_KEYS.HOME,
      component: WelcomeView,
      //layout: IonPage,
      icon: triangle,
    },
  ],
};

export default PAGES;
