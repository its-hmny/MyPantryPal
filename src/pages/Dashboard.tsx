// -----------------------------------------------------------------
// I m p o r t s
// -----------------------------------------------------------------
import {
  IonCard,
  IonCardContent,
  IonContent,
  IonListHeader,
  IonPage,
  useIonActionSheet,
  useIonAlert,
  useIonViewDidEnter,
} from "@ionic/react";
import { addCircle } from "ionicons/icons";
import { useState } from "react";
import ProductCards from "../components/ProductCards";
import UserGroceryList from "../components/UserGroceryList";
import { ERRORS } from "../data/enum";
import { GroceryList, Product } from "../data/interfaces";
import { useAuth } from "../providers/AuthProvider";
import {
  changeQuantitytyInList,
  getGroceryLists,
  getPantryProduct,
} from "../utils/Database";

/**
 * Component that shows to the user a Dashboard with some recap info
 * such as, the products in the pantry running low on quantity and the
 * current groceries list (that are not yet eliminated)
 *
 * @component
 * @category Components
 * @subcategory View
 */
const DashboardView: React.FC = () => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------
  // Get some basic info about the user
  const { user } = useAuth();
  // Helper function to present an Action Sheet to the user
  const [presentAction] = useIonActionSheet();
  // Helper function to present lert dialog to the user
  const [showAlert] = useIonAlert();

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------
  // "Buffer" in which the low quantity product are saved
  const [lowProduct, setLowProduct] = useState<Product[]>([]);

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------
  /**
   * This function handles the selecton by the user of a product from
   * the "Running low" suggestion list, it presents an ActionSheet where
   * the destintion Grocery List can be selected in order to add the product
   * @function
   * @async
   *
   * @param {Product} prod - The product selected
   */
  const onAddToGroceryLists = async (prod: Product) => {
    const options = await getGroceryLists();
    if (options === undefined) throw Error(ERRORS.GENERAL_ERROR);
    // Generate all the possible action/button based on the avaiable lists
    const actions = options.map((gl) => ({
      text: gl.name,
      handler: async () => await addProductToGroceryList(gl, prod),
    }));
    // Present the action sheet with all the button needed, (a "Cancel" button as well)
    await presentAction({
      header: `Add "${prod.name}" to one of your grocery lists`,
      buttons: [...actions, { text: "Cancel", role: "destructive" }],
    });
  };

  /**
   * This function takes care of adding a product to a grocery list, both
   * of them selected previously by the user, eventually updating also the
   * local data as well as the database data
   * @function
   * @async
   *
   * @param {GroceryList} list - The destionation list
   * @param {Product} prod - The product to be added
   */
  const addProductToGroceryList = async (list: GroceryList, prod: Product) => {
    try {
      await changeQuantitytyInList(list.id, prod.id, 1);
    } catch (err) {
      showAlert(err.message);
    }
  };

  // -----------------------------------------------------------------
  // u s e E f f e c t
  // -----------------------------------------------------------------
  // onViewMount it will fetch all the "running low" products
  useIonViewDidEnter(async () => {
    try {
      const userPantry = await getPantryProduct();
      // Sorts the products by quantity
      const sorted = userPantry.sort(
        (a, b) => (a.quantity ?? 0) - (b.quantity ?? 0)
      );
      const final = sorted.length > 4 ? sorted.slice(0, 4) : sorted;
      setLowProduct(final);
    } catch (err) {
      showAlert(err.message);
    }
  }, []);

  // -----------------------------------------------------------------
  // T e m p l a t e
  // -----------------------------------------------------------------
  return (
    <IonPage>
      <IonContent>
        {/* Greetings card */}
        <IonCard>
          <IonCardContent>
            {`Good Evening, ${user?.firstname ?? user?.username}`}
          </IonCardContent>
        </IonCard>

        {/* Products that are running out list */}
        <IonListHeader>You're running out of:</IonListHeader>
        <ProductCards
          products={lowProduct}
          actions={[{ icon: addCircle, callback: onAddToGroceryLists }]}
        />

        {/* My groceries list */}
        <UserGroceryList />
      </IonContent>
    </IonPage>
  );
};

export default DashboardView;
