// -----------------------------------------------------------------
// I m p o r t s
// -----------------------------------------------------------------
import {
  IonAvatar,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
  IonText,
  useIonAlert,
  useIonViewWillEnter,
} from "@ionic/react";
import { checkmark, trash } from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import { USER_PANTRY_ID } from "../data/database";
import { ROUTES } from "../data/enum";
import { GroceryList } from "../data/interfaces";
import {
  addToList,
  deleteGroceryList,
  getGroceryLists,
  truncateGroceryList,
} from "../utils/Database";
import AlertMessage from "./AlertMessage";

/**
 * This fragment handles the rendering of the Grocery List created by
 * the user, the list item are "slidable" and every interaction with
 *  the user is handled by the component itself
 *
 * @component
 * @category Components
 * @subcategory Fragment
 */
const UserGroceryLists: React.FC = () => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------
  // Access the history stack of the browser/phone
  const history = useHistory();
  // Helper function to present lert dialog to the user
  const [showAlert] = useIonAlert();

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------
  const [groceryList, setGroceryLists] = useState<GroceryList[] | null>(null);

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------
  /**
   * This function redirects the user to the detail page of the selected
   * Grocery List where the user will get all the details about the given list
   * @function
   *
   * @param {GroceryList} list - The selected list
   */
  const go2GroceryListDetail = (list: GroceryList) =>
    history.push(ROUTES.GROCERY_LIST_DETAILS.replace(":id", list.id));

  /**
   * This function handles the "evasion" of the GroceryList in which basycally
   * all the product are moved from the selected GroceryList to the Pantry.
   * Is supposed (but not limited) to be used after the user has purchased
   * all the product in the list.
   * Note: After this action the list wll be empty but not deleted
   * @function
   * @async
   *
   * @param {GroceryList} list - The list to be evaded
   */
  const evadeGroceryList = async (list: GroceryList) => {
    try {
      const { id, products } = list;
      await Promise.all(
        // Add the products to the Pantry
        products.map((prod) =>
          addToList(USER_PANTRY_ID, prod.id, prod.quantity ?? 0)
        )
      );
      // Truncate the Grocery List to evaded
      await truncateGroceryList(id);
    } catch (err) {
      showAlert(err.message);
    }
  };

  /**
   * This function handles the removal of a list from the database with
   * all the data that are not needed anymore in the database itself
   * @function
   * @async
   *
   * @param {GroceryList} list - The list to be deleted
   */
  const onGroceryListDelete = async (toDelete: GroceryList) => {
    try {
      // Basic args checking
      if (!toDelete.id || !groceryList?.length) return;
      // Removes the grocery list from the Database
      await deleteGroceryList(toDelete.id);
      // Then removes it as well from the local copy
      setGroceryLists(groceryList.filter((list) => list.id !== toDelete.id));
    } catch (err) {
      showAlert(err.message);
    }
  };

  // -----------------------------------------------------------------
  // u s e E f f e c t
  // -----------------------------------------------------------------
  // onViewMount it will fetch all the Grocery List avaiable
  useIonViewWillEnter(async () => {
    try {
      setGroceryLists((await getGroceryLists()) ?? null);
    } catch (err) {
      showAlert(err.message);
    }
  }, []);

  // -----------------------------------------------------------------
  // T e m p l a t e
  // -----------------------------------------------------------------
  return (
    <IonList>
      <IonListHeader>Your grocery lists:</IonListHeader>
      {!!groceryList?.length ? (
        groceryList.map((list) => (
          <IonItemSliding key={list.id}>
            <IonItemOptions side="start">
              <IonItemOption
                color="secondary"
                onClick={() => evadeGroceryList(list)}
              >
                <IonIcon icon={checkmark} /> Done
              </IonItemOption>
            </IonItemOptions>
            <IonItem onClick={() => go2GroceryListDetail(list)}>
              <IonAvatar slot="start">
                <img src={`${process.env.PUBLIC_URL}/assets/icon/list.png`} />
              </IonAvatar>
              <IonLabel>
                <h1>{list.name}</h1>
                <IonText color="primary">
                  <h5>{`Contains ${list.products.length} products`}</h5>
                </IonText>
              </IonLabel>
            </IonItem>
            <IonItemOptions side="end">
              <IonItemOption
                color="danger"
                onClick={() => onGroceryListDelete(list)}
              >
                Delete <IonIcon icon={trash} />
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        ))
      ) : (
        <AlertMessage>
          Cannot find any grocery list, add them from the "Grocery List" page
        </AlertMessage>
      )}
    </IonList>
  );
};

export default UserGroceryLists;
