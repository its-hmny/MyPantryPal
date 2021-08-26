// -----------------------------------------------------------------
// I m p o r t s
// -----------------------------------------------------------------
import { IonContent, IonPage, useIonAlert } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ProductForm from "../components/ProductForm";
import { ERRORS } from "../data/enum";
import { Product } from "../data/interfaces";
import { getProduct, updateProduct } from "../utils/Database";

/**
 * This component shows to the user a Form in which the details
 * about the product (id passed via URL) can be visualized and changed
 * If the id isn't visualized then an error message is showed and the
 * user is redirected to the previous page
 *
 * @component
 * @category Components
 * @subcategory View
 */
const ProductDetailView: React.FC = () => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------
  // Get the route id param
  const { id: productId } = useParams<{ id: string }>();
  // Access the history stack of the browser/phone
  const history = useHistory();
  // Helper function to present lert dialog to the user
  const [showAlert] = useIonAlert();

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------
  // Local copy of the list selected by the user, null if not found
  const [product, setProduct] = useState<Product | null>(null);

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
  const getProductDetails = async () => {
    try {
      const prodDetails = await getProduct(productId);
      if (prodDetails === undefined) throw Error(ERRORS.PRODUCT_NOT_FOUND);
      setProduct(prodDetails);
    } catch (err) {
      showAlert(err.message, [{ text: "Ok", handler: () => history.goBack() }]);
    }
  };

  /**
   * This function handles the update of the Product and, upon completion,
   * redirects then the user to the previous page. If an error occurs the user
   * is showed an alert
   * @function
   * @async
   *
   * @param {Product} prod -
   */
  const handleProductUpdate = async (prod: Product) => {
    try {
      await updateProduct(prod);
      history.goBack();
    } catch (err) {
      showAlert(err.message);
    }
  };

  // -----------------------------------------------------------------
  // u s e E f f e c t
  // -----------------------------------------------------------------
  // Whenever the listId changes in the route, refetches the Grocery List
  useEffect(() => {
    getProductDetails();
  }, [productId]);

  // -----------------------------------------------------------------
  // T e m p l a t e
  // -----------------------------------------------------------------
  return !!product ? (
    <IonPage>
      <IonContent>
        <ProductForm
          product={product}
          onSave={handleProductUpdate}
          onDiscard={history.goBack}
        />
      </IonContent>
    </IonPage>
  ) : null;
};

export default ProductDetailView;
