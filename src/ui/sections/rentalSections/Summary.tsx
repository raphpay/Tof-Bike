import type Bike from "../../../business-logic/models/Bike";
import Button from "../../components/Button";

interface SummaryProps {
  bikes: Bike[];
  selectedBikes: { bikeId: string; size: string }[];
  startTime: string;
  endTime: string;
  handleNext: () => void;
  handleBack: () => void;
}

const Summary: React.FC<SummaryProps> = ({
  bikes,
  selectedBikes,
  startTime,
  endTime,
  handleNext,
  handleBack,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Résumé</h3>

      <div className="space-y-2">
        {selectedBikes.length > 0 ? (
          selectedBikes.map(({ bikeId, size }, index) => {
            const bike = bikes.find((b) => b.id.toString() === bikeId);
            return (
              <div
                key={index}
                className="bg-secondary-lighter rounded-md border p-3"
              >
                <p>
                  <strong>Vélo :</strong> {bike ? bike.name : "Inconnu"}
                </p>
                <p>
                  <strong>Taille :</strong> {size}
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

      <div className="flex justify-start gap-4 pt-4">
        <Button title="Continuer" onClick={handleNext} />
        <Button variant="underline" title="Retour" onClick={handleBack} />
      </div>
    </div>
  );
};

export default Summary;
