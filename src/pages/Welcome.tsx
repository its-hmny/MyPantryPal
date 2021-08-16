// -----------------------------------------------------------------
// I m p o r t s
// -----------------------------------------------------------------
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { IonButton, IonContent, IonPage, useIonAlert } from "@ionic/react";
import { useHistory } from "react-router";
import { ERRORS } from "../data/enum";

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
  // Helper function to present alert dialog to the user
  const [showAlert] = useIonAlert();

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------
  const startScan = async () => {
    try {
      // Ask and check for user permission
      const { granted } = await BarcodeScanner.checkPermission({ force: true });
      if (!granted) throw Error(ERRORS.PERMISSION_ERROR);

      // Make background of WebView transparent
      BarcodeScanner.hideBackground();
      // Start scanning and wait for a result
      const result = await BarcodeScanner.startScan();

      // If the result has content
      if (result.hasContent) {
        showAlert({ message: result.content });
      }
    } catch (err) {
      // Presents an error message to the user
      showAlert({
        header: "Error",
        message: err.message,
        buttons: ["Ok"],
      });
    }
  };

  // -----------------------------------------------------------------
  // u s e E f f e c t
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // T e m p l a t e
  // -----------------------------------------------------------------
  return (
    <IonPage>
      <IonContent>
        <p>Welcome! This a test view</p>
        <IonButton onClick={startScan}>Scan Barcode</IonButton>
        <p>{`You're currently on the route ${history.location.pathname}`}</p>
      </IonContent>
    </IonPage>
  );
};

export default WelcomeView;
