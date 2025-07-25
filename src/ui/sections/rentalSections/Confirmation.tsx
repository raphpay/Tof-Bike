import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

interface ConfirmationProps {
  selectedBikeCount: number;
}

const Confirmation: React.FC<ConfirmationProps> = ({ selectedBikeCount }) => {
  const navigate = useNavigate();
  return (
    <div className="space-y-4 text-center">
      <CheckCircle className="text-primary mx-auto h-10 w-10" />
      {selectedBikeCount === 1 ? (
        <h3 className="text-xl font-bold">Vélo réservé avec succès !</h3>
      ) : (
        <h3 className="text-xl font-bold">Vélos réservés avec succès !</h3>
      )}
      {selectedBikeCount === 1 ? (
        <p>
          Rendez-vous au magasin pour récupérer votre vélo. Votre nom et prénom
          suffit pour le récupérer.
        </p>
      ) : (
        <p>
          Rendez-vous au magasin pour récupérer vos vélos. Votre nom et prénom
          suffit pour les récupérer.
        </p>
      )}
      <Button title="Revenir au menu principal" onClick={() => navigate("/")} />
    </div>
  );
};

export default Confirmation;
