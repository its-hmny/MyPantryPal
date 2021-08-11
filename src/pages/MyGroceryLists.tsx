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
  useIonModal,
} from "@ionic/react";
import { add } from "ionicons/icons";
import UserGroceryLists from "../components/UserGroceryList";
import NewGroceryListView from "./NewGroceryList";

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
  const handleCancel = () => dismissModal();

  // TODO COMMENT
  const [presentModal, dismissModal] = useIonModal(NewGroceryListView, {
    onListCreated: handleCancel,
    onCancel: handleCancel,
  });

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------

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
            <IonButton onClick={() => presentModal()}>
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
        <IonButton expand="block" onClick={() => presentModal()}>
          Create a new grocery list
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default MyGroceryListsView;
