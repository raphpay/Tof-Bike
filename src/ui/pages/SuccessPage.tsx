import { CheckCircle } from "lucide-react"; // optionnel pour une icône
import React from "react";

const SuccessPage: React.FC = () => {
  return (
    <div className="flex min-h-screen min-w-screen flex-col items-center justify-center bg-green-50 px-6 text-center">
      <CheckCircle className="mb-4 h-16 w-16 text-green-600" />
      <h1 className="mb-2 text-2xl font-bold text-green-700">
        Merci pour votre réservation !
      </h1>
      <p className="max-w-sm text-gray-700">Amusez-vous bien !</p>
    </div>
  );
};

export default SuccessPage;
