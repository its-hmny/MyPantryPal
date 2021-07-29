// -----------------------------------------------------------------
// I m p o r t s
// -----------------------------------------------------------------
import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonTitle,
} from "@ionic/react";
import { camera } from "ionicons/icons";
import { useHistory } from "react-router";

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
  // Access the history stack of the browser/phone
  const history = useHistory();

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
    <IonPage>
      <IonContent>
        {/* On Android this sucks */}
        <IonCard>
          <IonCardContent>Good Evening, Enea</IonCardContent>
        </IonCard>

        {/* Products that are running out list */}
        <IonGrid>
          <IonRow>
            <IonTitle>You're running out of:</IonTitle>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard>Test</IonCard>
            </IonCol>
            <IonCol>
              <IonCard>Test</IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* My groceries list */}
        <IonList>
          <IonListHeader>Here's your groceries list:</IonListHeader>
          <IonItem>
            <IonAvatar slot="start">
              <img src={`${process.env.PUBLIC_URL}/assets/icon/icon.png`} />
            </IonAvatar>
            <IonLabel>
              <h1>Butter</h1>
              <h5>Only 5 left</h5>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonAvatar slot="start">
              <img src={`${process.env.PUBLIC_URL}/assets/icon/icon.png`} />
            </IonAvatar>
            <IonLabel>
              <h1>Pringles</h1>
              <h5>Only 1 left</h5>
            </IonLabel>
          </IonItem>
        </IonList>

        {/* FabButton to access the Camera */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color="primary">
            <IonIcon icon={camera} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default DashboardView;
