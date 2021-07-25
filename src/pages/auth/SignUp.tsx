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
import RegistrerForm, { FormPayload } from "../../components/RegistrerForm";
import { ROUTES } from "../../data/enum";

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

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------
  const handleSubmit = async (data: FormPayload) => {
    console.log("BP__", "SignUp callback", data);
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
