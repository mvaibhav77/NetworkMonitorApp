import { Circle } from "lucide-react-native";
import { Text, View } from "react-native";

interface Props {
  isMonitoring: boolean;
}

export const MonitoringStatus = ({ isMonitoring }: Props) => (
  <View className="bg-white/80 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-500 rounded-lg p-4 flex-row items-center justify-between shadow-lg">
    {/* Left side: status icon and text */}
    <View className="flex-row items-center gap-4">
      <Circle
        color={isMonitoring ? "red" : "gray"}
        fill={isMonitoring ? "red" : "gray"}
        size={18}
      />
      <View>
        <Text className="text-sm font-sans text-slate-600 dark:text-slate-300 uppercase">
          Status
        </Text>
        <Text className="text-xl font-semibold text-black dark:text-white mt-2">
          {isMonitoring ? "Active Monitoring" : "Monitoring Inactive"}
        </Text>
      </View>
    </View>

    {isMonitoring && (
      <View className="bg-red-600 px-2 py-1 rounded-md">
        <Text className="text-xs text-white font-bold tracking-wider">
          LIVE
        </Text>
      </View>
    )}
  </View>
);
