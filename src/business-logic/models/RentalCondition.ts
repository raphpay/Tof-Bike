import type { Timestamp } from "firebase/firestore";
import type Accessory from "./Accessory";
import type Bike from "./Bike";

export default interface RentalCondition {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  bikes: Bike[];
  accessories: Accessory[];
  startDateTime: Timestamp;
  createdAt: Timestamp;
  signatureFilename: string;
}
