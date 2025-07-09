import { getHistory } from "@/store/historyStore";
import { NetworkChange } from "@/types/NetworkChange";
import { useTheme } from "@/utils/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { Clock, MoveLeft, MoveRight } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function formatTime(date: Date): string {
  return format(date, "h:mm a");
}

function formatDate(date: Date): string {
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  return isToday ? "Today" : format(date, "MMM d");
}

function NetworkBadge({
  type,
  variant,
}: {
  type: NetworkChange["from"];
  variant?: "solid" | "outline";
}) {
  return (
    <View
      className={`px-4 py-2 rounded-full ${
        variant === "outline"
          ? "border border-slate-400"
          : "bg-slate-800 dark:bg-slate-200"
      }`}
    >
      <Text
        className={`text-xs font-medium ${
          variant === "outline"
            ? "text-slate-700 dark:text-slate-300"
            : "text-white dark:text-black"
        }`}
      >
        {type}
      </Text>
    </View>
  );
}

export default function HistoryScreen() {
  const navigation = useNavigation();
  const [history, setHistory] = useState<NetworkChange[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    getHistory().then(setHistory);
  }, []);

  const renderItem = ({ item }: ListRenderItemInfo<NetworkChange>) => {
    const dateObj = new Date(item.timestamp);
    return (
      <TouchableOpacity
        key={item.id}
        className="p-4 rounded-lg bg-white/80 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-500 mb-2 shadow-lg"
      >
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center gap-x-4">
            <View className="flex-row items-center gap-x-2">
              <NetworkBadge type={item.from} variant="outline" />
              <MoveRight size={16} color="#94a3b8" />
              <NetworkBadge type={item.to} />
            </View>
          </View>
          <View className="flex-row items-center gap-x-2">
            <View className="items-end">
              <Text className="text-sm ont-sans text-slate-600 dark:text-slate-300">
                {formatTime(dateObj)}
              </Text>
              <Text className="text-xs ont-sans text-slate-600 dark:text-slate-300">
                {formatDate(dateObj)}
              </Text>
            </View>
            <Clock size={24} color="#94a3b8" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-slate-50 dark:bg-black pt-16 gap-6">
      <View className="flex-row items-center justify-start gap-6 border-b border-slate-200 dark:border-slate-700  px-6 pb-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MoveLeft
            color={theme === "dark" ? "#ccc" : "#333"}
            size={24}
            strokeWidth={2.5}
          />
        </TouchableOpacity>
        <Text className="text-2xl font-semibold text-slate-800 dark:text-white">
          Network History
        </Text>
      </View>

      {history.length === 0 ? (
        <View className="items-center py-24 px-6">
          <Text className="text-5xl mb-4">📱</Text>
          <Text className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-2">
            No Network Changes Yet
          </Text>
          <Text className="text-slate-500 mb-6 text-center">
            Start monitoring to see network changes appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingBottom: 40,
            paddingHorizontal: 16,
            gap: 8,
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
