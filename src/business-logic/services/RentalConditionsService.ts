import type RentalCondition from "../models/RentalCondition";
import { FirestoreService } from "./FirestoreService";

export class RentalConditionsService {
  constructor() {}

  async getRentalConditions(): Promise<RentalCondition[]> {
    const service = new FirestoreService("rental-conditions");
    try {
      return await service.getDocuments<RentalCondition>();
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération des conditions de location : " + error,
      );
    }
  }
}
