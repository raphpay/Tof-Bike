interface DurationSelectionProps {
  startTime: string;
  endTime: string;
  setDuration: (duration: number) => void;
  setStartTime: (date: string) => void;
  setEndTime: (date: string) => void;
  handleNext: () => void;
}

const DurationSelection: React.FC<DurationSelectionProps> = ({
  startTime,
  endTime,
  setDuration,
  setStartTime,
  setEndTime,
  handleNext,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {[30, 60, 180, 480].map((min) => (
          <button
            key={min}
            className="rounded bg-blue-100 px-4 py-2 hover:bg-blue-200"
            onClick={() => {
              setDuration(min);
              setStartTime(new Date().toISOString().slice(0, 16));
              setEndTime(
                new Date(Date.now() + min * 60000).toISOString().slice(0, 16),
              );
            }}
          >
            {min === 30
              ? "30 mins"
              : min === 60
                ? "1 heure"
                : min === 180
                  ? "½ journée"
                  : "1 journée"}
          </button>
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
      <button
        onClick={handleNext}
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
      >
        Suivant
      </button>
    </div>
  );
};

export default DurationSelection;
