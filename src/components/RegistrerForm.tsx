// ------------------------------------------------------------------
// I m p o r t s
// ------------------------------------------------------------------
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  useIonAlert,
} from "@ionic/react";
import { loadingController } from "@ionic/core";
import { useState } from "react";
import { ERRORS } from "../data/enum";

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

  // Helper function to present lert dialog to the user
  const [showAlert] = useIonAlert();

  // Default values for the form
  const defaultFormValues = {
    username: undefined,
    email: "",
    password: "",
  };

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------
  // Internal state where all the data written in the form are saved
  const [formData, setFormData] = useState<FormPayload>(defaultFormValues);

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------
  /**
   * A function that handles the change event trigger by a form item
   * it expects that any form item has its own name attribute and 
   * that the same name is used to update the value
   * @function
   */
  const handleChange = (e: any) => {
    if (!!e.target)
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * This methods handles wraps the onSubmit method passed by the parant 
   * component, it handles the render of a loading alert to the user and
   * eventually an error alert if something has gone wrong during the onSubmit()
   * @function
   * @async
   */
  const submitWrapper = async () => {
    // Creates and renders the loading dialog/modal
    const loading = await loadingController.create({ message: "Loading..." });
    await loading.present();
    try {
      const { username, email, password } = formData;
      // Data validation, checks that all the field are defined
      if (!!email && !!password && (!signUp || !!username))
        await onSubmit(formData);
      else throw Error(ERRORS.REQURED_DATA);
    } catch (err) {
      // Presents an error message to the user
      showAlert({
        header: "Error",
        message: err.message,
        buttons: ["Ok"],
      });
    } finally {
      // Removes the loading spinner
      await loading.dismiss();
    }
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
