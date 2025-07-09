import { Link } from "expo-router";
import { History } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

type NetworkType = "5G" | "4G" | "3G" | "2G";
type ConnectionType = "WiFi" | "Cellular" | "None";

const HomeScreen = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [networkType, setNetworkType] = useState<NetworkType>("5G");
  const [connectionType, setConnectionType] = useState<ConnectionType>("WiFi");

  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        const types: NetworkType[] = ["5G", "4G", "3G", "2G"];
        setNetworkType(types[Math.floor(Math.random() * types.length)]);
      }
      if (Math.random() < 0.05) {
        const connections: ConnectionType[] = ["WiFi", "Cellular"];
        setConnectionType(
          connections[Math.floor(Math.random() * connections.length)]
        );
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  return (
    <ScrollView className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-6">
      {/* Header */}
      <View className="items-center mb-8">
        <Text className="text-3xl font-bold text-slate-800 mb-1">
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
    </ScrollView>
  );
};

export default HomeScreen;
