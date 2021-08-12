// ------------------------------------------------------------------
// I m p o r t s
// ------------------------------------------------------------------
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonText,
} from "@ionic/react";
import { Product } from "../data/interfaces";
import AlertMessage from "./AlertMessage";

// ------------------------------------------------------------------
// I n t e r f a c e s
// ------------------------------------------------------------------
interface Props {
  // The list of product to be displayed
  products: Product[];
  // Callback to be executed when user click on the card
  onCardSelected?: (prod: Product) => void | Promise<void>;
  // Array of callack and icon for multibutton cards
  actions?: {
    icon: string;
    callback: (prod: Product) => void | Promise<void>;
  }[];
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
  const { products, onCardSelected = () => {}, actions = [] } = props;
  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------
  // This memoized result is the image to be displayed in the card, it
  // could either be the previous/current product image or a placeholder
  const getProductImage = (product: Product) => {
    if (!!product?.img) return `data:image/*;base64,${product.img}`;
    else return `${process.env.PUBLIC_URL}/assets/icon/prod_placeholder.png`;
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
    <IonGrid>
      <IonRow className="ion-align-items-start">
        {products.length ? (
          products.map((product) => (
            <IonCol size="6" key={product.id}>
              <IonCard
                className="product_card"
                onClick={() => onCardSelected(product)}
              >
                <IonCardContent>
                  <IonAvatar>
                    <img src={getProductImage(product)} />
                  </IonAvatar>
                  <IonText color="primary">
                    <h3>{product.name}</h3>
                  </IonText>
                  {`Only ${product.quantity} left`}
                  <IonButtons>
                    {actions.map((btn) => (
                      <IonButton
                        key={btn.icon}
                        size="small"
                        shape="round"
                        slot="icon-only"
                        onClick={() => btn.callback(product)}
                      >
                        <IonIcon slot="icon-only" icon={btn.icon} />
                      </IonButton>
                    ))}
                  </IonButtons>
                </IonCardContent>
              </IonCard>
            </IonCol>
          ))
        ) : (
          <AlertMessage>
            Cannot find any product, add them scanning or typing the barcode
          </AlertMessage>
        )}
      </IonRow>
    </IonGrid>
  );
};

export default ProductCards;
