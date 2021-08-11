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
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductCards from "../components/ProductCards";
import { ROUTES } from "../data/enum";
import { GroceryList } from "../data/interfaces";
import { TestGroceriesList } from "../data/tmp";

/**
 * TODO COMMENT
 *
 * @component
 * @category Components
 * @subcategory View
 */
const GroceryListDeatilsView: React.FC = () => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------
  const { id: listId } = useParams<{ id: string }>();

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------
  // Local copy of the list selected by the user, null if not found
  const [list, setList] = useState<GroceryList | null>(null);

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------
  const getGroceryList = async () => {
    setList(TestGroceriesList.find((l) => l.id === listId) ?? null);
  };

  // -----------------------------------------------------------------
  // R e n d e r   m e t h o d s
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // u s e E f f e c t
  // -----------------------------------------------------------------
  useEffect(() => {
    getGroceryList();
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
        <ProductCards products={list.products} />
      </IonContent>
    </IonPage>
  ) : null;
};

export default GroceryListDeatilsView;