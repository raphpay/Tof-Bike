import { addDoc, collection } from "firebase/firestore";
import type { E164Number } from "libphonenumber-js";
import React, { useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-number-input/input";
import { db } from "../../config/firebase";
import Button from "../components/Button";
import SuccessPage from "./SuccessPage";

export default function BikeRentalForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    acceptTerms: false,
    acceptPrivacy: false,
    createdAt: new Date(),
  });

  const [success, setSuccess] = useState<boolean>(false);
  const [errors, setErrors] = useState({ email: "", phone: "" });
  const [phone, setPhone] = useState<E164Number | undefined>(undefined);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    let newValue: string | boolean = value;

    if (type === "checkbox" && "checked" in e.target) {
      newValue = (e.target as HTMLInputElement).checked;
    }

    // Formatage du numéro de téléphone
    if (name === "phone") {
      newValue = phone?.toString() ?? "";
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const validateForm = () => {
    const newErrors = { email: "", phone: "" };
    setErrors(newErrors);
    let isValid = true;

    // Email simple regex
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Adresse e-mail invalide.";
      isValid = false;
    }

    // Téléphone : uniquement chiffres et minimum 6 à 15 caractères
    if (!phone || (!isValidPhoneNumber(phone) && !phone.includes("262693"))) {
      newErrors.phone = `Le numéro de téléphone est invalide`;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!formData.acceptTerms || !formData.acceptPrivacy) {
      alert("Vous devez accepter les conditions.");
      return;
    }

    formData.phone = phone?.toString() ?? "";
    formData.createdAt = new Date();

    await addDoc(collection(db, "rental-conditions"), formData);
    setSuccess(true);
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      acceptTerms: false,
      acceptPrivacy: false,
      createdAt: new Date(),
    });
    setPhone(undefined);
    setErrors({ email: "", phone: "" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      {success ? (
        <SuccessPage />
      ) : (
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
          {/* Test */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Numéro de téléphone
            </label>
            <PhoneInput
              value={phone}
              onChange={setPhone}
              placeholder="+262 692 12 34 56"
              className="w-full rounded-md border border-gray-300 p-2"
            />
            {errors.phone && <p className="text-red-600">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Adresse e-mail (facultatif)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="nom@exemple.com"
              className="w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-300"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
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
      )}
    </div>
  );
}
