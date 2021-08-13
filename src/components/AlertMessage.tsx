// -----------------------------------------------------------------
// I m p o r t s
// -----------------------------------------------------------------
import { IonChip, IonIcon, IonLabel } from "@ionic/react";
import { alertCircleOutline } from "ionicons/icons";

/**
 * Component that shows to the user a simple alert message, the message
 * is either a string/text or a child component mounted inside the IonChip
 *
 * @component
 * @category Components
 * @subcategory Fragment
 */
const AlertMessage: React.FC = ({ children }) => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // u s e E f f e c t
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // T e m p l a t e
  // -----------------------------------------------------------------
  return (
    <IonChip className="alert_message">
      <IonIcon icon={alertCircleOutline} color="warning" />
      <IonLabel>{children}</IonLabel>
    </IonChip>
  );
};

export default AlertMessage;
