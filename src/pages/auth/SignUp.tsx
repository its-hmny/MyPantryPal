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
 * This components renders the Sign Up page and allows the user to register and
 * authenticate to the WebService retrieving the JWT and redirecting him to 
 * the Dashboard view
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
  /**
   * This method handles the registration of the new user to the Webservice
   * Since there arean't anyt form of email verification between the SignUp 
   * and the first SignIn the same data are eventually used to authenticate 
   * the User for the first time, redirecting him to the Dashboard upon 
   * full flow completiom
   * @function
   * @async 
   * 
   * @param {FormPayload} data - Tha data coming from the form 
   */
  const handleSubmit = async (data: FormPayload) => {
    // Register the user to the WebService
    await signUp(data);
    // Then uses the data to authenticate the user as well
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
              mode="SignUp"
              submitText="Sign Up"
              onSubmit={handleSubmit}
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
