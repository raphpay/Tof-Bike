import PhoneInput from "react-phone-number-input/input";

import SignatureCanvas from "react-signature-canvas";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";

import Button from "../../components/Button";
import LabelInput from "../../components/LabelInput";
import SuccessPage from "../SuccessPage";
import { useBikeRentalForm } from "./useBikeRentalForm";

export default function BikeRentalForm() {
  const {
    sigRef,
    firstName,
    lastName,
    email,
    phone,
    success,
    errors,
    formData,
    isButtonDisabled,
    isSendingInfos,
    showAlert,
    setFirstName,
    setLastName,
    setEmail,
    setPhone,
    handleSubmit,
    addBike,
    updateBike,
    removeBike,
    addAccessory,
    updateAccessory,
    removeAccessory,
    setIsSignatureEmpty,
    handleChange,
    setShowAlert,
  } = useBikeRentalForm();

  const Alert = () => {
    return (
      <AlertDialog open={showAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Vous êtes en train de louer un vélo ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Ce formulaire est destiné aux personnes louant un vélo. Nous
              n'avons pour le moment pas de service de réservation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowAlert(false)}>
              D'accord, continuer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  const Form = () => {
    return (
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-md space-y-6 rounded-2xl bg-white p-4 shadow-md sm:p-6"
      >
        <h2 className="text-center text-xl font-bold sm:text-2xl">
          Mes Informations pour la location
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
                onChange={(e) => updateBike(index, "quantity", e.target.value)}
              >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((q) => (
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
                {Array.from({ length: 20 }, (_, i) => i + 1).map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>

              {/* Type */}
              <select
                className="rounded border p-2"
                value={acc.type}
                onChange={(e) => updateAccessory(index, "type", e.target.value)}
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
            <label className="block text-sm font-medium">Heure de début</label>
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
            En signant ce contrat, je déclare: <br /> - Avoir pris connaissances
            des{" "}
            <a
              href="/cgv-loc.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Conditions générales de Location, de Vente, et de Réparation{" "}
            </a>
            <br />( affichées également dans le local commercial ) <br />
            - Les accepter sans réserve <br />- Être apte à la pratique du vélo
            et ne présenter aucune contre-indication médicale
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
              onEnd={() => {
                if (sigRef.current) {
                  setIsSignatureEmpty(sigRef.current.isEmpty());
                } else {
                  setIsSignatureEmpty(true);
                }
              }}
              onBegin={() => {
                if (sigRef.current) {
                  setIsSignatureEmpty(sigRef.current.isEmpty());
                } else {
                  setIsSignatureEmpty(true);
                }
                console.log("onbegin", sigRef.current?.isEmpty());
              }}
            />
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                className="rounded border px-3 py-1"
                onClick={() => {
                  sigRef.current?.clear();
                  setIsSignatureEmpty(true);
                }}
              >
                Effacer
              </button>
            </div>
          </div>
        </div>

        {errors.email && <p className="text-red-600">{errors.email}</p>}
        {errors.phone && <p className="text-red-600">{errors.phone}</p>}

        {/* Bouton */}
        <Button
          title="Valider les informations"
          type="submit"
          disabled={isButtonDisabled || isSendingInfos}
        />
      </form>
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      {success && <SuccessPage />}
      {showAlert ? <Alert /> : <Form />}
    </div>
  );
}
