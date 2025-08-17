import { ArrowLeft, Minus, Plus } from "lucide-react";
import PhoneInput from "react-phone-number-input/input";
import { useNavigate } from "react-router-dom";

import { useBikeRentalForm } from "./useBikeRentalForm";

import SuccessPage from "../SuccessPage";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";
import { Button as NeoButton } from "../../../components/ui/button";
import DatePicker from "../../../components/ui/date-picker";
import { Separator } from "../../../components/ui/separator";
import LabelInput from "../../components/LabelInput";
import SignatureField from "../../components/SignatureField";
import TimePicker from "../../components/TimePicker";

import Logo from "../../../assets/tof-bike-logo.png";

export default function BikeRentalForm() {
  const {
    sigRef,
    firstName,
    lastName,
    phone,
    email,
    success,
    errors,
    showAlert,
    formData,
    isButtonDisabled,
    isSendingInfos,
    setFirstName,
    handleSubmit,
    setLastName,
    setPhone,
    setEmail,
    setShowAlert,
    addBike,
    updateBike,
    removeBike,
    addAccessory,
    updateAccessory,
    removeAccessory,
    handleChange,
  } = useBikeRentalForm();

  const navigate = useNavigate();

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

  return (
    <div className="bg-background h-screen items-center justify-center p-4">
      <div className="flex items-center justify-center border-b px-4 py-2 shadow-sm">
        <NeoButton
          variant="neutral"
          size="icon"
          onClick={() => navigate(-1)}
          aria-label="Retour"
          className="absolute left-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </NeoButton>
        <div className="flex-shrink-0">
          <img src={Logo} alt="Logo" className="h-10 object-contain md:h-15" />
        </div>
        <div>{/* espace réservé si besoin (icônes, menu...) */}</div>
      </div>

      {/* Main content */}
      <div>
        {success && <SuccessPage />}
        {showAlert ? (
          <Alert />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-background mx-auto mb-4 border-2 border-black px-2 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <h2
              className="text-left text-xl font-bold sm:text-2xl"
              style={{ fontFamily: "ArchivoBlack" }}
            >
              Enregistrez vous,
            </h2>
            <p style={{ fontFamily: "ArchivoCondensed" }}>
              Partez en toute tranquilité
            </p>

            <Separator className="mt-4" />
            <h2
              className="pt-2 text-left text-xl font-bold sm:text-2xl"
              style={{ fontFamily: "ArchivoBlack" }}
            >
              Vos informations
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
              <label
                className="block text-base font-bold"
                style={{ fontFamily: "ArchivoBlack" }}
              >
                Numéro de téléphone
              </label>
              <PhoneInput
                value={phone}
                onChange={setPhone}
                placeholder="+262 692 12 34 56"
                className="w-full max-w-sm border-[1.5px] border-black bg-white p-2"
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

            <Separator className="mt-4" />
            <h2
              className="pt-2 text-left text-xl font-bold sm:text-2xl"
              style={{ fontFamily: "ArchivoBlack" }}
            >
              Votre location
            </h2>

            {/* Vélos loué */}
            <div className="mt-2 mb-4">
              <h3
                className="mt-2 text-lg font-semibold"
                style={{ fontFamily: "ArchivoCondensed" }}
              >
                Vélos
              </h3>

              {formData.bikes.map((bike, index) => (
                <div
                  key={index}
                  className="flex flex-row gap-2 border p-3 sm:items-center"
                >
                  {/* Quantité */}
                  <select
                    className="border p-2"
                    value={bike.quantity}
                    onChange={(e) =>
                      updateBike(index, "quantity", e.target.value)
                    }
                    style={{ fontFamily: "ArchivoBlack" }}
                  >
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>

                  {/* Type */}
                  <select
                    className="w-full max-w-sm border p-2"
                    value={bike.type}
                    onChange={(e) => updateBike(index, "type", e.target.value)}
                    style={{ fontFamily: "ArchivoBlack" }}
                  >
                    <option value="electric">Électrique</option>
                    <option value="classic">Classique</option>
                  </select>

                  {formData.bikes.length < 2 && (
                    <NeoButton size="icon" type="button" onClick={addBike}>
                      <Plus />
                    </NeoButton>
                  )}

                  {/* Supprimer */}
                  {formData.bikes.length > 1 && (
                    <NeoButton
                      size="icon"
                      type="button"
                      onClick={() => removeBike(index)}
                    >
                      <Minus />
                    </NeoButton>
                  )}
                </div>
              ))}
            </div>

            {/* Accessoires */}
            <div className="mt-2 mb-4">
              <h3
                className="mt-2 text-lg font-semibold"
                style={{ fontFamily: "ArchivoCondensed" }}
              >
                Accessoires
              </h3>

              {formData.accessories.map((acc, index) => (
                <div
                  key={index}
                  className="flex flex-row gap-2 border p-3 sm:items-center"
                >
                  {/* Quantité */}
                  <select
                    className="border p-2"
                    value={acc.quantity}
                    onChange={(e) =>
                      updateAccessory(index, "quantity", e.target.value)
                    }
                    style={{ fontFamily: "ArchivoBlack" }}
                  >
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>

                  {/* Type */}
                  <select
                    className="w-full max-w-sm border p-2"
                    value={acc.type}
                    onChange={(e) =>
                      updateAccessory(index, "type", e.target.value)
                    }
                    style={{ fontFamily: "ArchivoBlack" }}
                  >
                    <option value="antitheft-device">Antivol</option>
                    <option value="helmet">Casque</option>
                    <option value="baby-seat">Siège bébé</option>
                    <option value="sledge">Cariole</option>
                    <option value="other">Autre</option>
                  </select>

                  <NeoButton
                    size="icon"
                    type="button"
                    onClick={() => removeAccessory(index)}
                  >
                    <Minus />
                  </NeoButton>
                </div>
              ))}

              {/* Ajouter un accessoire */}
              <NeoButton type="button" className="mt-2" onClick={addAccessory}>
                Ajouter un accessoire
              </NeoButton>
            </div>

            {/* Date/heure début */}
            <div className="space-y-2">
              <div className="space-y-2">
                <label
                  className="block text-base font-bold"
                  style={{ fontFamily: "ArchivoCondensed" }}
                >
                  Date de début
                </label>

                <DatePicker
                  value={
                    formData.startDate
                      ? new Date(formData.startDate)
                      : undefined
                  }
                  onChange={(date) => handleChange(date, "startDate")}
                />
              </div>

              <div className="space-y-2">
                <label
                  className="block text-base font-bold"
                  style={{ fontFamily: "ArchivoCondensed" }}
                >
                  Heure de début
                </label>
                <TimePicker
                  value={formData.startTime}
                  onChange={handleChange}
                />
              </div>
            </div>

            <Separator className="my-4" />

            {/* Conditions */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
              />
              <label
                className="text-sm"
                style={{ fontFamily: "ArchivoCondensed" }}
              >
                En signant ce contrat, je déclare: <br /> - Avoir pris
                connaissances des{" "}
                <a
                  href="/cgv-loc.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary underline"
                >
                  Conditions générales de Location, de Vente, et de
                  Réparation{" "}
                </a>
                <br />( affichées également dans le local commercial ) <br />
                - Les accepter sans réserve <br />- Être apte à la pratique du
                vélo et ne présenter aucune contre-indication médicale
              </label>
            </div>
            <div className="flex items-start gap-2 py-2">
              <input
                type="checkbox"
                name="acceptPrivacy"
                checked={formData.acceptPrivacy}
                onChange={handleChange}
                required
              />
              <label
                className="text-sm"
                style={{ fontFamily: "ArchivoCondensed" }}
              >
                J'autorise le traitement de mes données dans le cadre de la
                location.
              </label>
            </div>

            {/* Signature */}
            <div>
              <label
                className="mb-1 block text-sm font-medium"
                style={{ fontFamily: "ArchivoCondensed" }}
              >
                Signature
              </label>
              <div className="bg-background border-[1.5px] border-black p-2">
                <SignatureField sigRef={sigRef} />
                <div className="mt-2 flex gap-2">
                  <NeoButton
                    type="button"
                    onClick={() => {
                      sigRef.current?.clear();
                    }}
                  >
                    Effacer
                  </NeoButton>
                </div>
              </div>
            </div>

            {errors.email && <p className="text-red-600">{errors.email}</p>}
            {errors.phone && <p className="text-red-600">{errors.phone}</p>}

            {/* Bouton */}
            <NeoButton
              className="mt-4"
              type="submit"
              disabled={isButtonDisabled || isSendingInfos}
            >
              Valider les informations
            </NeoButton>
          </form>
        )}
      </div>
    </div>
  );
}
