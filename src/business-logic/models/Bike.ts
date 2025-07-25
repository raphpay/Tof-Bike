import type { Timestamp } from "firebase/firestore";

export default interface Bike {
  id: number;
  name: string;
  image: string;
  sizes: BikeSize[];
}

interface BikeSize {
  size: string; // e.g. "S", "M", "L"
  available: boolean;
}

export interface BikeData {
  id: string;
  name: string;
  lastCheck: Timestamp;
  pricePerHour: number;
  size: string;
  status: "available" | "repairing" | "unavailable";
  stock: number;
  type: "VTT" | "Route" | "E-VTT" | "BMX" | "Other";
}
