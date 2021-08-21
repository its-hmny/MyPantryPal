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
  useIonAlert,
  useIonLoading,
} from "@ionic/react";
import { add } from "ionicons/icons";
import UserGroceryLists from "../components/UserGroceryList";
import { GroceryList } from "../data/interfaces";
import { insertGroceryList } from "../utils/Database";

/**
 * View that show to the user all the Groceries List avaible/created
 * by him and gives the possibilities to create a new one, delete
 * or evade an already existent one and see the details view of said list
 *
 * @component
 * @category Components
 * @subcategory View
 */
const MyGroceryListsView: React.FC = () => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------
  // Helper function to present an alert dialog to the user
  const [presentAlert] = useIonAlert();
  // Helper function to present a loading dialog to the user
  const [showLoading, dismissLoading] = useIonLoading();

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------
  /**
   * A simple wrapper around presentAlert to show the popup in which
   * the user will nsert the name ot the new Grocery List
   */
  const createNewListPopup = () =>
    presentAlert({
      header: "Create a new Grocery List",
      subHeader: "Insert below the name of the new list",
      inputs: [{ type: "text", name: "name" }],
      buttons: ["Cancel", { text: "Save", handler: onListCreated }],
    });

  /**
   * This function handles the insertion in the Database (and local state)
   * of a new Grocery List created by the user, the functio interpolates as
   * well every eventual default fields since only the name is provided by the user
   * @function
   * @async
   *
   * @param {Partial<GroceryList>} newList
   */
  const onListCreated = async (newList: Partial<GroceryList>) => {
    showLoading("Adding your new list...");
    try {
      await insertGroceryList(newList);
    } catch (err) {
      presentAlert(err.message);
    } finally {
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
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end" color="primary">
            <IonButton onClick={createNewListPopup}>
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
        <IonButton expand="block" onClick={createNewListPopup}>
          Create a new grocery list
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default MyGroceryListsView;
