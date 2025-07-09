import { TouchableOpacity, Text } from "react-native";

interface Props {
  isMonitoring: boolean;
  onToggle: () => void;
}

export const MonitorButton = ({ isMonitoring, onToggle }: Props) => (
  <TouchableOpacity
    onPress={onToggle}
    className={`${
      isMonitoring ? "bg-red-600" : "bg-blue-600"
    } rounded-full p-6 items-center justify-center shadow-lg h-full aspect-square`}
  >
    <Text className="text-white text-lg font-semibold">
      {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
    </Text>
  </TouchableOpacity>
);
