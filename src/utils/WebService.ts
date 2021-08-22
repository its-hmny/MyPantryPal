// ------------------------------------------------------------------
// I m p o r t s
// ------------------------------------------------------------------
import { FormPayload } from "../components/UserForm";
import { ERRORS } from "../data/enum";
import { Product } from "../data/interfaces";

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

/**
 * This function handles the WebService call to get all the information
 * avaiable about a given user, if the WeService returns an error then a
 * translated error is throwed
 * @function
 * @async
 *
 * @param {string} accessToken - The acess token identifying the user
 * @return {Object} OneTimeObject - The corresponding user, as seen by the WebService
 * @return {string} OneTimeObject.token - A string identifiying the current (search) session
 * @return {Product[]} OneTimeObject.products - The products with the given barcode found by the WS
 */
export const getProductsWithBarcode = async (
  accessToken: string,
  barcode: string
): Promise<{ token: string; products: Product[] }> => {
  // Send the credentials to the WebService
  const response = await fetch(`${baseUrl}/products?barcode=${barcode}`, {
    method: "GET",
    // Adds the access token to the headers
    headers: { ...defaultHeaders, Authorization: `Bearer ${accessToken}` },
  });

  // If the user has been authenticated correctly
  if (response.status === 200) return await response.json();
  // Else throws an Error
  else throw Error(ERRORS.GENERAL_ERROR);
};

/**
 * This function handles the WeService API call to share a new product in the
 * shared knowledge database through the WebService
 * @function
 * @async
 *
 * @param {string} accessToken - The acess token identifying the user
 * @param {string} sessionToken - The uuid of the current session (stats pourposes)
 * @param {Product} product - The new product to shared with the other users
 * @returns {Promise<Object>} - Whatever the WebService returns as response
 */
export const shareNewProduct = async (
  accessToken: string,
  sessionToken: string,
  product: Product
) => {
  const response = await fetch(`${baseUrl}/products`, {
    method: "POST",
    // Adds the access token to the headers
    headers: { ...defaultHeaders, Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({
      token: sessionToken,
      name: product.name,
      description: product.description,
      barcode: product.barcode,
      test: true,
    }),
  });

  // If the user has been authenticated correctly
  if (response.status === 201) return await response.json();
  // Else throws an Error
  else window.alert(JSON.stringify(await response.json())); //throw Error(ERRORS.GENERAL_ERROR);
};

/**
 * This function handles the WeService API call to upvote a product suggested by the
 * WebService itself through the shared database, in order to give a feedback to the
 * WebService itself
 * @function
 * @async
 *
 * @param {string} accessToken - The acess token identifying the user
 * @param {string} sessionToken - The uuid of the current session (stats pourposes)
 * @param {string} productId - The id of the product to be upvoted
 * @returns {Promise<Object>} - Whatever the WebService returns as response
 */
export const upvoteProduct = async (
  accessToken: string,
  sessionToken: string,
  productId: string
) => {
  const response = await fetch(`${baseUrl}/votes`, {
    method: "POST",
    // Adds the access token to the headers
    headers: { ...defaultHeaders, Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({
      token: sessionToken,
      rating: 1,
      productId,
    }),
  });

  // If the user has been authenticated correctly
  if (response.status === 200) return await response.json();
  // Else throws an Error
  else throw Error(ERRORS.GENERAL_ERROR);
};
