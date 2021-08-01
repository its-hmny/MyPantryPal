// ------------------------------------------------------------------
// I m p o r t s
// ------------------------------------------------------------------
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
import { useHistory } from "react-router";
import RegistrerForm, { FormPayload } from "../../components/RegistrerForm";
import { ROUTES } from "../../data/enum";
import { useAuth } from "../../providers/AuthProvider";
import { signUp } from "../../utils/WebService";

/**
 * TODO COMMENT ME
 *
 * @component
 * @category Components
 * @subcategory View
 */
const SignUpView: React.FC = () => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------
  // Access the history stack of the browser/phone
  const history = useHistory();
  // Access the authProvider to authenticate the user
  const { authenticateUser } = useAuth();

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------
  const handleSubmit = async (data: FormPayload) => {
    // Register the user to the WebService
    await signUp(data);
    // The uses the data to authenticate the user as well
    await authenticateUser(data);
    // At last redirects the authenticated user to the Dashboard
    history.push(ROUTES.DASHBOARD);
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
    <IonPage id="sign-up-page">
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonImg src={`${process.env.PUBLIC_URL}/assets/icon/icon.png`} />
            <IonCardTitle>Sign up</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText>
              Insert here some basic info about you in order to set up your
              account
            </IonText>
            <RegistrerForm
              signUp
              onSubmit={handleSubmit}
              submitText="Sign Up"
            />
            <IonText>
              Alread have an account?{" "}
              <IonRouterLink href={ROUTES.SIGN_IN} routerDirection="back">
                Sign in
              </IonRouterLink>
            </IonText>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default SignUpView;
