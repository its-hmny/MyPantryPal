// ------------------------------------------------------------------
// I m p o r t s
// ------------------------------------------------------------------
import { FormPayload } from "../components/UserForm";
import { ERRORS } from "../data/enum";

// Since the WebService doesn't have CORS enabled this proxy setup whats needed
const proxyServerUrl = "https://cors-anywhere.herokuapp.com/";
const baseUrl = `${proxyServerUrl}https://lam21.modron.network`;
// Default headers common to each request
const defaultHeaders = { "Content-Type": "application/json" };

/**
 * This function handles the WebService call to register a new User
 * to the platform, if the WeService returns an error then a translated
 * error is throwed
 * @function
 * @async
 *
 * @param {FormPayload} data - The data coming directly from the form
 * @return {Object} - The newly registred user, as seen by the WebService
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
 * This function handles the WebService call to authenticate a User retrieving
 * his access token, if the WeService returns an error then a translated
 * error is throwed
 * @function
 * @async
 *
 * @param {FormPayload} data - The data coming directly from the form
 * @returns {Object} OneTimeObject
 * @return {string} OneTimeObject.accessToken - The AT with which access the private endpoints
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
 * This function handles the WebService call to get all the information
 * avaiable about a given user, if the WeService returns an error then a
 *  translated error is throwed
 * @function
 * @async
 *
 * @param {string} accessToken - The acess token identifying the user
 * @return {Object} - The corresponding user, as seen by the WebService
 */
export const getAuthUser = async (accessToken: string) => {
  // Send the credentials to the WebService
  const response = await fetch(`${baseUrl}/users/me`, {
    method: "GET",
    // Adds the access token to the headers
    headers: { ...defaultHeaders, Authorization: `Bearer ${accessToken}` },
  });

  // If the user has been authenticated correctly
  if (response.status === 200) return await response.json();
  // Else throws an Error
  else throw Error(ERRORS.LOGIN_ERROR);
};
