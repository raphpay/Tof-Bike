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
    bikes: [{ quantity: 1, type: "classique" }], // liste dynamique
    accessories: {
      antivol: false,
      casque: false,
      siegeBebe: false,
      cariole: false,
      autre: false,
      autreDetail: "",
    },
    startDate: new Date().toISOString().slice(0, 16), // format datetime-local
    createdAt: new Date(),
  });

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({ email: "", phone: "" });
  const [phone, setPhone] = useState<E164Number | undefined>(undefined);

  // Gestion champs simples
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    let newValue: string | boolean = value;
    if (type === "checkbox" && "checked" in e.target) {
      newValue = (e.target as HTMLInputElement).checked;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // Gestion accessoires
  const handleAccessoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      accessories: {
        ...prev.accessories,
        [name]: checked,
        ...(name === "autre" && !checked ? { autreDetail: "" } : {}),
      },
    }));
  };

  // Gestion texte "autre"
  const handleAccessoryDetailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      accessories: {
        ...prev.accessories,
        autreDetail: e.target.value,
      },
    }));
  };

  // Gestion vélos
  const handleBikeChange = (
    index: number,
    field: string,
    value: string | number,
  ) => {
    const newBikes = [...formData.bikes];
    newBikes[index] = { ...newBikes[index], [field]: value };
    setFormData((prev) => ({ ...prev, bikes: newBikes }));
  };

  const addBike = () => {
    setFormData((prev) => ({
      ...prev,
      bikes: [...prev.bikes, { quantity: 1, type: "classique" }],
    }));
  };

  const removeBike = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      bikes: prev.bikes.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = { email: "", phone: "" };
    setErrors(newErrors);
    let isValid = true;

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Adresse e-mail invalide.";
      isValid = false;
    }
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

    const finalData = {
      ...formData,
      phone: phone?.toString() ?? "",
      createdAt: new Date(),
    };

    await addDoc(collection(db, "rental-conditions"), finalData);
    setSuccess(true);
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

          {/* Nom */}
          <div>
            <label className="block text-sm font-medium">Prénom</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full rounded-md border p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Nom</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full rounded-md border p-2"
            />
          </div>

          {/* Téléphone */}
          <div>
            <label className="block text-sm font-medium">
              Numéro de téléphone
            </label>
            <PhoneInput
              value={phone}
              onChange={setPhone}
              placeholder="+262 692 12 34 56"
              className="w-full rounded-md border p-2"
            />
            {errors.phone && <p className="text-red-600">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">
              Adresse e-mail (facultatif)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="nom@exemple.com"
              className="w-full rounded-md border p-2"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          {/* Matériel loué */}
          <div className="space-y-4">
            <h3 className="font-semibold">Vélos</h3>
            {formData.bikes.map((bike, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={bike.quantity}
                  onChange={(e) =>
                    handleBikeChange(index, "quantity", Number(e.target.value))
                  }
                  className="w-16 rounded-md border p-2"
                />
                <select
                  value={bike.type}
                  onChange={(e) =>
                    handleBikeChange(index, "type", e.target.value)
                  }
                  className="flex-1 rounded-md border p-2"
                >
                  <option value="classique">Classique</option>
                  <option value="electrique">Électrique</option>
                </select>
                {formData.bikes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeBike(index)}
                    className="text-red-500"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <Button
              title="Ajouter un vélo"
              type="button"
              onClick={addBike}
              variant="secondary"
            />
          </div>

          {/* Accessoires */}
          <div className="space-y-2">
            <h3 className="font-semibold">Accessoires</h3>
            {Object.entries({
              antivol: "Antivol",
              casque: "Casque",
              siegeBebe: "Siège bébé",
              cariole: "Cariole",
              autre: "Autre",
            }).map(([key, label]) => (
              <div key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name={key}
                  checked={(formData.accessories as any)[key]}
                  onChange={handleAccessoryChange}
                />
                <label>{label}</label>
                {key === "autre" && formData.accessories.autre && (
                  <input
                    type="text"
                    value={formData.accessories.autreDetail}
                    onChange={handleAccessoryDetailChange}
                    placeholder="Précisez..."
                    className="flex-1 rounded-md border p-2"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Date/heure début */}
          <div>
            <label className="block text-sm font-medium">
              Date et heure de début
            </label>
            <input
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full rounded-md border p-2"
            />
          </div>

          {/* Conditions */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              required
            />
            <label className="text-sm">
              J'accepte les{" "}
              <a
                href="/cgv-loc.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                conditions générales
              </a>
            </label>
          </div>
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              name="acceptPrivacy"
              checked={formData.acceptPrivacy}
              onChange={handleChange}
              required
            />
            <label className="text-sm">
              J'autorise le traitement de mes données.
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
