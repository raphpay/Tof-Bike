import type Bike from "../../../business-logic/models/Bike";
import Button from "../../components/Button";

interface SummaryProps {
  selectedBike: Bike | null;
  startTime: string;
  endTime: string;
  handleNext: () => void;
  handleBack: () => void;
}

const Summary: React.FC<SummaryProps> = ({
  selectedBike,
  startTime,
  endTime,
  handleNext,
  handleBack,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Résumé</h3>
      <p>
        <strong>Vélo :</strong> {selectedBike?.name}
      </p>
      <p>
        <strong>Début :</strong> {startTime.replace("T", " ")}
      </p>
      <p>
        <strong>Fin :</strong> {endTime.replace("T", " ")}
      </p>
      <div className="flex justify-start pt-4">
        <Button title="Continuer" onClick={handleNext} />
        <Button variant="underline" title="Retour" onClick={handleBack} />
      </div>
    </div>
  );
};

export default Summary;
