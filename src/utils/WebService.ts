import { FormPayload } from "../components/RegistrerForm";
import { ERRORS } from "../data/enum";

// Since the WebService doesn't have CORS enabled this proxy setup whats needed
const proxyServerUrl = "https://cors-anywhere.herokuapp.com/";
const baseUrl = `${proxyServerUrl}https://lam21.modron.network`;
// Default headers common to each request
const defaultHeaders = { "Content-Type": "application/json" };

/**
 * TODO COMMENT
 * @function
 * @async
 *
 * @param {FormPayload} data - The data coming directly from the form
 * @return {Object} - The newly registred user
 */
export const signUp = async (data: FormPayload) => {
  // Send the credentials to the WebService
  const response = await fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(data),
  });

  // If the user has been authenticated correctly
  if (response.status === 201) return await response.json();
  // Else throws an Error
  else throw Error(ERRORS.SIGNUP_ERROR);
};

/**
 * TODO COMMENT
 * @function
 * @async
 *
 * @param {FormPayload} data - The data coming directly from the form
 * @returns {Object} One_Time_Object
 * @return {string} One_Time_Object.accessToken -
 *          The AT with which access the private endpoints
 */
export const signIn = async (data: FormPayload) => {
  // Send the credentials to the WebService
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(data),
  });

  // If the user has been authenticated correctly
  if (response.status === 201) return await response.json();
  // Else throws an Error
  else throw Error(ERRORS.LOGIN_ERROR);
};

/**
 * TODO COMMENT
 * @function
 * @async
 *
 * TODO
 */
export const getAuthUser = async (accessToken: string) => {
  // Send the credentials to the WebService
  const response = await fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: { ...defaultHeaders, Authorization: `Bearer ${accessToken}` },
  });

  // If the user has been authenticated correctly
  if (response.status === 200) return await response.json();
  // Else throws an Error
  else throw Error(ERRORS.LOGIN_ERROR);
};
