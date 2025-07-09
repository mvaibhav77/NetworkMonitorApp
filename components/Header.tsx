import { Text, View } from "react-native";

export const Header = () => (
  <View className="items-center gap-4">
    <Text className="text-4xl font-semibold text-slate-800 dark:text-white">
      Network Monitor
    </Text>
    <Text className="text-slate-700 dark:text-slate-100">
      Monitor your network connectivity in real-time
    </Text>
  </View>
);
