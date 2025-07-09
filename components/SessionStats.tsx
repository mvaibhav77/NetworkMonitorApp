import { Text, View } from "react-native";

interface Props {
  minutes: number;
  changes: number;
}

export const SessionStats = ({ minutes, changes }: Props) => (
  <View className="bg-green-400/30 dark:bg-green-500/20 border border-green-500/40 dark:border-green-400/50 rounded-lg p-3 items-center justify-center gap-1">
    <Text className="text-green-700 dark:text-green-300 uppercase">
      Session Active
    </Text>
    <Text className="text-green-800 dark:text-green-200 text-lg font-semibold">
      {minutes} min
    </Text>
    <Text className="text-green-700 dark:text-green-300 text-sm">
      {changes} changes detected
    </Text>
  </View>
);
