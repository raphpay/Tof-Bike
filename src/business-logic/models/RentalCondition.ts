import type { Timestamp } from "firebase/firestore";

export default interface RentalCondition {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  bikes: { quantity: number; type: string }[];
  accessories: { quantity: number; type: string; other?: string }[];
  startDateTime: Timestamp;
  createdAt: Timestamp;
  signatureFilename: string;
}
