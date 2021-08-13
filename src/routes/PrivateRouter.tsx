// ------------------------------------------------------------------
// I m p o r t s
// ------------------------------------------------------------------
import { useMemo } from "react";
import { Redirect, Route } from "react-router";
import {
  IonIcon,
  IonTabs,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
} from "@ionic/react";
import PAGES from "../data/pages";
import { ROUTES } from "../data/enum";

/**
 * Component that initializes the Routes (and pages based upon the
 * PAGES array)
 *
 * @component
 * @category Components
 * @subcategory Setup
 */
const PrivateRouter: React.FC = () => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s   &   H o o k s
  // -----------------------------------------------------------------
  // Extrapolates the private page array
  const { privatePages } = PAGES;

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------
  // Generate a route for each private page
  const privateRoutes = useMemo(
    () =>
      privatePages.map((page) => (
        <Route
          exact
          key={page.key}
          path={page.path}
          component={page.component}
        />
      )),
    [privatePages]
  );

  // Generate a TabBar button only for each route with an "icon" field defined
  const tabBarButtons = useMemo(
    () =>
      privatePages
        .filter((page) => !!page.icon)
        .map((page) => (
          <IonTabButton key={page.key} tab={page.key} href={page.path}>
            <IonIcon icon={page.icon} />
            <IonLabel>{page.key}</IonLabel>
          </IonTabButton>
        )),
    [privatePages]
  );

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // u s e E f f e c t
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // T e m p l a t e
  // -----------------------------------------------------------------
  return (
    <IonTabs>
      <IonRouterOutlet>
        {privateRoutes}
        <Redirect exact from="/" to={ROUTES.DASHBOARD} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">{tabBarButtons}</IonTabBar>
    </IonTabs>
  );
};

export default PrivateRouter;
