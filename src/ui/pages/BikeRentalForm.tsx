import React, { useState } from "react";
import Button from "../components/Button";

export default function BikeRentalForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    acceptTerms: false,
    acceptPrivacy: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptTerms || !formData.acceptPrivacy) {
      alert(
        "Veuillez accepter les conditions et la politique de confidentialité.",
      );
      return;
    }

    console.log("Formulaire soumis :", formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-md space-y-6 rounded-2xl bg-white p-4 shadow-md sm:p-6"
      >
        <h2 className="text-center text-xl font-bold sm:text-2xl">
          Réservation de Vélo
        </h2>

        {/* Nom et prénom */}
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Prénom</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Nom</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
        </div>

        {/* Coordonnées */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Téléphone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Adresse e-mail (facultatif)
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>

        {/* Conditions */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className="mt-1"
            required
          />
          <label className="text-sm leading-tight">
            J'ai lu et j'accepte les{" "}
            <a
              href="/cgv-loc.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              conditions générales de location
            </a>
            .
          </label>
        </div>

        {/* Consentement données */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            name="acceptPrivacy"
            checked={formData.acceptPrivacy}
            onChange={handleChange}
            className="mt-1"
            required
          />
          <label className="text-sm leading-tight">
            J'autorise le magasin à utiliser mes données uniquement pour la
            gestion de la location.
          </label>
        </div>

        {/* Bouton */}
        <Button
          title="Valider les informations"
          type="submit"
          disabled={!formData.acceptPrivacy || !formData.acceptTerms}
        />
      </form>
    </div>
  );
}
