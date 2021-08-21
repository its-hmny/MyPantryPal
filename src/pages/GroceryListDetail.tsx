// -----------------------------------------------------------------
// I m p o r t s
// -----------------------------------------------------------------
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { addCircle, removeCircle } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductCards from "../components/ProductCards";
import { ROUTES } from "../data/enum";
import { GroceryList, Product } from "../data/interfaces";
import { getGroceryList } from "../utils/Database";

/**
 * This view shows the user all the detals about a Grocery List identified
 * by the :id param in the routes, the user can change the quantity of each
 * product inside the list. If the listId is invalid the user will be shown
 * an error message and redirected to the general page
 *
 * @component
 * @category Components
 * @subcategory View
 */
const GroceryListDeatilsView: React.FC = () => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------
  // Get the route id param
  const { id: listId } = useParams<{ id: string }>();

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------
  // Local copy of the list selected by the user, null if not found
  const [list, setList] = useState<GroceryList | null>(null);

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------
  /**
   * This function get all the data about the Grocery List identified
   * by the given id in the route param, if the id isn't valid an error
   * message is showed to the user that will be later redirect to the
   * Grocery List tab
   * @function
   * @async
   */
  const getGroceryListDetails = async () => {
    setList(await getGroceryList(listId));
  };

  /**
   * This functions handles the increment/decrement of the quantity of
   * a given product a given grocery list, the quantity is changed by the
   * value of the "diff" param
   * @function
   * @async
   *
   * @param {Product} prod - The Product of which the quantity must be changed
   * @param {number} diff - The increment/decrement of the quantity
   */
  const addQuantity = async (prod: Product, diff: number) => {
    // TODO IMPLEMENT
    console.log("BP__ onAddQuantity", prod, diff);
  };

  // -----------------------------------------------------------------
  // u s e E f f e c t
  // -----------------------------------------------------------------
  // Whenever the listId changes in the route, refetches the Grocery List
  useEffect(() => {
    getGroceryListDetails();
  }, [listId]);

  // -----------------------------------------------------------------
  // T e m p l a t e
  // -----------------------------------------------------------------
  return !!list ? (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={ROUTES.GROCERIES_LIST} />
          </IonButtons>
          <IonTitle>{list.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ProductCards
          products={list.products}
          actions={[
            { icon: removeCircle, callback: (prod) => addQuantity(prod, -1) },
            { icon: addCircle, callback: (prod) => addQuantity(prod, 1) },
          ]}
        />
      </IonContent>
    </IonPage>
  ) : null;
};

export default GroceryListDeatilsView;
