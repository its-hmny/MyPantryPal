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
} from "@ionic/react";
import { checkmark, trash } from "ionicons/icons";
import { useHistory } from "react-router";
import { ROUTES } from "../data/enum";
import { GroceryList } from "../data/interfaces";
import { TestGroceriesList } from "../data/tmp";

/**
 * TODO COMMENT
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

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------
  /**
   * TODO COMMENT
   * @param {GroceryList} list - The selected list
   */
  const go2GroceryListDetail = (list: GroceryList) => {
    history.push(ROUTES.GROCERY_LIST_DETAILS.replace(":id", list.id));
  };

  /**
   * TODO COMMENT
   * @function
   * @async
   *
   * @param {GroceryList} list - The list to be evaded
   */
  const evadeGroceryList = async (list: GroceryList) => {
    console.log("BP__ onGroceryListEvasion");
  };

  /**
   * TODO COMMENT
   * @function
   * @async
   *
   * @param {GroceryList} list - The list to be deleted
   */
  const deleteGroceryList = async (list: GroceryList) => {
    console.log("BP__ onGroceryListDeletion");
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
    <IonList>
      <IonListHeader>Your grocery lists:</IonListHeader>
      {TestGroceriesList.map((list) => (
        <IonItemSliding>
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
