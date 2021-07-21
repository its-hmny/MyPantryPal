// ------------------------------------------------------------------
// I m p o r t s
// ------------------------------------------------------------------
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import { ROUTES, ROUTE_KEYS } from "../data/enum";

import PAGES from "../data/pages";

/**
 * Component that initializes the Routes (and pages based upon the
 * PAGES array)
 *
 * @component
 * @category Components
 * @subcategory Setup
 */
const RouteInitializer: React.FC = ({ children }) => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // N a v i g a t i o n   v a r s
  // -----------------------------------------------------------------

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
      <IonTabs>
        <IonRouterOutlet>
          {PAGES.map((page) => (
            <Route
              key={page.key}
              exact={page.exact}
              path={page.path}
              component={() => (
                <page.layout>
                  <page.component />
                </page.layout>
              )}
            />
          ))}
          
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          {PAGES.filter((page) => page.auth).map((page) => (
            <IonTabButton tab={page.key} href={page.path}>
              <IonIcon icon={page.icon} />
              <IonLabel>{page.path}</IonLabel>
            </IonTabButton>
          ))}
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default RouteInitializer;
