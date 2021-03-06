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
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonModal,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  add,
  addCircle,
  informationCircle as infoCircle,
  removeCircle,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ProductCards from "../components/ProductCards";
import { USER_PANTRY_ID } from "../data/dbConfig";
import { ROUTES } from "../data/enum";
import { Product } from "../data/interfaces";
import { useAuth } from "../providers/AuthProvider";
import { changeQuantitytyInList, getPantryProduct } from "../utils/Database";
import AddProdctView from "./AddProduct";

/**
 * This view renders the user's Pantry, the user can interact with the
 * product inside it, changing the quantity, visualize or update the
 * details about the single prodcut or creating new product as well
 *
 * @component
 * @category Components
 * @subcategory View
 */
const MyPantryView: React.FC = () => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------
  // Retrieve user Access Token, in order to make requests
  const { accessToken } = useAuth();
  // Access the history stack of the browser/phone
  const history = useHistory();

  // Helper function to present an alert dialog to the user
  const [showAlert] = useIonAlert();

  // Helper functions to open and dismiss a "Add Product" Modal view
  const [presentModal, dismissModal] = useIonModal(AddProdctView, {
    accessToken,
    onComplete: (newProd: Product) => {
      setPantryProds([newProd, ...pantryProducts]);
      dismissModal();
    },
    // Arrow function only for scopes reasons
    onCancel: () => dismissModal(),
  });

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------
  // State containing all the filtering options set by the user
  const [searchStr, setSearchStr] = useState<string>("");
  // "Buffer" containing all the product i the pantry, eventually filtered
  const [pantryProducts, setPantryProds] = useState<Product[]>([]);

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------
  /**
   * This function filters the Pantry product list with the option provided
   *  by the user and updates the states in order to render the new list
   * @function
   * @async
   */
  const filterPantry = async () => {
    try {
      // Get the pantry details
      const pantry = await getPantryProduct();

      // If seacrh string is not defined or empty
      if (!searchStr) {
        // Fetches all the products in the pantry
        setPantryProds(pantry);
        return;
      }

      // Filters the full list by name and sets the state
      setPantryProds(pantry.filter((prod) => prod.name.includes(searchStr)));
    } catch (err) {
      showAlert(err.message);
    }
  };

  /**
   * This function redirects the user to the detail page. in which the user
   * can update some info about the product selected
   * @function
   * @async
   *
   * @param {Product} prod - The product selected by the user
   */
  const go2ProductDetail = (prod: Product) =>
    history.push(ROUTES.PRODUCT_DETAILS.replace(":id", prod.id));

  /**
   * This functions handles the increment/decrement of the quantity of
   * a given product in the pantry, the quantity is changed by the
   * value of the "diff" param
   * @function
   * @async
   *
   * @param {Product} prod - The Product of which the quantity must be changed
   * @param {number} diff - The increment/decrement of the quantity
   */
  const addQuantity = async (prod: Product, diff: number) => {
    try {
      // Changes the quantity in the local Database
      await changeQuantitytyInList(USER_PANTRY_ID, prod.id, diff);
      // Refetches the list from the Database
      await filterPantry()
    } catch (err) {
      showAlert(err.message);
    }
  };

  // -----------------------------------------------------------------
  // u s e E f f e c t
  // -----------------------------------------------------------------
  // Fetches the product onViewMount
  useIonViewWillEnter(async () => await filterPantry());
  // Whenever the filters changes, re-executes the query with new params
  useEffect(() => {
    filterPantry();
  }, [searchStr]);

  // -----------------------------------------------------------------
  // T e m p l a t e
  // -----------------------------------------------------------------
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end" color="primary">
            <IonButton onClick={() => presentModal()}>
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
            onIonChange={(e) => setSearchStr(e.detail.value ?? "")}
          />
        </IonToolbar>
      </IonHeader>

      {/* The filtered product list */}
      <IonContent>
        <ProductCards
          products={pantryProducts}
          actions={[
            { icon: removeCircle, callback: (prod) => addQuantity(prod, -1) },
            { icon: infoCircle, callback: (prod) => go2ProductDetail(prod) },
            { icon: addCircle, callback: (prod) => addQuantity(prod, 1) },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default MyPantryView;
