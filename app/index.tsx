import { Link } from "expo-router";
import { History } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type NetworkType = "5G" | "4G" | "3G" | "2G";
type ConnectionType = "WiFi" | "Cellular" | "None";

const HomeScreen = () => {

  return (
    <SafeAreaView className={`flex-1 justify-center items-center`}>
      <View className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-6">
        {/* Header */}
        <View className="items-center mb-8">
          <Text className="text-4xl font-semibold text-slate-800 mb-1 dark:text-white">
            Network Monitor
          </Text>
          <Text className="text-slate-600">
            Monitor your network connectivity in real-time
          </Text>
        </View>

        {/* Status Cards */}

        {/* Monitoring Status */}

        {/* Toggle Button */}

        {/* Navigation to History */}
        <Link
          href="/history"
          className="flex-row items-center justify-center h-12 bg-white/80 border border-slate-200 rounded-lg"
        >
          <History size={20} color="#334155" className="mr-2" />
          <Text className="text-base text-red-800 font-medium">
            View Network History
          </Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
