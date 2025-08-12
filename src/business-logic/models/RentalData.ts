import type Accessory from "./Accessory";
import type Bike from "./Bike";

export default interface RentalData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bikes: Bike[];
  accessories: Accessory[];
  startDateTime: Date;
  createdAt: Date;
  signature?: string; // si tu stockes une signature image ou texte
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}
