import type BikeData from "../../../business-logic/models/Bike";
import Button from "../../components/Button";

interface DurationSelectionProps {
  bikes: BikeData[];
  selectedBikes: { bikeId: string; size: string; quantity: number }[];
  startTime: string;
  endTime: string;
  duration: number;
  setDuration: (duration: number) => void;
  setStartTime: (date: string) => void;
  setEndTime: (date: string) => void;
  handleNext: () => void;
  handleBack: () => void;
  setFinalPrice: (price: number) => void;
}

const DurationSelection: React.FC<DurationSelectionProps> = ({
  bikes,
  startTime,
  endTime,
  duration,
  selectedBikes,
  setDuration,
  setStartTime,
  setEndTime,
  handleNext,
  handleBack,
  setFinalPrice,
}) => {
  const getFinalPrice = () => {
    if (duration === 0 || selectedBikes.length === 0 || bikes.length === 0) {
      return 0;
    }

    let total = 0;

    selectedBikes.forEach((selected) => {
      const bike = bikes.find((b) => b.id === selected.bikeId);
      if (!bike) return;

      const rate =
        duration <= 60
          ? bike.pricePerHour
          : duration < 240
            ? bike.pricePerHalfDay
            : bike.pricePerDay;

      total += rate * selected.quantity;
    });

    return total;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {[60, 180, 480].map((min) => (
          <Button
            variant={min === duration ? "primary" : "secondary"}
            key={min}
            title={
              min === 60 ? "1 heure" : min === 180 ? "½ journée" : "1 journée"
            }
            onClick={() => {
              setDuration(min);
              const now = new Date();
              setStartTime(now.toISOString().slice(0, 16));
              setEndTime(
                new Date(now.getTime() + min * 60000)
                  .toISOString()
                  .slice(0, 16),
              );
              setFinalPrice(getFinalPrice());
            }}
          />
        ))}
      </div>

      {/* Price Display */}
      {duration > 0 && (
        <p className="text-primary font-semibold">
          Tarif total: {getFinalPrice().toFixed(2)}€
        </p>
      )}

      <div className="flex flex-col gap-4">
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>

      <div className="flex justify-start gap-4 pt-4">
        <Button
          title="Suivant"
          onClick={() => {
            setFinalPrice(getFinalPrice());
            handleNext();
          }}
          disabled={duration === 0}
        />
        <Button variant="underline" title="Retour" onClick={handleBack} />
      </div>
    </div>
  );
};

export default DurationSelection;
