// -----------------------------------------------------------------
// I m p o r t s
// -----------------------------------------------------------------
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add } from "ionicons/icons";
import UserGroceryLists from "../components/UserGroceryList";

/**
 * TODO COMMENT
 *
 * @component
 * @category Components
 * @subcategory View
 */
const MyGroceryListsView: React.FC = () => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------
  const createNewList = async () => {
    console.log("BP__");
  };

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
      {/* Page header maybe to be removed (TODO) */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end" color="primary">
            <IonButton onClick={createNewList}>
              <IonIcon slot="icon-only" icon={add} />
            </IonButton>
          </IonButtons>
          <IonTitle>My Grocery Lists</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <UserGroceryLists />
      </IonContent>
      <IonFooter>
        <IonButton expand="block" onClick={createNewList}>
          Create a new grocery list
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default MyGroceryListsView;
