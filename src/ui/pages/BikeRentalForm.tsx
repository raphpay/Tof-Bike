import { addDoc, collection } from "firebase/firestore";
import type { E164Number } from "libphonenumber-js";
import React, { useRef, useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-number-input/input";
import SignatureCanvas from "react-signature-canvas";
import { db } from "../../config/firebase";
import { supabase } from "../../config/supabase";
import Button from "../components/Button";
import LabelInput from "../components/LabelInput";
import SuccessPage from "./SuccessPage";

export default function BikeRentalForm() {
  const sigRef = useRef<SignatureCanvas>(null);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<E164Number | undefined>(undefined);

  const [formData, setFormData] = useState({
    acceptTerms: false,
    acceptPrivacy: false,
    bikes: [{ quantity: 1, type: "electric" }],
    accessories: [{ quantity: 1, type: "helmet", other: "" }],
    startDate: new Date().toISOString().split("T")[0], // "YYYY-MM-DD"
    startTime: new Date().toTimeString().slice(0, 5), // "HH:MM"
    createdAt: new Date(),
  });

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({ email: "", phone: "" });

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

  // Gestion vélos
  const addBike = () => {
    setFormData((prev) => {
      const hasElectric = prev.bikes.some((b) => b.type === "electric");
      const hasClassic = prev.bikes.some((b) => b.type === "classic");

      let newType: "electric" | "classic" = "electric";

      if (hasElectric && !hasClassic) {
        newType = "classic";
      } else if (!hasElectric && hasClassic) {
        newType = "electric";
      }

      return {
        ...prev,
        bikes: [...prev.bikes, { quantity: 1, type: newType }],
      };
    });
  };

  const updateBike = (
    index: number,
    field: "quantity" | "type",
    value: string,
  ) => {
    setFormData((prev) => {
      const bikesCopy = [...prev.bikes];
      bikesCopy[index] = { ...bikesCopy[index], [field]: value };
      return { ...prev, bikes: bikesCopy };
    });
  };

  const removeBike = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      bikes: prev.bikes.filter((_, i) => i !== index),
    }));
  };

  // Gestion des accessoires
  const addAccessory = () => {
    setFormData((prev) => ({
      ...prev,
      accessories: [
        ...prev.accessories,
        { quantity: 1, type: "casque", other: "" },
      ],
    }));
  };

  const updateAccessory = (
    index: number,
    field: keyof (typeof formData.accessories)[0],
    value: string,
  ) => {
    setFormData((prev) => {
      const updated = [...prev.accessories];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, accessories: updated };
    });
  };

  const removeAccessory = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      accessories: prev.accessories.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = { email: "", phone: "" };
    setErrors(newErrors);
    let isValid = true;

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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

    // Fusionner date et heure en un seul objet Date
    const startDateTime = new Date(
      `${formData.startDate}T${formData.startTime}`,
    );

    if (!sigRef.current || sigRef.current.isEmpty()) {
      alert("Veuillez apposer votre signature.");
      return;
    }

    // Sauvegarde signature
    const sigDataUrl = sigRef.current.toDataURL("image/png");
    const signatureFilename = await uploadSignature(sigDataUrl);

    await addDoc(collection(db, "rental-conditions"), {
      ...formData,
      firstName,
      lastName,
      email,
      phone,
      signatureFilename: signatureFilename,
      startDateTime,
      createdAt: new Date(),
    });

    setSuccess(true);
    setPhone(undefined);
    sigRef.current.clear();
    setErrors({ email: "", phone: "" });
  };

  async function uploadSignature(dataUrl: string) {
    // 1. Convert DataURL -> Blob
    const res = await fetch(dataUrl);
    const blob = await res.blob();

    // 2. Unique name to avoid collisions
    const fileName = `signatures/${Date.now()}.png`;

    // 3. Upload to the "signatures" bucket
    const storageBucket = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET;
    const { error } = await supabase.storage
      .from(storageBucket) // buket name in Supabase
      .upload(fileName, blob, {
        contentType: "image/png",
        upsert: false, // false to avoid overwriting existing files
      });

    if (error) {
      console.error("Erreur upload Supabase :", error);
      throw error;
    }

    return fileName;
  }

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
          <LabelInput
            label="Prénom"
            value={firstName}
            name="firstname"
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Christophe"
          />
          <LabelInput
            label="Nom"
            value={lastName}
            name="lastname"
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Payet"
          />

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
          <LabelInput
            label="Adresse e-mail (facultatif)"
            value={email}
            name="email"
            type="email"
            required={false}
            placeholder="nom@exemple.com"
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          {/* Vélos loué */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Vélos</h3>

            {formData.bikes.map((bike, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center"
              >
                {/* Quantité */}
                <select
                  className="rounded border p-2"
                  value={bike.quantity}
                  onChange={(e) =>
                    updateBike(index, "quantity", e.target.value)
                  }
                >
                  {[1, 2, 3, 4].map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>

                {/* Type */}
                <select
                  className="rounded border p-2"
                  value={bike.type}
                  onChange={(e) => updateBike(index, "type", e.target.value)}
                >
                  <option value="electric">Électrique</option>
                  <option value="classic">Classique</option>
                </select>

                {/* Supprimer */}
                {formData.bikes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeBike(index)}
                    className="text-red-500 underline"
                  >
                    Supprimer
                  </button>
                )}
              </div>
            ))}

            {/* Ajouter un vélo */}
            {formData.bikes.length < 2 && (
              <button
                type="button"
                onClick={addBike}
                className="bg-primary rounded px-4 py-2 text-white"
              >
                Ajouter un type de vélo
              </button>
            )}
          </div>

          {/* Accessoires */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Accessoires</h3>

            {formData.accessories.map((acc, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center"
              >
                {/* Quantité */}
                <select
                  className="rounded border p-2"
                  value={acc.quantity}
                  onChange={(e) =>
                    updateAccessory(index, "quantity", e.target.value)
                  }
                >
                  {[1, 2, 3, 4, 5].map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>

                {/* Type */}
                <select
                  className="rounded border p-2"
                  value={acc.type}
                  onChange={(e) =>
                    updateAccessory(index, "type", e.target.value)
                  }
                >
                  <option value="antitheft-device">Antivol</option>
                  <option value="helmet">Casque</option>
                  <option value="baby-seat">Siège bébé</option>
                  <option value="sledge">Cariole</option>
                  <option value="other">Autre</option>
                </select>

                {/* Champ "autre" si sélectionné */}
                {acc.type === "other" && (
                  <input
                    type="text"
                    placeholder="Précisez"
                    value={acc.other}
                    onChange={(e) =>
                      updateAccessory(index, "other", e.target.value)
                    }
                    className="flex-1 rounded border p-2"
                  />
                )}

                {/* Supprimer */}
                <button
                  type="button"
                  onClick={() => removeAccessory(index)}
                  className="text-red-500 underline"
                >
                  Supprimer
                </button>
              </div>
            ))}

            {/* Ajouter un accessoire */}
            <button
              type="button"
              onClick={addAccessory}
              className="bg-primary rounded px-4 py-2 text-white"
            >
              Ajouter un accessoire
            </button>
          </div>

          {/* Date/heure début */}
          <div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Date de début</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full rounded border p-2"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Heure de début
              </label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full rounded border p-2"
                required
              />
            </div>
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
              En signant ce contrat, je déclare: <br /> - Avoir pris
              connaissances des{" "}
              <a
                href="/cgv-loc.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Conditions générales de Location, de Vente, et de
                Réparation{" "}
              </a>
              <br />( affichées également dans le local commercial ) <br />
              - Les accepter sans réserve <br />- Être apte à la pratique du
              vélo et ne présenter aucune contre-indication médicale
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
              J'autorise le traitement de mes données dans le cadre de la
              location.
            </label>
          </div>

          {/* Signature */}
          <div>
            <label className="mb-1 block text-sm font-medium">Signature</label>
            <div className="rounded border bg-gray-50 p-2">
              <SignatureCanvas
                ref={sigRef}
                penColor="black"
                backgroundColor="white"
                canvasProps={{ width: 300, height: 120, className: "bg-white" }}
              />
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  className="rounded border px-3 py-1"
                  onClick={() => sigRef.current?.clear()}
                >
                  Effacer
                </button>
              </div>
            </div>
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
