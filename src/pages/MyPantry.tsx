// -----------------------------------------------------------------
// I m p o r t s
// -----------------------------------------------------------------
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonModal,
} from "@ionic/react";
import {
  add,
  addCircle,
  informationCircle as infoCircle,
  removeCircle,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import ProductCards from "../components/ProductCards";
import { Product } from "../data/interfaces";
import { TestProds } from "../data/tmp";
import { useAuth } from "../providers/AuthProvider";
import ScanProdctView from "./ScanProduct";

// ------------------------------------------------------------------
// I n t e r f a c e s
// ------------------------------------------------------------------
interface FilterOptions {
  search?: string | undefined;
  category?: string | undefined;
}

/**
 * TODO COMMENT
 *
 * @component
 * @category Components
 * @subcategory View
 */
const MyPantryView: React.FC = () => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------
  // Retrieve user Access Token, in order to make requests
  const { accessToken } = useAuth();

  const handleCancel = () => dismissModal();

  // TODO COMMENT
  const [presentModal, dismissModal] = useIonModal(ScanProdctView, {
    accessToken,
    onComplete: handleCancel,
    onCancel: handleCancel,
  });

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------
  const [filterOpts, setFilterOpts] = useState<FilterOptions>();

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------
  const filterPantry = async () => {
    console.log("BP__", filterOpts);
  };

  const go2ProductDetail = (prod: Product) => {
    console.log("BP__ onProductRedirect", prod);
  };

  const addQuantity = async (prod: Product, diff: number) => {
    console.log("BP__ onAddQuantity", prod, diff);
  };

  // -----------------------------------------------------------------
  // R e n d e r   m e t h o d s
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // u s e E f f e c t
  // -----------------------------------------------------------------
  useEffect(() => {
    filterPantry();
  }, [filterOpts]);

  // -----------------------------------------------------------------
  // T e m p l a t e
  // -----------------------------------------------------------------
  return (
    <IonPage>
      {/* Page header maybe to be removed (TODO) */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end" color="primary">
            <IonButton onClick={() => presentModal()}>
              <IonIcon slot="icon-only" icon={add} />
            </IonButton>
          </IonButtons>
          <IonTitle>My Pantry</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            animated
            debounce={250}
            enterkeyhint="search"
            onIonChange={(e) =>
              setFilterOpts({ ...filterOpts, search: e.detail.value })
            }
          />
        </IonToolbar>
        <IonToolbar>
          <IonSelect
            interface="popover"
            placeholder="Select a category"
            onIonChange={(e) =>
              setFilterOpts({ ...filterOpts, category: e.detail.value })
            }
          >
            <IonSelectOption value="female">Female</IonSelectOption>
            <IonSelectOption value="male">Male</IonSelectOption>
            <IonSelectOption color="danger" value="">
              Unfiltered
            </IonSelectOption>
          </IonSelect>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <ProductCards
          products={TestProds}
          actions={[
            { icon: removeCircle, callback: (prod) => addQuantity(prod, -1) },
            { icon: infoCircle, callback: (prod) => go2ProductDetail(prod) },
            { icon: addCircle, callback: (prod) => addQuantity(prod, 1) },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default MyPantryView;
