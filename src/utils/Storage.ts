// ------------------------------------------------------------------
// I m p o r t s
// ------------------------------------------------------------------
import { Storage } from "@capacitor/storage";

/**
 * This method handles the wrtiting process to the Storage
 * (LocalStorage for Web, SharedPreference for Android or UserDefault for iOS)
 * and enables the possibility to save long term data across multiple session.
 * All the data is converted to a single JSON string in order to avoid multiple writing
 * for each single field in the object
 * @function
 * @async
 *
 * @param {string} key - The key to be added in the key-value store
 * @param {Object} payload - A generic Object with the data to be saved
 */
export const saveToStorage = async (key: string, payload: Object) => {
  await Storage.set({ key, value: JSON.stringify(payload) });
};

/**
 * This method handles the read of a previously written key-value pair
 * if the key value pair isn't present then null is returned, the method
 * gives also the possibility to cast as desired the coming data in order
 * to maintain type safety of Typescript
 * @function
 * @async
 *
 * @param {string} key - The key for which retrieve the data
 * @returns {Promise<T|null>} - The data requested or null if not present
 */
export const readFromStorage = async <T>(key: string) => {
  const { value } = await Storage.get({ key });
  if (!!value) return JSON.parse(value) as T;
  else return null;
};

/**
 * This function completely removes all the data saved with the given key
 * Please be aware that upon completion all the data saved with the given
 * key will be forever lost
 * @function
 * @async
 *
 * @param {string} key
 */
export const purgeFromStorage = async (key: string) => {
  await Storage.remove({ key });
};
