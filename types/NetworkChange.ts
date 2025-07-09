export type NetworkType = "5G" | "4G" | "3G" | "2G" | "Unknown";
export type ConnectionType = "WiFi" | "Cellular" | "None";

export type NetworkValue = NetworkType | ConnectionType;

export interface NetworkChange {
  id: string;
  from: NetworkValue;
  to: NetworkValue;
  timestamp: string; // ISO string
}
