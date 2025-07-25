import type Bike from "../../../business-logic/models/Bike";
import Button from "../../components/Button";

interface BikeSelectionProps {
  bike: Bike;
  onSelect: (bike: Bike) => void;
}

const BikeSelection: React.FC<BikeSelectionProps> = ({ bike, onSelect }) => {
  return (
    <div
      key={bike.id}
      className="flex flex-col items-center space-y-2 rounded-xl border p-4"
    >
      <img
        src={bike.image}
        alt={bike.name}
        className="h-32 w-32 rounded object-cover"
      />
      <h4 className="font-semibold">{bike.name}</h4>
      <span
        className={`text-sm font-medium ${bike.available ? "text-primary" : "text-primary-light"}`}
      >
        {bike.available ? "Disponible" : "Indisponible"}
      </span>
      <Button
        title="Sélectionner"
        disabled={!bike.available}
        onClick={() => {
          onSelect(bike);
        }}
      />
    </div>
  );
};

export default BikeSelection;
