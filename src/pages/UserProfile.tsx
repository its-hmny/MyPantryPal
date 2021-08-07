// -----------------------------------------------------------------
// I m p o r t s
// -----------------------------------------------------------------
import { Photo } from "@capacitor/camera";
import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonPage,
  IonRouterLink,
  IonText,
} from "@ionic/react";
import { useMemo } from "react";
import CameraFab from "../components/CameraFab";
import UserForm from "../components/UserForm";
import { useAuth } from "../providers/AuthProvider";

/**
 * This page allows the user to update his wn profile, changing or adding 
 * name and surname fields or uplaod a profile picture. It saves all changes
 * made persistenly on the Local Storage
 *
 * @component
 * @category Components
 * @subcategory View
 */
const UserProfileView: React.FC = () => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------
  // Get some basic info about the user
  const { user, updateUser, logout } = useAuth();

  // This memoized result is the image to be displayed in the card, it 
  // could either be the previous/current profile image or a placeholder
  const userProfileImage = useMemo(() => {
    if (!!user?.profile_image)
      return `data:image/${user.profile_image.format};base64,${user.profile_image.base64String}`;
    // TODO RETURN USER PLACEHOLDER
    else return `${process.env.PUBLIC_URL}/assets/icon/icon.png`;
  }, [user?.profile_image]);

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------
  /**
   * This function saves the given photo as the new user profile image
   * @function
   * @async
   * 
   * @param {Photo} newAvatar -  
   */
  const handleImageChange = async (newAvatar: Photo) => {
    await updateUser({ profile_image: newAvatar });
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
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonAvatar>
              <img src={userProfileImage} />
            </IonAvatar>
            <IonCardTitle>Change your profile</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText>
              Here you can customize some of aspect if your profile, such as the
              image or the name
            </IonText>
            <UserForm
              mode="Update"
              submitText="Save"
              onSubmit={updateUser}
            />
            <IonText>
              Already leaving?{" "}
              <IonRouterLink color="danger" onClick={logout}>
                Log out
              </IonRouterLink>
            </IonText>
          </IonCardContent>
        </IonCard>
        <CameraFab onPhotoTaken={handleImageChange} />
      </IonContent>
    </IonPage>
  );
};

export default UserProfileView;
