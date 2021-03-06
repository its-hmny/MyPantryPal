// ------------------------------------------------------------------
// I m p o r t s
// ------------------------------------------------------------------
import { useIonAlert, useIonViewWillLeave } from "@ionic/react";
import moment from "moment";
import { useState, useEffect, useContext, createContext } from "react";
import { FormPayload } from "../components/UserForm";
import { ERRORS } from "../data/enum";
import { AuthUser } from "../data/interfaces";
import { database, initDatabase, truncateDatabase } from "../utils/Database";
import {
  readFromStorage,
  saveToStorage,
  purgeFromStorage,
} from "../utils/Storage";
import { signIn, getAuthUser } from "../utils/WebService";

// ------------------------------------------------------------------
// I n t e r f a c e s
// ------------------------------------------------------------------
interface AuthData {
  isLoggedIn: boolean;
  user?: AuthUser;
  accessToken: string;
  expiresIn: number;
}

// The data/object provided to the consumers
interface ProvidedData extends AuthData {
  authenticateUser: (data: FormPayload) => Promise<void>;
  updateUser: (patch: Partial<AuthUser>) => Promise<void>;
  logout: () => Promise<void>;
}

// AuthContext initialization
const AuthContext = createContext<ProvidedData | undefined>(undefined);

/**
 * This component implements an authentication provider, that handles
 * the complete authentication flow (login, logout, retrieve of the user data)
 *
 * @component
 * @category Components
 * @subcategory Provider
 */
export const AuthProvider: React.FC = ({ children }) => {
  // -----------------------------------------------------------------
  // L o c a l   v a r s
  // -----------------------------------------------------------------
  // Helper function to present lert dialog to the user
  const [showAlert] = useIonAlert();

  // Temporary data used if no data is avaiable or the data has expired
  const defaultData = {
    isLoggedIn: false,
    user: undefined,
    accessToken: "",
    expiresIn: 0,
  };

  // -----------------------------------------------------------------
  // S t a t e
  // -----------------------------------------------------------------
  // Internal state representing the data about the authenticated user
  const [userData, setUserData] = useState<AuthData | null>(null);

  // -----------------------------------------------------------------
  // W o r k i n g   m e t h o d s
  // -----------------------------------------------------------------
  /**
   * This method check for previous session of user, if the access token is
   * still valid then restore that session, else a empty session is started
   * and the user must login again
   * @function
   * @async
   */
  const initAuthProvider = async () => {
    try {
      // Init & setup the database
      await initDatabase();

      // Get the current timestamp
      const now = moment();
      // Retrieve the precedent data if existent
      const previousData = await readFromStorage<AuthData>("user_data");

      // If the data doen't exist sets the "not logged in" state
      if (previousData === null) setUserData(defaultData);
      // If the access token has expired log the user out
      else if (now.isAfter(moment.unix(previousData.expiresIn))) await logout();
      // If the access token is still valid, loads the previous user
      else
        setUserData({
          ...previousData,
          isLoggedIn: true,
        });
    } catch (err) {
      showAlert(err.message);
    }
  };

  /**
   * This methods handles the full login flow both with the WebService at first
   * (retrieving the access token and the info about the user) and with the
   * Storage to save this infos across multiple session
   * @function
   * @async
   *
   * @param {FormPayload} data - The data coming from the RegistrationForm component
   */
  const authenticateUser = async (data: FormPayload) => {
    // With the credentials retrieve the accessToken
    const { accessToken } = await signIn(data);
    // With the access token retieves the AuthUser data
    const authUserData = await getAuthUser(accessToken);

    const payload = {
      accessToken,
      // New user data
      isLoggedIn: true,
      user: authUserData,
      // Since the access token expires after 7 days saves the expiration date
      // in order to know when the token is still usable and when not
      expiresIn: moment().add(7, "days").unix(),
    };

    // Updates the userData state
    setUserData(payload);
    // Updates the data as well for the next time
    await saveToStorage("user_data", payload);
  };

  /**
   * This function updates the auth user data persistently, it receives a
   * patch object with the fields to be changed, apples the patch and saves
   * the new result both on Local Storage and inside the state
   * @function
   * @async
   *
   * @param {Partial<AuthUser>} patch - The data to be changed
   */
  const updateUser = async (patch: Partial<AuthUser>) => {
    // Check that there's something to work on
    if (userData === null || userData.user === undefined)
      throw Error(ERRORS.GENERAL_ERROR);
    // Creates and renders the loading dialog/modal
    // Updates the userData state, applaying the patch to the user
    const updatedData = { ...userData, user: { ...userData.user, ...patch } };
    // Updates the data as well for the next time
    await saveToStorage("user_data", updatedData);
    setUserData(updatedData);
  };

  /**
   * This function handles the logut from the current auth user session
   * it removes all the data saved about the user and evntually show an
   * error notification if error are encountered during the process
   * @function
   * @async
   */
  const logout = async () => {
    try {
      // Resets the data to the default value
      setUserData(defaultData);
      // Updates the data in local storage as well for the next time
      await purgeFromStorage("user_data");
      // Restores the Database to default, wiping it clean
      await truncateDatabase();
    } catch (err) {
      // Presents an error message to the user
      showAlert(ERRORS.GENERAL_ERROR);
    }
  };

  // -----------------------------------------------------------------
  // u s e E f f e c t
  // -----------------------------------------------------------------
  // onMount retrieve and check the data about the previous authUser
  useEffect(() => {
    initAuthProvider();
  }, []);

  // onUnmount closes the database
  useIonViewWillLeave(async () => await database?.close());

  // -----------------------------------------------------------------
  // T e m p l a t e
  // -----------------------------------------------------------------
  return userData !== null ? (
    <AuthContext.Provider
      value={{ authenticateUser, updateUser, logout, ...userData }}
    >
      {children}
    </AuthContext.Provider>
  ) : null;
};

// Custom hook to retrieve the authentcated user data
export const useAuth = () => {
  const value = useContext(AuthContext);
  if (value === undefined) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return value;
};
