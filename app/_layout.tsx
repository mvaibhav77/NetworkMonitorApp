import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeToggleButton } from "../components/ThemeToggleButton";
import { ThemeProvider, useTheme } from "../context/ThemeProvider";
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
