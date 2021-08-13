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
  useIonLoading,
} from "@ionic/react";
import { useState } from "react";
import { ERRORS } from "../data/enum";
import { useAuth } from "../providers/AuthProvider";

// ------------------------------------------------------------------
// I n t e r f a c e s
// ------------------------------------------------------------------
interface Props {
  mode: "SignIn" | "Update" | "SignUp";
  onSubmit: (data: FormPayload) => Promise<void>;
  submitText: string;
}

// Data returned by the form, and eventually passed to the callback
export interface FormPayload {
  // Only visible when mode props is "Update"
  firstname?: string;
  lastname?: string;
  // Only visible when mode props is "Update" or "SignUp"
  // Only modifiable when mode props is "SignUp"
  username?: string;
  // Only modifiable when mode props is "SignUp" or "SignIn"
  email: string;
  password: string;
}

/**
 * This fragment handles the form rendering for the Sign Up and Sign In
 * pages, it isolates and abtracts the shared logic for the two pages.
 * It also work as a Form to update other info about the user in "Update" mode
 *
 * @component
 * @category Components
 * @subcategory Fragment
 */
const UserForm: React.FC<Props> = (props) => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------
  // Properties and configurations coming from the parent component
  const { mode = "SignIn", onSubmit, submitText } = props;
  // Get some basic info about the user
  const { user } = useAuth();

  // Helper function to present lert dialog to the user
  const [showAlert] = useIonAlert();
  // Helper function to present a loding popup to the user
  const [showLoading, dismissLoading] = useIonLoading();

  // Default values for the form
  const defaultFormValues = {
    firstname: user?.firstname,
    lastname: user?.lastname,
    username: user?.username,
    email: user?.email ?? "",
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
   *
   * @param {GenricObject} e - The event object as returned by the components
   * TODO REMOVE ANY ANNOTATION
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
    showLoading("Loading...");
    try {
      const { username, email, password } = formData;
      // Data validation, checks that all the field are defined
      const isPswdValid = mode === "Update" || !!password;
      const isUsrnmValid = mode !== "SignUp" || !!username;
      if (!!email && isPswdValid && isUsrnmValid) await onSubmit(formData);
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
      dismissLoading();
    }
  };

  // -----------------------------------------------------------------
  // u s e E f f e c t
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // T e m p l a t e
  // -----------------------------------------------------------------
  return (
    <>
      <IonList inset>
        {mode === "Update" && (
          <IonItem>
            <IonLabel>Name:</IonLabel>
            <IonInput
              color="primary"
              name="firstname"
              inputMode="text"
              autocapitalize="words"
              value={formData.firstname}
              onIonChange={handleChange}
            />
          </IonItem>
        )}
        {mode === "Update" && (
          <IonItem>
            <IonLabel>Surname:</IonLabel>
            <IonInput
              color="primary"
              name="lastname"
              inputMode="text"
              autocapitalize="words"
              value={formData.lastname}
              onIonChange={handleChange}
            />
          </IonItem>
        )}
        {mode !== "SignIn" && (
          <IonItem>
            <IonLabel>Username:</IonLabel>
            <IonInput
              required
              color="primary"
              name="username"
              inputMode="text"
              value={formData.username}
              onIonChange={handleChange}
              disabled={mode === "Update"}
            />
          </IonItem>
        )}
        <IonItem>
          <IonLabel>Email:</IonLabel>
          <IonInput
            required
            color="primary"
            name="email"
            inputMode="email"
            value={formData.email}
            onIonChange={handleChange}
            disabled={mode === "Update"}
          />
        </IonItem>
        {mode !== "Update" && (
          <IonItem>
            <IonLabel>Password:</IonLabel>
            <IonInput
              required
              color="primary"
              inputMode="text"
              type="password"
              name="password"
              value={formData.password}
              onIonChange={handleChange}
            />
          </IonItem>
        )}
      </IonList>
      <IonButton expand="block" onClick={submitWrapper}>
        {submitText}
      </IonButton>
    </>
  );
};

export default UserForm;
