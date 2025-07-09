import { getHistory } from "@/store/historyStore";
import { NetworkChange } from "@/types/NetworkChange";
import { useTheme } from "@/utils/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { ArrowRight, Clock, MoveLeft } from "lucide-react-native";
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
      className={`px-2 py-0.5 rounded-full ${
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
        className="p-4 rounded-lg bg-white/80 dark:bg-neutral-950 border border-slate-200 dark:border-slate-700 shadow-sm mb-2"
      >
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center space-x-2">
            <Clock size={16} color="#94a3b8" />
            <View className="flex-row items-center space-x-2">
              <NetworkBadge type={item.from} variant="outline" />
              <ArrowRight size={16} color="#94a3b8" />
              <NetworkBadge type={item.to} />
            </View>
          </View>
          <View className="items-end">
            <Text className="text-sm font-medium text-slate-700 dark:text-slate-200">
              {formatTime(dateObj)}
            </Text>
            <Text className="text-xs text-slate-500 dark:text-slate-400">
              {formatDate(dateObj)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-slate-50 dark:bg-black pt-16 gap-6">
      <View className="flex-row items-center justify-start gap-6 border-b border-slate-200 dark:border-slate-700 mb-2 px-6 pb-4">
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
          contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 16 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
