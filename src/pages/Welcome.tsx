// -----------------------------------------------------------------
// I m p o r t s
// -----------------------------------------------------------------
import { IonContent, IonPage, setupConfig, useIonAlert } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getGroceryLists, initDatabase } from "../utils/Database";

/**
 * Component that shows to the user a simple text with debugging
 * pourposes
 *
 * @component
 * @category Components
 * @subcategory View
 */
const WelcomeView: React.FC = () => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------
  // Access the history stack of the browser/phone
  const history = useHistory();
  const [showAlert] = useIonAlert();

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------
  const [tmp, setTmp] = useState<string>("Initial");

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------
  const setup = async () => {
    try {
      await initDatabase();
      const res = await getGroceryLists();
      setTmp(JSON.stringify(res, undefined, 2));
    } catch (err) {
      showAlert(err.message);
    }
  };

  // -----------------------------------------------------------------
  // u s e E f f e c t
  // -----------------------------------------------------------------
  useEffect(() => {
    setup();
  }, []);

  // -----------------------------------------------------------------
  // T e m p l a t e
  // -----------------------------------------------------------------
  return (
    <IonPage>
      <IonContent>
        <p>{`You're currently on the route ${history.location.pathname}`}</p>
        <p>{tmp}</p>
      </IonContent>
    </IonPage>
  );
};

export default WelcomeView;
