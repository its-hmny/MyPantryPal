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
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useEffect, useState } from "react";
import ProductCards from "../components/ProductCards";
import { TestProds } from "../data/tmp";

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
            <IonButton onClick={undefined}>
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
        <ProductCards products={TestProds} />
      </IonContent>
    </IonPage>
  );
};

export default MyPantryView;
