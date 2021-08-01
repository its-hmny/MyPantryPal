// ------------------------------------------------------------------
// I m p o r t s
// ------------------------------------------------------------------
import { useContext, createContext, useState, useEffect } from "react";
import { Storage } from "@capacitor/storage";
import moment from "moment";
import { FormPayload } from "../components/RegistrerForm";
import { AuthUser } from "../data/interfaces";
import { getAuthUser, signIn } from "../utils/WebService";
import { readFromStorage } from "../utils/Storage";
import { ROUTES } from "../data/enum";
import { useHistory } from "react-router";

// ------------------------------------------------------------------
// I n t e r f a c e s
// ------------------------------------------------------------------
interface AuthData {
  isLoggedIn: boolean;
  user?: AuthUser;
  accessToken: string;
  expiresIn: number;
  authenticateUser: (data: FormPayload) => Promise<any>;
}

// AuthContext initialization
const AuthContext = createContext<AuthData | undefined>(undefined);

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
  // Temporary data used if no data is avaiable
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
  const authenticateUser = async (data: FormPayload) => {
    // With the credentials retrieve the accessToken
    const { accessToken } = await signIn(data);
    // With the access token retieves the AuthUser data
    const authUserData = await getAuthUser(accessToken);

    const payload = {
      accessToken,
      authenticateUser,
      // New user data
      isLoggedIn: true,
      user: authUserData,
      expiresIn: moment().add(7, "days").unix(),
    };

    // Updates the userData state
    setUserData(payload);
    // Updates the data as well for the next time ()
    await Storage.set({ key: "user_data", value: JSON.stringify(payload) });
  };

  const initAuthProvider = async () => {
    // Get the current timestamp
    const now = moment();
    // Retrieve the precedent data if existent
    const previousData = await readFromStorage<AuthData>("user_data");

    // If the data doen't exist or the access token has expired, set the state
    // as if the user has not been logged, (SignIn view)
    if (!previousData || now.isAfter(moment.unix(previousData.expiresIn))) {
      setUserData({ ...defaultData, authenticateUser });
      return;
    }

    // If the access token is still valid, loads the previous user
    setUserData({
      ...previousData,
      isLoggedIn: true,
      authenticateUser,
    });
  };

  // -----------------------------------------------------------------
  // R e n d e r   m e t h o d s
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // u s e E f f e c t
  // -----------------------------------------------------------------
  // onMount retrieve and check the data about the previous authUser
  useEffect(() => {
    initAuthProvider();
  }, []);

  // on userData changed, write the changes to SharedPreference
  useEffect(() => console.log("BP__", userData), [userData]);

  // -----------------------------------------------------------------
  // T e m p l a t e
  // -----------------------------------------------------------------
  return userData !== null ? (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  ) : null;
};

// Custom hook to retrieve the authentcated user data
export const useAuth = () => {
  const value = useContext(AuthContext);
  if (value == undefined) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return value;
};
