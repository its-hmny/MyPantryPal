import { Storage } from "@capacitor/storage";

export const saveToStorage = async (key: string, payload: Object) => {
  await Storage.set({ key, value: JSON.stringify(payload) });
};

export const readFromStorage = async <T>(key: string) => {
  const { value } = await Storage.get({ key });
  if (!!value) return JSON.parse(value) as T;
  else return null;
};
