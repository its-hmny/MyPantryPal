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
import { useHistory } from "react-router";
import UserForm, { FormPayload } from "../components/UserForm";
import { ROUTES } from "../data/enum";
import { useAuth } from "../providers/AuthProvider";

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
   * This method handles the authentication of an already registred user
   * The main part of the is offloaded to the AuthProvider and upon successfull
   * completion the method handles the redirect to the Dashboard view
   * @function
   * @async
   *
   * @param {FormPayload} data - The data coming straight from the form
   */
  const handleSubmit = async (data: FormPayload) => {
    await authenticateUser(data);
    history.push(ROUTES.DASHBOARD);
  };

  // -----------------------------------------------------------------
  // u s e E f f e c t
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // T e m p l a t e
  // -----------------------------------------------------------------
  return (
    <IonPage>
      <IonContent>
        <IonCard className="form_card">
          <IonCardHeader>
            <IonImg src={`${process.env.PUBLIC_URL}/assets/icon/icon.png`} />
            <IonCardTitle>Sign in</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText>
              Insert here your credentials in order to access and manage your
              account
            </IonText>
            <UserForm
              mode="SignIn"
              submitText="Login"
              onSubmit={handleSubmit}
            />
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
