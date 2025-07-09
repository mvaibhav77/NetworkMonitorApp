import * as Notifications from "expo-notifications";

export async function sendNetworkChangeNotification(from: string, to: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Network Changed",
      body: `Switched from ${from} to ${to}`,
    },
    trigger: null, // Send immediately
  });
}
