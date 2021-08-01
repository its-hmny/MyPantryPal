// ------------------------------------------------------------------
// I m p o r t s
// ------------------------------------------------------------------
import { IonReactRouter } from "@ionic/react-router";
import { useEffect } from "react";
import { Route } from "react-router";
import { useAuth } from "../providers/AuthProvider";

import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";

/**
 * Component that initializes the Routes (and pages based upon the
 * PAGES array)
 *
 * @component
 * @category Components
 * @subcategory Setup
 */
const RouteInitializer: React.FC = () => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------
  // Determine if there's a user session avaiable
  const { isLoggedIn } = useAuth();

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------

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
    <IonReactRouter>
      <Route
        exact
        path="*"
        component={isLoggedIn ? PrivateRouter : PublicRouter}
      />
    </IonReactRouter>
  );
};

export default RouteInitializer;
