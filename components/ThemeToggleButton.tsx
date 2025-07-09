import { Moon, Sun } from "lucide-react-native";
import { Pressable } from "react-native";
import { useTheme } from "../utils/ThemeProvider";

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Pressable
      onPress={toggleTheme}
      className="absolute bottom-12 right-8 bg-slate-200 dark:bg-slate-800 p-2 rounded-full z-50 shadow-lg"
    >
      {theme === "light" ? (
        <Moon size={20} color="#334155" />
      ) : (
        <Sun size={20} color="#fbbf24" />
      )}
    </Pressable>
  );
}
