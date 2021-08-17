// -----------------------------------------------------------------
// I m p o r t s
// -----------------------------------------------------------------
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { IonButton, IonIcon, useIonAlert } from "@ionic/react";
import { qrCode } from "ionicons/icons";
import { useEffect } from "react";
import { ERRORS } from "../data/enum";

/**
 * TODO COMMENT
 *
 * @component
 * @category Components
 * @subcategory Fragment
 */
const ScanBarcode: React.FC = () => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------
  // Helper function to present alert dialog to the user
  const [showAlert] = useIonAlert();

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------
  const scanBarcode = async () => {
    try {
      // Ask and check for user permission
      const { granted } = await BarcodeScanner.checkPermission({ force: true });
      if (!granted) throw Error(ERRORS.PERMISSION_ERROR);

      // Hides all the WebView from user eyes, in order to let the user
      // see the ScannerView below
      document.body.style.background = "transparent";
      document.body.style.opacity = "0";
      BarcodeScanner.hideBackground();

      // Start scanning and wait for a result
      const result = await BarcodeScanner.startScan();

      // If the result has content
      if (result.hasContent) return;
    } catch (err) {
      // Presents an error message to the user
      showAlert({
        header: "Error",
        message: err.message,
        buttons: ["Ok"],
      });
    } finally {
      // Reverts the WebView to the previous settings
      document.body.style.background = "";
      document.body.style.opacity = "1";
      BarcodeScanner.showBackground();
    }
  };

  // -----------------------------------------------------------------
  // u s e E f f e c t
  // -----------------------------------------------------------------
  // onComponentMount prepare the barcode scanner in order to reduce
  // wait time before user
  useEffect(() => {
    BarcodeScanner.prepare();
  }, []);

  // -----------------------------------------------------------------
  // T e m p l a t e
  // -----------------------------------------------------------------
  return (
    <IonButton onClick={scanBarcode}>
      <IonIcon icon={qrCode} />
      Scan barcode
    </IonButton>
  );
};

export default ScanBarcode;
