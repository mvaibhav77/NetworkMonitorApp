import { Header } from "@/components/Header";
import { MonitorButton } from "@/components/MonitorButton";
import { MonitoringStatus } from "@/components/MonitoringStatus";
import { SessionStats } from "@/components/SessionStats";
import { StatusCard } from "@/components/StatusCard";
import { clearMonitorInitializedFlag } from "@/store/flagStore";
import { ConnectionType, NetworkType } from "@/types/NetworkChange";
import { monitorNetworkChange } from "@/utils/monitorNetworkChange";
import { useTheme } from "@/utils/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import * as Cellular from "expo-cellular";
import {
  ChartNoAxesColumnIncreasing,
  History,
  Wifi,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const HomeScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const [isMonitoring, setIsMonitoring] = useState(false);
  const [networkType, setNetworkType] = useState<NetworkType>("Unknown");
  const [connectionType, setConnectionType] = useState<ConnectionType>("None");
  const [changesDetected, setChangesDetected] = useState(0);
  const [sessionMinutes, setSessionMinutes] = useState(0);

  // Legacy Android-only permission request (not needed anymore with expo-cellular)
  /* function below --->
  const requestPhoneStatePermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        {
          title: "Phone State Permission",
          message:
            "We need access to your phone's network state to monitor network connectivity.",
          buttonPositive: "OK",
          buttonNegative: "Cancel",
        }
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    return true; 
  };
  */

  const requestPhoneStatePermission = async () => {
    const { status } = await Cellular.getPermissionsAsync();

    if (status === "granted") {
      return true;
    }

    const { status: requestStatus } = await Cellular.requestPermissionsAsync();
    return requestStatus === "granted";
  };

  const handleToggleMonitoring = async () => {
    if (!isMonitoring) {
      const hasPermission = await requestPhoneStatePermission();
      if (!hasPermission) {
        Alert.alert(
          "Permission Denied",
          "We cannot monitor network status without permission."
        );
        return;
      }
    } else {
      await clearMonitorInitializedFlag();
      setConnectionType("None");
      setNetworkType("Unknown");
    }

    setIsMonitoring((prev) => !prev);
    setChangesDetected(0);
    setSessionMinutes(0);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let startTime: number;

    const checkNetwork = () => {
      monitorNetworkChange({
        currentConnectionType: connectionType,
        currentNetworkType: networkType,
        setConnectionType,
        setNetworkType,
        setChangesDetected,
      });
    };

    if (isMonitoring) {
      startTime = Date.now();
      checkNetwork();
      interval = setInterval(() => {
        checkNetwork();
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        setSessionMinutes(Math.floor(elapsedSeconds / 60));
      }, 6000);
    } else {
      clearMonitorInitializedFlag(); // reset when monitoring stops
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
          onToggle={handleToggleMonitoring}
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
