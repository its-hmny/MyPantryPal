// ------------------------------------------------------------------
// I m p o r t s
// ------------------------------------------------------------------
import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonText,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { Product } from "../data/interfaces";

// ------------------------------------------------------------------
// I n t e r f a c e s
// ------------------------------------------------------------------
interface Props {
  // The list of product to be displayed 
  products: Product[];
  // Boolean to render Plus button inside the card
  canBeAdded?: true;
  // The callback for when a Product is added via abovesaid button
  onAddProduct?: (prod: Product) => any;
}

/**
 * This fragment renders a list/grid of card where each card represents 
 * a Product, a optional Add action can be enabled via props as well
 * but the callback must be passed by the parent component
 *
 * @component
 * @category Components
 * @subcategory Fragment
 */
const ProductCards: React.FC<Props> = (props) => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------
  const { products, canBeAdded = false, onAddProduct } = props;

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------

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
    <IonGrid>
      <IonRow className="ion-align-items-start">
        {products.map((product) => (
          <IonCol size="6" key={product.barcode}>
            <IonCard>
              <IonCardContent>
                <IonAvatar>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/icon/prod_placeholder.png`}
                  />
                </IonAvatar>
                <IonText color="primary">
                  <h3>{product.name}</h3>
                </IonText>
                {`${product.quantity} left`}
                {canBeAdded && !!onAddProduct && (
                  <IonButton
                    size="small"
                    shape="round"
                    slot="icon-only"
                    onClick={() => onAddProduct(product)}
                  >
                    <IonIcon slot="icon-only" icon={add} />
                  </IonButton>
                )}
              </IonCardContent>
            </IonCard>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
};

export default ProductCards;
