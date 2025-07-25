import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const UnderConstructionPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-yellow-600">🚧</h1>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            Page en construction
          </h2>
          <p className="mt-2 text-gray-600">
            Cette page est actuellement en construction. Veuillez réessayer plus
            tard.
          </p>
          <div className="mt-6">
            <Button
              title="Revenir au menu principal"
              onClick={() => navigate("/")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderConstructionPage;
