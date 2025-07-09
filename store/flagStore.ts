import AsyncStorage from "@react-native-async-storage/async-storage";

const FLAG_KEY = "networkMonitorHasInitialized";

export async function setMonitorInitializedFlag() {
  await AsyncStorage.setItem(FLAG_KEY, "true");
}

export async function clearMonitorInitializedFlag() {
  await AsyncStorage.removeItem(FLAG_KEY);
}

export async function getMonitorInitializedFlag(): Promise<boolean> {
  const value = await AsyncStorage.getItem(FLAG_KEY);
  return value === "true";
}
