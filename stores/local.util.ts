import AsyncStorage from "@react-native-async-storage/async-storage";

// Load from localStorage
export async function loadFromAsyncStorage<T extends Object>(
  store: string
): Promise<T[]> {
  try {
    const serializedItems = await AsyncStorage.getItem(store);
    if (serializedItems === null) {
      return [];
    }
    return JSON.parse(serializedItems);
  } catch (e) {
    console.error("Error loading items from AsyncStorage", e);
    return [];
  }
}

// Save to AsyncStorage
export async function saveToAsyncStorage<T extends Object>(
  store: string,
  items: T[]
) {
  try {
    const serializedItems = JSON.stringify(items);
    await AsyncStorage.setItem(store, serializedItems);
  } catch (e) {
    console.error("Error saving items to AsyncStorage", e);
  }
}
