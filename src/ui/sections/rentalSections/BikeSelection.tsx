import type Bike from "../../../business-logic/models/Bike";

interface BikeSelectionProps {
  bike: Bike;
  selected: { bikeId: string; size: string }[];
  onSelect: (bikeId: string, size: string) => void;
}

const BikeSelection: React.FC<BikeSelectionProps> = ({
  bike,
  selected,
  onSelect,
}) => {
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
      {bike.sizes.map((s) => {
        const isSelected = selected.some(
          (sel) => sel.bikeId === bike.id.toString() && sel.size === s.size,
        );
        return (
          <button
            key={s.size}
            onClick={() => s.available && onSelect(bike.id.toString(), s.size)}
            className={`rounded border px-3 py-1 text-sm ${!s.available ? "cursor-not-allowed bg-gray-300" : ""} ${isSelected ? "bg-primary hover:bg-primary-dark text-white" : "hover:bg-primary-light bg-primary-lighter"} `}
            disabled={!s.available}
          >
            {s.size}
          </button>
        );
      })}
    </div>
  );
};

export default BikeSelection;
