import type BikeData from "../../../business-logic/models/Bike";

interface BikeSelectionProps {
  bike: BikeData;
  bikes: BikeData[];
  selectedBikes: { bikeId: string; size: string; quantity: number }[];
  onSelect: (bikeId: string, size: string, quantity: number) => void;
}

const BikeSelection: React.FC<BikeSelectionProps> = ({
  bike,
  bikes,
  selectedBikes,
  onSelect,
}) => {
  const selectedEntry = selectedBikes.find(
    (b) => b.bikeId === bike.id && b.size === bike.size,
  );

  const quantity = selectedEntry?.quantity ?? 0;
  const price = bike.pricePerHour * quantity;

  const increment = () => {
    if (quantity < bike.stock) {
      onSelect(bike.id, bike.size, quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 0) {
      onSelect(bike.id, bike.size, quantity - 1);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2 rounded-xl border p-4 shadow-sm">
      <h4 className="text-center font-semibold">{bike.name}</h4>
      <p className="text-sm text-gray-600">Taille: {bike.size}</p>
      <p className="text-sm text-gray-600">Stock: {bike.stock}</p>

      <div className="flex items-center space-x-2">
        <button
          onClick={decrement}
          className="rounded bg-gray-200 px-2 py-1 text-lg disabled:opacity-50"
          disabled={quantity === 0}
        >
          −
        </button>
        <span className="w-6 text-center">{quantity}</span>
        <button
          onClick={increment}
          className="rounded bg-gray-200 px-2 py-1 text-lg disabled:opacity-50"
          disabled={quantity >= bike.stock}
        >
          +
        </button>
      </div>

      <p className="text-sm text-gray-700">
        Prix / heure : <strong>{price.toFixed(2)} €</strong>
      </p>
    </div>
  );
};

export default BikeSelection;
