// ------------------------------------------------------------------
// I m p o r t s
// ------------------------------------------------------------------
import { IonButton, IonInput, IonItem, IonLabel, IonList } from "@ionic/react";
import { loadingController } from "@ionic/core";
import { useState } from "react";

// ------------------------------------------------------------------
// I n t e r f a c e s
// ------------------------------------------------------------------
interface Props {
  signUp?: boolean;
  onSubmit: (data: FormPayload) => Promise<void>;
  submitText: string;
}

// Data returned by the form, and eventually passed to the callback
export interface FormPayload {
  // Only defined when 'signUp' props is true
  username?: string;
  email: string;
  password: string;
}

/**
 * This fragment handles the form rendering for the Sign Up and Sign In
 * pages, it isolates and abtracts the shared logic for the two pages
 *
 * @component
 * @category Components
 * @subcategory Fragment
 */
const RegistrerForm: React.FC<Props> = (props) => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------
  // Properties and configurations coming from the parent component
  const { signUp = false, onSubmit, submitText } = props;
  // Default values for the form
  const defaultFormValues = {
    username: undefined,
    email: "",
    password: "",
  };

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------
  const [formData, setFormData] = useState<FormPayload>(defaultFormValues);

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------
  const handleChange = (e: any) => {
    if (!!e.target)
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitWrapper = async () => {
    // Creates and renders the loading dialog/modal
    const loading = await loadingController.create({ message: "Loading..." });
    await loading.present();

    const { username, email, password } = formData;
    // Data validation, checks that all the field are defined
    if (!!email && !!password && (!signUp || !!username)) {
      await onSubmit(formData);
    }

    await loading.dismiss();
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
    <>
      <IonList inset>
        {signUp && (
          <IonItem>
            <IonLabel>Username:</IonLabel>
            <IonInput
              autofocus
              required
              color="primary"
              name="username"
              inputMode="text"
              onIonChange={handleChange}
            />
          </IonItem>
        )}
        <IonItem>
          <IonLabel>Email:</IonLabel>
          <IonInput
            autofocus
            required
            color="primary"
            name="email"
            inputMode="email"
            onIonChange={handleChange}
          />
        </IonItem>
        <IonItem>
          <IonLabel>Password:</IonLabel>
          <IonInput
            required
            color="primary"
            inputMode="text"
            type="password"
            name="password"
            onIonChange={handleChange}
          />
        </IonItem>
      </IonList>
      <IonButton expand="block" onClick={submitWrapper}>
        {submitText}
      </IonButton>
    </>
  );
};

export default RegistrerForm;
