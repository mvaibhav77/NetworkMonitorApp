import { ConnectionType, NetworkType } from "@/types/NetworkChange";
import * as Cellular from "expo-cellular";
import * as Network from "expo-network";

export const getResolvedNetworkInfo = async (): Promise<{
  connectionType: ConnectionType;
  networkType: NetworkType;
}> => {
  const network = await Network.getNetworkStateAsync();
  const cellular = await Cellular.getCellularGenerationAsync();

  const resolvedConnectionType: ConnectionType =
    network.type === Network.NetworkStateType.WIFI
      ? "WiFi"
      : network.type === Network.NetworkStateType.CELLULAR
        ? "Cellular"
        : "None";

  let resolvedNetworkType: NetworkType = "Unknown";
  switch (cellular) {
    case Cellular.CellularGeneration.CELLULAR_5G:
      resolvedNetworkType = "5G";
      break;
    case Cellular.CellularGeneration.CELLULAR_4G:
      resolvedNetworkType = "4G";
      break;
    case Cellular.CellularGeneration.CELLULAR_3G:
      resolvedNetworkType = "3G";
      break;
    case Cellular.CellularGeneration.CELLULAR_2G:
      resolvedNetworkType = "2G";
      break;
    default:
      resolvedNetworkType = "Unknown";
  }

  return {
    connectionType: resolvedConnectionType,
    networkType: resolvedNetworkType,
  };
};
