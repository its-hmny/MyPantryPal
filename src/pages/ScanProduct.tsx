// -----------------------------------------------------------------
// I m p o r t s
// -----------------------------------------------------------------
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
} from "@ionic/react";
import { qrCode } from "ionicons/icons";
import { useState } from "react";
import ProductCards from "../components/ProductCards";
import ProductForm from "../components/ProductForm";
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
 * TODO COMMENTS
 *
 * @component
 * @category Components
 * @subcategory View
 */
const ScanProdctView: React.FC<Props> = (props) => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------
  // Retrieves data from the parent component
  const { accessToken, onComplete, onCancel } = props;
  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------
  //
  const [activeTab, setTab] = useState<string>("import");

  // "Buffer" containing all the data inserted or added by the user
  // const [formData, setFormData] = useState<Partial<Product>>({});

  const [localHints, setLocalHints] = useState<Product[]>([]);
  const [webServiceHints, setWebServiceHints] = useState<Product[]>([]);

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------
  const updateProductHint = async (barcode?: string | null) => {
    if (!barcode) return;

    // Search in the local DB for a match
    // TODO IMPLEMENT
    setLocalHints(TestProds);

    // If no match is found then ask the WebService
    const res = await getProductWithBarcode(accessToken, barcode);
    setWebServiceHints(res.products);
  };

  const selectProductHint = async () => {};

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
                  autocapitalize="words"
                  onIonChange={(e) => updateProductHint(e.detail.value)}
                />
                <IonIcon icon={qrCode} onClick={alert} />
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

      {/* Page footer, contaiing the user possible outcomes 
      <IonFooter>
        <IonRow className="ion-justify-content-evenly">
          <IonButton color="danger" onClick={onCancel}>
            <IonIcon icon={close} /> Cancel
          </IonButton>
          <IonButton onClick={onSubmit}>
            <IonIcon icon={save} /> Save
          </IonButton>
        </IonRow>
      </IonFooter>*/}
    </IonPage>
  );
};

export default ScanProdctView;
