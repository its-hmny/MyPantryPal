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
  useIonViewWillEnter,
} from "@ionic/react";
import { checkmark, trash } from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import { ROUTES } from "../data/enum";
import { GroceryList } from "../data/interfaces";
import { TestGroceriesList } from "../data/tmp";
import { getGroceryLists } from "../utils/Database";

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

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------
  const [groceryList, setGroceryLists] = useState<GroceryList[] | undefined>(undefined);

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
    // TODO IMPLEMENT
    console.log("BP__ onGroceryListEvasion");
  };

  /**
   * This function handles the removal of a list from the database with
   * all the data that are not needed anymore in the database itself
   * @function
   * @async
   *
   * @param {GroceryList} list - The list to be deleted
   */
  const deleteGroceryList = async (list: GroceryList) => {
    // TODO IMPLEMENT
    console.log("BP__ onGroceryListDeletion");
  };

  // -----------------------------------------------------------------
  // u s e E f f e c t
  // -----------------------------------------------------------------
  useIonViewWillEnter(async () => {
    setGroceryLists(await getGroceryLists());
  }, []);

  // -----------------------------------------------------------------
  // T e m p l a t e
  // -----------------------------------------------------------------
  return (
    <IonList>
      <IonListHeader>Your grocery lists:</IonListHeader>
      {groceryList?.map((list) => (
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
              onClick={() => deleteGroceryList(list)}
            >
              Delete <IonIcon icon={trash} />
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
      ))}
    </IonList>
  );
};

export default UserGroceryLists;
