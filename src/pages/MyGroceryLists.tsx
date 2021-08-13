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
} from "@ionic/react";
import { add } from "ionicons/icons";
import UserGroceryLists from "../components/UserGroceryList";
import { GroceryList } from "../data/interfaces";

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
  // Helper function to present an alert dialog to the user
  const [presentAlert] = useIonAlert();

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
   * This function handles the insertion in the Daabase (and local state)
   * of a new Grocery List created by the user, the functio interpolates as
   * well every eventual default fields since only the name is provided by the user
   * @function
   * @async
   *
   * @param {Partial<GroceryList>} newList
   */
  const onListCreated = async (newList: Partial<GroceryList>) => {
    console.log("BP__ onListCreated", newList);
    // TestGroceriesList.push({ ...newList, products: [] } as GroceryList);
  };

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
