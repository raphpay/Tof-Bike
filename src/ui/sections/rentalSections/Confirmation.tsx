import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const Confirmation: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-4 text-center">
      <CheckCircle className="text-primary mx-auto h-10 w-10" />
      <h3 className="text-xl font-bold">Vélo réservé avec succès !</h3>
      <p>
        Rendez-vous au magasin pour récupérer votre vélo. Votre nom et prénom
        suffit pour récupérer vos vélos.
      </p>
      <Button title="Revenir au menu principal" onClick={() => navigate("/")} />
    </div>
  );
};

export default Confirmation;
