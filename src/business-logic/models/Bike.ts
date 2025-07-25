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
