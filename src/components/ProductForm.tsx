// ------------------------------------------------------------------
// I m p o r t s
// ------------------------------------------------------------------
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonFooter,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonText,
  IonTextarea,
  useIonAlert,
} from "@ionic/react";
import { save, close, qrCode } from "ionicons/icons";
import { useState, useMemo } from "react";
import { ERRORS } from "../data/enum";
import { GenericObject, Product } from "../data/interfaces";
import CameraFab from "./CameraFab";

// ------------------------------------------------------------------
// I n t e r f a c e s
// ------------------------------------------------------------------
interface Props {
  // Initial and optional product data to be used by the form (for update)
  product?: Product;
  onSave: (product: Product) => void | Promise<void>;
  onDiscard: () => void | Promise<void>;
}

/**
 * This fragment handles the form rendering that lets the user update
 * or create a new Product, it handles directly the database update and
 * call the callback upon completion
 *
 * @component
 * @category Components
 * @subcategory Fragment
 */
const ProductForm: React.FC<Props> = ({ product, onSave, onDiscard }) => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------
  // Helper function to present an alert dialog to the user
  const [showAlert] = useIonAlert();

  // Default values for the form
  const defaultValues = {
    id: "",
    name: "",
    description: "",
    barcode: "",
  };

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------
  // Internal state where all the data written in the form are saved
  const [formData, setFormData] = useState<Product>(product ?? defaultValues);

  // This memoized result is the image to be displayed in the card, it
  // could either be the previous/current product image or a placeholder
  const productImage = useMemo(() => {
    if (!!formData?.img) return `data:image/*;base64,${formData.img}`;
    else return `${process.env.PUBLIC_URL}/assets/icon/prod_placeholder.png`;
  }, [formData?.img]);

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------
  /**
   * A function that handles the change event trigger by a form item
   * it expects that any form item has its own name attribute and
   * that the same name is used to update the value
   * @function
   *
   * @param {GenricObject} e - The event object as returned by the components
   */
  const handleChange = (e: GenericObject) => {
    if (!!e.target)
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * This function start the barcode scanning process and then, if the scan
   * has found a barcode sets the respective fields in the form properly
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

      // If the result has content, then updates the value in the form
      if (result.hasContent) {
        handleChange({ target: { name: "barcode", value: result.content } });
      }
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
   * This methods handles wraps the onSubmit method passed by the parant
   * component, it handles the render of a loading alert to the user and
   * eventually an error alert if something has gone wrong during the onSubmit()
   * @function
   * @async
   */
  const onSubmit = async () => {
    try {
      const { name, description, barcode } = formData;
      if (!!name && !!barcode && !!description) {
        await onSave(formData);
      } else throw Error(ERRORS.REQURED_DATA);
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
    <>
      <IonCard className="product_form">
        <IonCardHeader>
          <IonAvatar>
            <img src={productImage} />
          </IonAvatar>
          <IonCardTitle>Manage prouct</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonText>
            Here you can manage some data about the product changing, for
            example, the name or the photo
          </IonText>

          {/* The form container */}
          <IonList inset>
            <IonItem>
              <IonLabel>Name:</IonLabel>
              <IonInput
                required
                name="name"
                inputMode="text"
                autocapitalize="words"
                value={formData.name}
                onIonChange={handleChange}
              />
            </IonItem>
            <IonItem>
              <IonLabel>Barcode:</IonLabel>
              <IonInput
                required
                name="barcode"
                inputMode="text"
                value={formData.barcode}
                onIonChange={handleChange}
              />
              <IonIcon icon={qrCode} onClick={onStartScan} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Description:</IonLabel>
              <IonTextarea
                name="description"
                inputMode="text"
                value={formData.description}
                onIonChange={handleChange}
              />
            </IonItem>
          </IonList>
        </IonCardContent>
      </IonCard>

      <CameraFab
        onPhotoTaken={(photo) =>
          // Creates a mock event-like object and pass it to the generic event handler
          handleChange({ target: { name: "img", value: photo.base64String } })
        }
      />

      <IonFooter>
        <IonRow className="ion-justify-content-evenly">
          <IonButton color="danger" onClick={onDiscard}>
            <IonIcon icon={close} /> Cancel
          </IonButton>
          <IonButton onClick={onSubmit}>
            <IonIcon icon={save} /> Save
          </IonButton>
        </IonRow>
      </IonFooter>
    </>
  );
};

export default ProductForm;
