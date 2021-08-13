// -----------------------------------------------------------------
// I m p o r t s
// -----------------------------------------------------------------
import { IonPage } from "@ionic/react";
import { useHistory } from "react-router";

/**
 * Component that shows to the user a simple text with debugging
 * pourposes
 *
 * @component
 * @category Components
 * @subcategory View
 */
const WelcomeView: React.FC = () => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------
  // Access the history stack of the browser/phone
  const history = useHistory();

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------

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
    <IonPage>
      <p>Welcome! This a test view</p>
      <p>{`You're currently on the route ${history.location.pathname}`}</p>
    </IonPage>
  );
};

export default WelcomeView;
