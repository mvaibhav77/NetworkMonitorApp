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
import "./global.css";

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
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  useEffect(() => {
    async function registerForPushNotificationsAsync() {
      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          Alert.alert("Notification permission not granted");
        }
      } else {
        console.warn("Must use physical device for notifications");
      }
    }

    registerForPushNotificationsAsync();
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
