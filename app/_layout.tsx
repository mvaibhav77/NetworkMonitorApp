import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import * as Device from "expo-device";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Alert } from "react-native";
import { ThemeToggleButton } from "../components/ThemeToggleButton";
import { ThemeProvider, useTheme } from "../utils/ThemeProvider";
import { setupAndroidNotificationChannel } from "../utils/notificationChannel";

import "./global.css";

// Set how notifications behave when received while app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowList: true,
  }),
});

function LayoutWrapper() {
  const { theme } = useTheme();

  return (
    <NavigationThemeProvider
      value={theme === "dark" ? DarkTheme : DefaultTheme}
    >
      <>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="history"
            options={{ title: "Network History", headerShown: false }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>

        <ThemeToggleButton />
        <StatusBar style={theme === "dark" ? "light" : "dark"} />
      </>
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  useEffect(() => {
    async function registerForNotifications() {
      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          Alert.alert("Permission not granted", "Notifications will not work.");
          return;
        }
      } else {
        console.warn("Must use physical device for notifications");
      }
    }

    registerForNotifications();
    setupAndroidNotificationChannel();
  }, []);

  const [fontsLoaded] = useFonts({
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider>
      <LayoutWrapper />
    </ThemeProvider>
  );
}
