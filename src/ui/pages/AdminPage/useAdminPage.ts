import { useEffect, useState } from "react";
import type Accessory from "../../../business-logic/models/Accessory";
import type Bike from "../../../business-logic/models/Bike";
import type RentalCondition from "../../../business-logic/models/RentalCondition";
import { RentalConditionsService } from "../../../business-logic/services/RentalConditionsService";

export function useAdminPage() {
  const [data, setData] = useState<RentalCondition[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [filterDate, setFilterDate] = useState<string>("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const service = new RentalConditionsService();
      const conditions = await service.getRentalConditions();
      setData(conditions);
    } catch (error) {
      console.error("Erreur chargement données:", error);
    }
    setLoading(false);
  };

  const filteredData = data.filter((item) => {
    const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
    const matchesName = fullName.includes(searchName.toLowerCase());

    let matchesDate = true;
    if (filterDate) {
      const filterTimestampStart = new Date(filterDate);
      filterTimestampStart.setHours(0, 0, 0, 0);
      const filterTimestampEnd = new Date(filterDate);
      filterTimestampEnd.setHours(23, 59, 59, 999);

      const startDateTime = item.startDateTime.toDate();

      matchesDate =
        startDateTime >= filterTimestampStart &&
        startDateTime <= filterTimestampEnd;
    }

    return matchesName && matchesDate;
  });

  const formatBikeType = (bike: Bike) =>
    bike.type === "electric" ? "Vélo électrique" : "Vélo classique";

  const formatAccessoryType = (accessory: Accessory) => {
    switch (accessory.type) {
      case "helmet":
        return "Casque";
      case "lock":
        return "Antivol";
      case "pump":
        return "Pompe à vélo";
      case "repairKit":
        return "Kit de réparation";
      default:
        return accessory.other || "Accessoire inconnu";
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    loading,
    filteredData,
    searchName,
    filterDate,
    setSearchName,
    setFilterDate,
    formatBikeType,
    formatAccessoryType,
  };
}
