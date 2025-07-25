import Button from "../../components/Button";

interface DurationSelectionProps {
  startTime: string;
  endTime: string;
  duration: number;
  setDuration: (duration: number) => void;
  setStartTime: (date: string) => void;
  setEndTime: (date: string) => void;
  handleNext: () => void;
  handleBack: () => void;
}

const DurationSelection: React.FC<DurationSelectionProps> = ({
  startTime,
  endTime,
  duration,
  setDuration,
  setStartTime,
  setEndTime,
  handleNext,
  handleBack,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {[30, 60, 180, 480].map((min) => (
          <Button
            variant="primary"
            key={min}
            title={
              min === 30
                ? "30 mins"
                : min === 60
                  ? "1 heure"
                  : min === 180
                    ? "½ journée"
                    : "1 journée"
            }
            onClick={() => {
              setDuration(min);
              setStartTime(new Date().toISOString().slice(0, 16));
              setEndTime(
                new Date(Date.now() + min * 60000).toISOString().slice(0, 16),
              );
            }}
          />
        ))}
      </div>
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
      <div className="flex justify-start pt-4">
        <Button
          title="Suivant"
          onClick={handleNext}
          disabled={duration === 0}
        />
        <Button variant="underline" title="Retour" onClick={handleBack} />
      </div>
    </div>
  );
};

export default DurationSelection;
