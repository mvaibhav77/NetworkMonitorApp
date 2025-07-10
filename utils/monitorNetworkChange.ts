import {
  getMonitorInitializedFlag,
  setMonitorInitializedFlag,
} from "@/store/flagStore";
import { addChange } from "@/store/historyStore";
import {
  ConnectionType,
  NetworkChange,
  NetworkType,
} from "@/types/NetworkChange";
import uuid from "react-native-uuid";
import { getResolvedNetworkInfo } from "./getNetworkInfo";
import { sendNetworkChangeNotification } from "./sendNotification";

type MonitorParams = {
  currentConnectionType: ConnectionType;
  currentNetworkType: NetworkType;
  setConnectionType: React.Dispatch<React.SetStateAction<ConnectionType>>;
  setNetworkType: React.Dispatch<React.SetStateAction<NetworkType>>;
  setChangesDetected?: React.Dispatch<React.SetStateAction<number>>;
};

export async function monitorNetworkChange({
  currentConnectionType,
  currentNetworkType,
  setConnectionType,
  setNetworkType,
  setChangesDetected,
}: MonitorParams) {
  const { connectionType: newConnectionType, networkType: newNetworkType } =
    await getResolvedNetworkInfo();

  const hasInitialized = await getMonitorInitializedFlag();

  const hasChanged =
    newConnectionType !== currentConnectionType ||
    newNetworkType !== currentNetworkType;

  if (hasInitialized && hasChanged) {
    console.log("##Network change detected##");

    const from =
      currentConnectionType === "Cellular"
        ? currentNetworkType
        : currentConnectionType;

    const to =
      newConnectionType === "Cellular" ? newNetworkType : newConnectionType;

    const change: NetworkChange = {
      id: uuid.v4() as string,
      from,
      to,
      timestamp: new Date().toISOString(),
    };

    await addChange(change);
    await sendNetworkChangeNotification(from, to);
    if (setChangesDetected) setChangesDetected((prev) => prev + 1);
  }

  setConnectionType(newConnectionType);
  setNetworkType(newNetworkType);

  if (!hasInitialized) {
    await setMonitorInitializedFlag();
  }
}
