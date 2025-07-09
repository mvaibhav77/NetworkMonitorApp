import { Header } from "@/components/Header";
import { MonitorButton } from "@/components/MonitorButton";
import { MonitoringStatus } from "@/components/MonitoringStatus";
import { SessionStats } from "@/components/SessionStats";
import { StatusCard } from "@/components/StatusCard";
import { useTheme } from "@/context/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import * as Cellular from "expo-cellular";
import * as Network from "expo-network";
import {
  ChartNoAxesColumnIncreasing,
  History,
  Wifi,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type NetworkType = "5G" | "4G" | "3G" | "2G" | "Unknown";
type ConnectionType = "WiFi" | "Cellular" | "None";

const HomeScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const [isMonitoring, setIsMonitoring] = useState(false);
  const [networkType, setNetworkType] = useState<NetworkType>("Unknown");
  const [connectionType, setConnectionType] = useState<ConnectionType>("None");
  const [changesDetected, setChangesDetected] = useState(0);
  const [sessionMinutes, setSessionMinutes] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let startTime: number;

    const checkNetwork = async () => {
      const network = await Network.getNetworkStateAsync();
      const cellular = await Cellular.getCellularGenerationAsync();

      const newConnectionType: ConnectionType =
        network.type === Network.NetworkStateType.WIFI
          ? "WiFi"
          : network.type === Network.NetworkStateType.CELLULAR
            ? "Cellular"
            : "None";

      let newNetworkType: NetworkType = "Unknown";

      switch (cellular) {
        case Cellular.CellularGeneration.CELLULAR_5G:
          newNetworkType = "5G";
          break;
        case Cellular.CellularGeneration.CELLULAR_4G:
          newNetworkType = "4G";
          break;
        case Cellular.CellularGeneration.CELLULAR_3G:
          newNetworkType = "3G";
          break;
        case Cellular.CellularGeneration.CELLULAR_2G:
          newNetworkType = "2G";
          break;
        default:
          newNetworkType = "Unknown";
      }

      if (
        newConnectionType !== connectionType ||
        newNetworkType !== networkType
      ) {
        setChangesDetected((prev) => prev + 1);
      }

      setConnectionType(newConnectionType);
      setNetworkType(newNetworkType);
    };

    if (isMonitoring) {
      startTime = Date.now();
      checkNetwork();
      interval = setInterval(() => {
        checkNetwork();
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        setSessionMinutes(Math.floor(elapsedSeconds / 60));
      }, 6000);
    }

    return () => clearInterval(interval);
  }, [isMonitoring, connectionType, networkType]);

  return (
    <View className="flex-1 pt-16 pb-12 px-6 gap-8">
      <Header />

      <View className="flex-row justify-around gap-4">
        <StatusCard
          label="Network"
          value={networkType}
          icon={
            <ChartNoAxesColumnIncreasing
              color={theme === "dark" ? "#ccc" : "#333"}
              size={22}
            />
          }
          valueColor="#3b82f6"
        />
        <StatusCard
          label="Connection"
          value={connectionType}
          icon={<Wifi color={theme === "dark" ? "#ccc" : "#333"} size={22} />}
          valueColor="#10b981"
        />
      </View>

      <MonitoringStatus isMonitoring={isMonitoring} />

      <View className="items-center justify-center max-h-52 flex-1">
        <MonitorButton
          isMonitoring={isMonitoring}
          onToggle={() => {
            setIsMonitoring((prev) => !prev);
            setChangesDetected(0);
            setSessionMinutes(0);
          }}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("history" as never)}
        className="bg-white/80 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-500 rounded-lg p-4 flex-row items-center justify-center gap-2 shadow-lg "
      >
        <History
          size={24}
          color={theme === "dark" ? "#ccc" : "#333"}
          className="mr-2"
        />
        <Text className="text-lg text-slate-800 dark:text-white font-medium">
          View Network History
        </Text>
      </TouchableOpacity>

      {isMonitoring && (
        <SessionStats minutes={sessionMinutes} changes={changesDetected} />
      )}
    </View>
  );
};

export default HomeScreen;
