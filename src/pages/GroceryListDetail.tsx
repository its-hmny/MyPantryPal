// -----------------------------------------------------------------
// I m p o r t s
// -----------------------------------------------------------------
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonPopover,
  useIonViewWillEnter,
} from "@ionic/react";
import { add, addCircle, removeCircle } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ProductCards from "../components/ProductCards";
import { DB_TABLES, ERRORS, ROUTES } from "../data/enum";
import { GroceryList, Product } from "../data/interfaces";
import {
  changeQuantitytyInList,
  database,
  getGroceryList,
} from "../utils/Database";

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
  // Access the history stack of the browser/phone
  const history = useHistory();
  // Helper function to present an alert dialog to the user
  const [showAlert] = useIonAlert();

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------
  // Local copy of the list selected by the user, null if not found
  const [list, setList] = useState<GroceryList | null>(null);
  // Local copy of the product scanned by the user
  const [products, setProducts] = useState<Product[]>([]);

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------
  // Helper function to present a Popover with all the products avaiable to the user
  const [showPopover, dismissPopover] = useIonPopover(ProductCards, {
    products, // Need to be here for scoping pourposes
    onCardSelected: async (selected: Product) => {
      await addQuantity(selected, 1);
      dismissPopover();
    },
  });

  /**
   * This function get all the data about the Grocery List identified
   * by the given id in the route param, if the id isn't valid an error
   * message is showed to the user that will be later redirect to the
   * Grocery List tab
   * @function
   * @async
   */
  const getGroceryListDetails = async () => {
    try {
      const listDetails = await getGroceryList(listId);
      if (listDetails === undefined) throw Error(ERRORS.LIST_NOT_FOUND);
      setList(listDetails);
    } catch (err) {
      showAlert(err.message, [{ text: "Ok", handler: () => history.goBack() }]);
    }
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
    try {
      //  Updates the data in the Database
      await changeQuantitytyInList(listId, prod.id, diff);
      // Fetches again the updated data
      await getGroceryListDetails();
    } catch (err) {
      showAlert(err.message);
    }
  };

  // -----------------------------------------------------------------
  // u s e E f f e c t
  // -----------------------------------------------------------------
  // onMount fetches on time only all the product avaiable
  useIonViewWillEnter(async () => {
    const res = await database.query(`SELECT * FROM ${DB_TABLES.PRODUCTS}`);
    setProducts(res.values ?? []);
  }, []);

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
          <IonButtons slot="end" color="primary">
            <IonButton onClick={() => showPopover()}>
              <IonIcon slot="icon-only" icon={add} />
            </IonButton>
          </IonButtons>
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
