import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

interface ContractProps {
  accepted: boolean;
  setAccepted: (value: boolean) => void;
  handleNext: () => void;
  handleBack: () => void;
}

const Contract: React.FC<ContractProps> = ({
  accepted,
  setAccepted,
  handleNext,
  handleBack,
}) => {
  const navigate = useNavigate();
  return (
    <div className="space-y-4 text-left">
      <p className="text-sm text-gray-700">
        En réservant ce vélo, vous acceptez d'en prendre soin, de le retourner à
        l'heure prévue, et d'être responsable en cas de dommage ou de perte.
      </p>
      <Button
        title="Voir les conditions complètes"
        variant="underline"
        onClick={() => navigate("/location-conditions")}
      />
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          onChange={(e) => setAccepted(e.target.checked)}
        />
        <span className="text-sm">J'accepte les conditions de location</span>
      </label>
      <div className="flex justify-start pt-4">
        <Button
          title="Accepter et continuer"
          onClick={handleNext}
          disabled={!accepted}
        />
        <Button title="Retour" variant="underline" onClick={handleBack} />
      </div>
    </div>
  );
};

export default Contract;
