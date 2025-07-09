import { useTheme } from "@/utils/ThemeProvider";
import { Text, View } from "react-native";

interface Props {
  label: string;
  value: string;
  icon: React.ReactNode;
  valueColor?: string;
}

export const StatusCard = ({
  label,
  value,
  icon,
  valueColor = "#000",
}: Props) => {
  const { theme } = useTheme();

  return (
    <View className="bg-white/80 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-500 rounded-lg py-4 px-2 flex-1 flex-row items-center justify-start gap-2 shadow-lg">
      {icon}
      <View>
        <Text className="text-sm font-sans text-slate-600 dark:text-slate-300 uppercase">
          {label}
        </Text>
        <Text className="text-xl mt-2" style={{ color: valueColor }}>
          {value}
        </Text>
      </View>
    </View>
  );
};
