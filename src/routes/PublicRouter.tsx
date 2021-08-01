// ------------------------------------------------------------------
// I m p o r t s
// ------------------------------------------------------------------
import { useMemo } from "react";
import { Redirect, Route } from "react-router";
import { IonRouterOutlet } from "@ionic/react";

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
const PublicRouter: React.FC = () => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s   &   H o o k s
  // -----------------------------------------------------------------
  const { publicPages } = PAGES;

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------
  const publicRoutes = useMemo(
    () =>
      publicPages.map((page) => (
        <Route
          exact
          key={page.key}
          path={page.path}
          component={page.component}
        />
      )),
    [publicPages]
  );

  // -----------------------------------------------------------------
  // R e n d e r   m e t h o d s
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // u s e E f f e c t
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // T e m p l a t e
  // -----------------------------------------------------------------
  return (
    <IonRouterOutlet>
      {publicRoutes}
      <Redirect exact from="/" to={ROUTES.SIGN_IN} />
    </IonRouterOutlet>
  );
};

export default PublicRouter;
