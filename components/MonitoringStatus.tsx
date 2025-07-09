import { View, Text } from "react-native";
import { Circle } from "lucide-react-native";

interface Props {
  isMonitoring: boolean;
}

export const MonitoringStatus = ({ isMonitoring }: Props) => (
  <View className="bg-white/80 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-500 rounded-lg p-4 flex-row items-center justify-start gap-4 shadow-lg">
    <Circle
      color={isMonitoring ? "red" : "gray"}
      fill={isMonitoring ? "red" : "gray"}
      size={18}
    />
    <View>
      <Text className="text-sm font-sans text-slate-600 dark:text-slate-300 uppercase">
        Status
      </Text>
      <Text className="text-xl text-blue-600 mt-2">
        {isMonitoring ? "Active Monitoring" : "Monitoring Inactive"}
      </Text>
    </View>
  </View>
);
