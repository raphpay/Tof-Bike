import { CheckCircle } from "lucide-react";

const Confirmation: React.FC = () => {
  return (
    <div className="space-y-4">
      <CheckCircle className="mx-auto h-10 w-10 text-green-500" />
      <h3 className="text-xl font-bold">Vélo réservé avec succès !</h3>
      <p className="text-gray-600">
        Rendez-vous au magasin pour récupérer votre vélo. Le code de
        déverrouillage vous sera envoyé par SMS.
      </p>
      <button className="rounded bg-blue-600 px-4 py-2 text-white">
        Commencer la location
      </button>
    </div>
  );
};

export default Confirmation;
