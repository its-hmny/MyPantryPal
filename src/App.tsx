// ------------------------------------------------------------------
// I m p o r t s
// ------------------------------------------------------------------
import { IonApp } from "@ionic/react";

import { AuthProvider } from "./providers/AuthProvider";
import RouteInitializer from "./routes/RouteInitializer";

// ------------------------------------------------------------------
// S t y l e s
// ------------------------------------------------------------------
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Import some global styling rules */
import "./theme/styles.css";

const App: React.FC = () => (
  <IonApp>
    <AuthProvider>
      <RouteInitializer />
    </AuthProvider>
  </IonApp>
);

export default App;
