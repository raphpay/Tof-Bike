import type BikeData from "../../../business-logic/models/Bike";
import Button from "../../components/Button";

interface SummaryProps {
  bikes: BikeData[];
  selectedBikes: { bikeId: string; size: string; quantity: number }[];
  startTime: string;
  endTime: string;
  finalPrice: number;
  handleNext: () => void;
  handleBack: () => void;
}

const Summary: React.FC<SummaryProps> = ({
  bikes,
  selectedBikes,
  startTime,
  endTime,
  finalPrice,
  handleNext,
  handleBack,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Résumé</h3>

      <div className="space-y-2">
        {selectedBikes.length > 0 ? (
          selectedBikes.map(({ bikeId, size, quantity }, index) => {
            const bike = bikes.find((b) => b.id === bikeId && b.size === size);
            return (
              <div key={index} className="rounded-md border bg-gray-50 p-3">
                <p>
                  <strong>Vélo :</strong> {bike?.name} ({size})
                </p>
                <p>
                  <strong>Quantité :</strong> {quantity}
                </p>
              </div>
            );
          })
        ) : (
          <p>Aucun vélo sélectionné.</p>
        )}
      </div>

      <p>
        <strong>Début :</strong> {startTime.replace("T", " ")}
      </p>
      <p>
        <strong>Fin :</strong> {endTime.replace("T", " ")}
      </p>

      <p className="font-semibold">Prix total : {finalPrice.toFixed(2)} €</p>

      <div className="flex justify-start gap-4 pt-4">
        <Button title="Continuer" onClick={handleNext} />
        <Button variant="underline" title="Retour" onClick={handleBack} />
      </div>
    </div>
  );
};

export default Summary;
