import AsyncStorage from "@react-native-async-storage/async-storage";
import { NetworkChange } from "@/types/NetworkChange";

const HISTORY_KEY = "network_history";

export async function getHistory(): Promise<NetworkChange[]> {
  const raw = await AsyncStorage.getItem(HISTORY_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function addChange(change: NetworkChange) {
  const history = await getHistory();
  history.unshift(change); // Add new on top
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export async function clearHistory() {
  await AsyncStorage.removeItem(HISTORY_KEY);
}