import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
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

        {/* ✅ Safe to use the toggle button here */}
        <ThemeToggleButton />

        <StatusBar style={theme === "dark" ? "light" : "dark"} />
      </>
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LayoutWrapper />
    </ThemeProvider>
  );
}
