import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import type { BikeData } from "../models/Bike";

// CREATE
// READ
export const getAllRentalBikes = async (): Promise<BikeData[]> => {
  const rentalBikesRef = collection(db, "rental-bikes");
  const bikesSnapshot = await getDocs(rentalBikesRef);
  return bikesSnapshot.docs.map((doc) => {
    const bikeId = doc.id;
    const data = doc.data() as BikeData;
    data.id = bikeId;
    return data;
  });
};
// UPDATE
// DELETE
