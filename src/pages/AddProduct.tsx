// -----------------------------------------------------------------
// I m p o r t s
// -----------------------------------------------------------------
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { qrCode } from "ionicons/icons";
import { useEffect, useState } from "react";
import ProductCards from "../components/ProductCards";
import ProductForm from "../components/ProductForm";
import { ERRORS } from "../data/enum";
import { Product } from "../data/interfaces";
import { TestProds } from "../data/tmp";
import { getProductWithBarcode } from "../utils/WebService";

// ------------------------------------------------------------------
// I n t e r f a c e s
// ------------------------------------------------------------------
interface Props {
  accessToken: string;
  onComplete: () => Promise<void> | void;
  onCancel: () => Promise<void> | void;
}

/**
 * This View present the user two different interfaces to add a product
 * for the first time to their Pantry, the user can scan the barcode and then
 * clone/fork the product from the hints presented or alternatively if no
 * hint is correct the user can upload from scratch the new products
 *
 * @component
 * @category Components
 * @subcategory View
 */
const AddProdctView: React.FC<Props> = (props) => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------
  // Retrieves data from the parent component
  const { accessToken, onComplete, onCancel } = props;

  // Helper function to present alert dialog to the user
  const [showAlert] = useIonAlert();

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------
  // Internal state representing the current active tab
  const [activeTab, setTab] = useState<string>("import");

  // "Buffer" containing the local prouct hints (the product with the same barcode in the Database)
  const [localHints, setLocalHints] = useState<Product[]>([]);
  // "Buffer" containing the WebService prouct hints
  const [webServiceHints, setWebServiceHints] = useState<Product[]>([]);

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------
  /**
   * This function start the barcode scanning process and then, if the scan
   * has found a barcode then the product hints are updated based upon the
   * newly scanned barcode
   * @function
   * @async
   */
  const onStartScan = async () => {
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

      // If the result has content, then updates the product hint
      if (result.hasContent) updateProductHint(result.content);
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

  /**
   * This function updates both the local and webservice product hints
   * whenever called, if no barcode is provided then the function
   * resets the hints to empty arrays and returns
   * @function
   * @async
   *
   * @param  {string | undefined | null} barcode - The barcode
   */
  const updateProductHint = async (barcode?: string | null) => {
    if (!barcode) {
      setWebServiceHints([]);
      setLocalHints([]);
      return;
    }

    // Search in the local DB for a match
    // TODO IMPLEMENT
    setLocalHints(TestProds);

    // If no match is found then ask the WebService
    const res = await getProductWithBarcode(accessToken, barcode);
    setWebServiceHints(res.products);
  };

  /**
   * This function handles the forking of a new product selected by the
   * user and adds it to the Pantry (default quanity: 1), the product
   * can now evolve indipendently from is "origin"
   * @function
   * @async
   */
  const onHintSelected = async () => {
    // TODO IMPLEMENT
    console.log("BP__ onHintSelected");
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
    <IonPage>
      {/* Page header */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start" color="primary">
            <IonButton onClick={onCancel}>Close</IonButton>
          </IonButtons>
          <IonTitle>New grocery list</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSegment
            value={activeTab}
            onIonChange={(e) => setTab(e.detail.value ?? "import")}
          >
            <IonSegmentButton value="import">
              <IonLabel>Import</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="create">
              <IonLabel>Create</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      {/* Page main content, the form in which the data can be set */}
      <IonContent>
        {activeTab === "import" && (
          <>
            <IonList inset>
              <IonItem>
                <IonLabel>Barcode:</IonLabel>
                <IonInput
                  name="barcode"
                  debounce={500}
                  inputMode="text"
                  onIonChange={(e) => updateProductHint(e.detail.value)}
                />
                <IonIcon icon={qrCode} onClick={onStartScan} />
              </IonItem>
            </IonList>

            <IonListHeader>Your products:</IonListHeader>
            <ProductCards products={localHints} onCardSelected={alert} />

            <IonListHeader>Product shared by other users:</IonListHeader>
            <ProductCards
              products={webServiceHints}
              onCardSelected={console.log}
            />
          </>
        )}

        {activeTab === "create" && <ProductForm onSave={console.log} />}
      </IonContent>
    </IonPage>
  );
};

export default AddProdctView;
