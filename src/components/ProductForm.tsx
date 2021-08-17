// ------------------------------------------------------------------
// I m p o r t s
// ------------------------------------------------------------------
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
  useIonLoading,
} from "@ionic/react";
import { save, close } from "ionicons/icons";
import { useState, useMemo } from "react";
import { ERRORS } from "../data/enum";
import { Product } from "../data/interfaces";
import CameraFab from "./CameraFab";

// ------------------------------------------------------------------
// I n t e r f a c e s
// ------------------------------------------------------------------
interface Props {
  // Initial and optional product data to be used by the form (for update)
  product?: Product;
  onSave: (product: Product) => void | Promise<void>;
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
const ProductForm: React.FC<Props> = ({ product, onSave }) => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------
  // Helper function to present an alert dialog to the user
  const [showAlert] = useIonAlert();
  // Helper function to present a loding popup to the user
  const [showLoading, dismissLoading] = useIonLoading();

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
   * TODO REMOVE ANY ANNOTATION
   */
  const handleChange = (e: any) => {
    if (!!e.target)
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    // TODO REMOVE
    console.log("BP__ onChange", e.target.name, e.target.value);
  };

  /**
   * This methods handles wraps the onSubmit method passed by the parant
   * component, it handles the render of a loading alert to the user and
   * eventually an error alert if something has gone wrong during the onSubmit()
   * @function
   * @async
   */
  const onSubmit = async () => {
    // Creates and renders the loading dialog/modal
    showLoading("Loading...");
    try {
      // TODO ADD VALIDATIONs
      if (true) {
        // TODO save the product on the Database
        await onSave(formData);
      } else throw Error(ERRORS.REQURED_DATA);
    } catch (err) {
      // Presents an error message to the user
      showAlert({
        header: "Error",
        message: err.message,
        buttons: ["Ok"],
      });
    } finally {
      // Removes the loading spinner
      dismissLoading();
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
            <IonItem>
              <IonLabel>Quantity:</IonLabel>
              <IonInput
                name="quantity"
                type="number"
                inputMode="numeric"
                value={formData.quantity}
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
          <IonButton color="danger" onClick={undefined}>
            <IonIcon icon={close} /> Cancel
          </IonButton>
          <IonButton onClick={undefined}>
            <IonIcon icon={save} /> Save
          </IonButton>
        </IonRow>
      </IonFooter>
    </>
  );
};

export default ProductForm;