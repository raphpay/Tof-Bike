import type { Timestamp } from "firebase/firestore";

export default interface BikeData {
  id: string;
  name: string;
  lastCheck: Timestamp;
  pricePerHour: number;
  pricePerHalfDay: number;
  pricePerDay: number;
  size: string;
  status: "available" | "repairing" | "unavailable";
  stock: number;
  type: "VTT" | "Route" | "E-VTT" | "BMX" | "Other";
}
