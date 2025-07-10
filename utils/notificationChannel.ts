import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export async function setupAndroidNotificationChannel() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("network-change-alerts", {
      name: "network-change-alerts",
      importance: Notifications.AndroidImportance.MAX,
      sound: "bell.wav",
      vibrationPattern: [0, 500, 200, 500],
      lightColor: "#FF231F7C",
    });
  }
}
