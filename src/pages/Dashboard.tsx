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
} from "@ionic/react";
import { addCircle } from "ionicons/icons";
import ProductCards from "../components/ProductCards";
import UserGroceryList from "../components/UserGroceryList";
import { GroceryList, Product } from "../data/interfaces";
import { TestGroceriesList, TestProds } from "../data/tmp";
import { useAuth } from "../providers/AuthProvider";

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

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------

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
  const addToGroceryLists = async (prod: Product) => {
    // Generate all the possible action/button based on the avaiable lists
    const actions = TestGroceriesList.map((gl) => ({
      text: gl.name,
      //role: "",
      handler: async () => await addProduct2GroceryList(gl, prod),
    }));
    // Present the action sheet with all the button needed
    await presentAction({
      header: `Add "${prod.name}" to one of your grocery lists`,
      buttons: [...actions, { text: "Cancel", role: "destructive" }],
    });
  };

  /**
   * TODO COMMENT
   * @function
   * @async
   *
   * @param {GroceryList} list - The destionation list
   * @param {Product} prod - The product to be added
   */
  const addProduct2GroceryList = async (list: GroceryList, prod: Product) => {
    console.log("BP__", list, prod);
    // TODO add query execution here
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
    <IonPage>
      <IonContent>
        {/* On Android this sucks */}
        <IonCard>
          <IonCardContent>
            {`Good Evening, ${user?.firstname ?? user?.username}`}
          </IonCardContent>
        </IonCard>

        {/* Products that are running out list */}
        <IonListHeader>You're running out of:</IonListHeader>
        <ProductCards
          products={TestProds}
          actions={[{ icon: addCircle, callback: addToGroceryLists }]}
        />

        {/* My groceries list */}
        <UserGroceryList />

        {/* Camera fab to start scanning items 
        <CameraFab onPhotoTaken={async () => {}} />
        */}
      </IonContent>
    </IonPage>
  );
};

export default DashboardView;
