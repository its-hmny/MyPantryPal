// -----------------------------------------------------------------
// I m p o r t s
// -----------------------------------------------------------------
import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { close, save } from "ionicons/icons";
import moment from "moment";
import { useState } from "react";
import { GroceryList } from "../data/interfaces";
import { TestGroceriesList } from "../data/tmp";

// ------------------------------------------------------------------
// I n t e r f a c e s
// ------------------------------------------------------------------
interface Props {
  onListCreated: (newList: GroceryList) => Promise<void> | void;
  onCancel: () => Promise<void> | void;
}

/**
 * TODO COMMENT
 *
 * @component
 * @category Components
 * @subcategory View
 */
const NewGroceryListView: React.FC<Props> = ({ onListCreated, onCancel }) => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------
  // "Buffer" in which the Work in Progress data will be kept
  const [formData, setFormData] = useState<Partial<GroceryList>>({
    date: 1628669757,
    products: [],
  });

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

  const validateData = async () => {
    if (!!formData.name) {
      const newList = formData as GroceryList;
      TestGroceriesList.push(newList);
      await onListCreated(newList);
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
    <IonPage>
      {/* Page header */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start" color="primary">
            <IonButton onClick={onCancel}>Close</IonButton>
          </IonButtons>
          <IonTitle>New grocery list</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Page main content, the form in which the data can be set */}
      <IonContent>
        <IonList inset>
          <IonItem>
            <IonLabel>Name:</IonLabel>
            <IonInput
              name="name"
              inputMode="text"
              autocapitalize="words"
              value={formData.name}
              onIonChange={handleChange}
            />
          </IonItem>
          <IonItem>
            <IonLabel>Date:</IonLabel>
            <IonDatetime
              name="date"
              pickerFormat="DD/MM/YYYY"
              value={
                !!formData.date
                  ? moment(formData.date).format("DD/MM/YYYY")
                  : undefined
              }
              onIonChange={handleChange}
            />
          </IonItem>
        </IonList>
      </IonContent>

      {/* Page footer, contaiing the user possible outcomes */}
      <IonFooter>
        <IonRow className="ion-justify-content-evenly">
          <IonButton color="danger" onClick={onCancel}>
            <IonIcon icon={close} /> Cancel
          </IonButton>
          <IonButton onClick={validateData}>
            <IonIcon icon={save} /> Save
          </IonButton>
        </IonRow>
      </IonFooter>
    </IonPage>
  );
};

export default NewGroceryListView;
