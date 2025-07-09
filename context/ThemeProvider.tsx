import { useColorScheme as useNativewindColorScheme } from "nativewind";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme as useDeviceColorScheme } from "react-native";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: "light",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const deviceColorScheme = useDeviceColorScheme();
  const { setColorScheme } = useNativewindColorScheme();

  const [theme, setTheme] = useState<Theme>(deviceColorScheme || "light");

  useEffect(() => {
    setColorScheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
