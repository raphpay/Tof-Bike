interface ContractProps {
  accepted: boolean;
  setAccepted: (value: boolean) => void;
  handleNext: () => void;
}

const Contract: React.FC<ContractProps> = ({
  accepted,
  setAccepted,
  handleNext,
}) => {
  return (
    <div className="space-y-4 text-left">
      <p className="text-sm text-gray-700">
        En réservant ce vélo, vous acceptez d’en prendre soin, de le retourner à
        l’heure prévue, et d’être responsable en cas de dommage ou de perte.
      </p>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          onChange={(e) => setAccepted(e.target.checked)}
        />
        <span className="text-sm">J’accepte les conditions de location</span>
      </label>
      <button
        className="rounded bg-blue-600 px-4 py-2 text-white"
        disabled={!accepted}
        onClick={handleNext}
      >
        Accepter & Continuer
      </button>
    </div>
  );
};

export default Contract;
