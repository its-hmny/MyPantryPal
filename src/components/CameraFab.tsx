// -----------------------------------------------------------------
// I m p o r t s
// -----------------------------------------------------------------
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { IonFab, IonFabButton, IonIcon, useIonAlert } from "@ionic/react";
import { camera } from "ionicons/icons";
import { isPlatform } from "@ionic/core";
import { ERRORS } from "../data/enum";

// ------------------------------------------------------------------
// I n t e r f a c e s
// ------------------------------------------------------------------
interface Props {
  onPhotoTaken: (photo: Photo) => Promise<void>;
}

/**
 * This component handles the rendering of Fab that let the user interact
 * with the camera of his phone, asking before for permission and then 
 * calls the callback passed by the parent component upon completion
 *
 * @component
 * @category Components
 * @subcategory Fragment
 */
const CameraFab: React.FC<Props> = ({ onPhotoTaken }) => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------
  // Helper function to present lert dialog to the user
  const [showAlert] = useIonAlert();

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------
  /**
   * This function handles the permission request to access the camera
   * and the eventual callback after the picture has been taken
   * @function
   * @async
   */
  const openCamera = async () => {
    try {
      const { camera: hasAlreadyPermission } = await Camera.checkPermissions();
      // If the user hasn't already granted the permissions for the Camera or has
      // granted a one time only permission before, ask again permissions
      if (hasAlreadyPermission !== "granted" && !isPlatform("mobileweb")) {
        const { camera } = await Camera.requestPermissions({
          permissions: ["camera"],
        });
        // Checks the request status, if denied simply returns
        if (camera === "denied") return;
      }

      // We have now permission to access the Camera
      const photo = await Camera.getPhoto({
        quality: 100, // Max possible
        allowEditing: false, // This is not Instagram
        resultType: CameraResultType.Base64,
        // Not interested in the user gallery
        source: CameraSource.Camera,
        webUseInput: true,
      });

      // Calls the callback provided by the parent component
      await onPhotoTaken(photo);
    } catch (err) {
      // Presents an error message to the user
      showAlert({
        header: "Error",
        message: ERRORS.GENERAL_ERROR,
        buttons: ["Ok"],
      });
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
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton onClick={openCamera} color="primary">
        <IonIcon icon={camera} />
      </IonFabButton>
    </IonFab>
  );
};

export default CameraFab;
