import type Bike from "../../../business-logic/models/Bike";

interface SummaryProps {
  selectedBike: Bike | null;
  startTime: string;
  endTime: string;
  handleNext: () => void;
}

const Summary: React.FC<SummaryProps> = ({
  selectedBike,
  startTime,
  endTime,
  handleNext,
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
      <button
        className="rounded bg-blue-600 px-4 py-2 text-white"
        onClick={handleNext}
      >
        Continuer
      </button>
    </div>
  );
};

export default Summary;
