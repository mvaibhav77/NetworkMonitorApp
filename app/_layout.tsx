import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { BackHandler, PermissionsAndroid, Platform } from "react-native";
import { ThemeToggleButton } from "../components/ThemeToggleButton";
import { ThemeProvider, useTheme } from "../context/ThemeProvider";
import "./global.css";

function LayoutWrapper() {
  const { theme } = useTheme();
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === "android") {
        try {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
          ]);

          const allGranted = Object.values(granted).every(
            (result) => result === PermissionsAndroid.RESULTS.GRANTED
          );

          if (!allGranted) {
            console.warn("Permissions not granted. Exiting app.");
            BackHandler.exitApp(); // Close the app
          } else {
            setHasPermission(true);
          }
        } catch (err) {
          console.error("Permission error:", err);
          BackHandler.exitApp();
        }
      } else {
        // iOS: Just proceed (no permission needed)
        setHasPermission(true);
      }
    };

    requestPermissions();
  }, []);

  if (!hasPermission) return null; // Don’t render until permission is granted

  return (
    <NavigationThemeProvider
      value={theme === "dark" ? DarkTheme : DefaultTheme}
    >
      <>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="history" options={{ title: "Network History" }} />
          <Stack.Screen name="+not-found" />
        </Stack>

        <ThemeToggleButton />

        <StatusBar style={theme === "dark" ? "light" : "dark"} />
      </>
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
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
