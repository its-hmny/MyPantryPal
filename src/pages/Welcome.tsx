// -----------------------------------------------------------------
// I m p o r t s
// -----------------------------------------------------------------
import { IonContent, IonPage, useIonAlert } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { DB_TABLES } from "../data/enum";
import { database } from "../utils/Database";

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
      const gl = (
        await database.query(`SELECT * FROM ${DB_TABLES.GROCERY_LIST}`)
      ).values;
      const prods = (
        await database.query(`SELECT * FROM ${DB_TABLES.PRODUCTS}`)
      ).values;
      const qty = (
        await database.query(`SELECT * FROM ${DB_TABLES.QUANTITIES}`)
      ).values;
      setTmp(`
${JSON.stringify(gl, undefined, 2)}

${JSON.stringify(
  prods?.map((p) => {
    delete p.img;
    return p;
  }),
  undefined,
  2
)}

${JSON.stringify(qty, undefined, 2)}
      `);
    } catch (err) {
      showAlert(err.message);
    }
  };

  // -----------------------------------------------------------------
  // u s e E f f e c t
  // -----------------------------------------------------------------
  useEffect(() => {
    setup();
  });

  // -----------------------------------------------------------------
  // T e m p l a t e
  // -----------------------------------------------------------------
  return (
    <IonPage>
      <IonContent>
        <p>{`You're currently on the route ${history.location.pathname}`}</p>
        <pre>{tmp}</pre>
      </IonContent>
    </IonPage>
  );
};

export default WelcomeView;
