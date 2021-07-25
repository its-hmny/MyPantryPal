// -----------------------------------------------------------------
// I m p o r t s
// -----------------------------------------------------------------
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonImg,
  IonPage,
  IonRouterLink,
  IonText,
} from "@ionic/react";
import RegistrerForm, { FormPayload } from "../../components/RegistrerForm";
import { ROUTES } from "../../data/enum";

/**
 * This components renders the Sign In page an allows the user to authenticate
 * to the WebService retrieving the JWT and redirecting him to the home
 *
 * @component
 * @category Components
 * @subcategory View
 */
const SignInView: React.FC = () => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------
  const handleSubmit = async (data: FormPayload) => {
    console.log("BP__", "SignIn callback", data);
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
    <IonPage id="sign-in-page">
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonImg src={`${process.env.PUBLIC_URL}/assets/icon/icon.png`} />
            <IonCardTitle>Sign in</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText>
              Insert here your credentials in order to access and manage your
              account
            </IonText>
            <RegistrerForm onSubmit={handleSubmit} submitText="Login" />
            <IonText>
              Not a member?{" "}
              <IonRouterLink href={ROUTES.SIGN_UP} routerDirection="forward">
                Sign up
              </IonRouterLink>
            </IonText>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default SignInView;
