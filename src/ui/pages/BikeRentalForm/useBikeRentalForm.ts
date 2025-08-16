import { Timestamp } from "firebase/firestore";
import type { E164Number } from "libphonenumber-js";
import { useEffect, useRef, useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import type SignatureCanvas from "react-signature-canvas";
import type RentalCondition from "../../../business-logic/models/RentalCondition";
import { RentalConditionsService } from "../../../business-logic/services/RentalConditionsService";
import { SupabaseService } from "../../../business-logic/services/SupabaseService";

export function useBikeRentalForm() {
  const sigRef = useRef<SignatureCanvas>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<E164Number | undefined>(undefined);
  const [isSignatureEmpty, setIsSignatureEmpty] = useState<boolean>(true);
  const [isSendingInfos, setIsSendingInfos] = useState<boolean>(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({ email: "", phone: "" });
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    acceptTerms: false,
    acceptPrivacy: false,
    bikes: [{ quantity: 1, type: "electric" }],
    accessories: [{ quantity: 1, type: "helmet", other: "" }],
    startDate: new Date().toISOString().split("T")[0], // "YYYY-MM-DD"
    startTime: new Date().toTimeString().slice(0, 5), // "HH:MM"
    createdAt: new Date(),
  });

  const isButtonDisabled =
    !formData.acceptPrivacy ||
    !formData.acceptTerms ||
    !sigRef.current ||
    isSignatureEmpty ||
    !firstName ||
    !lastName ||
    !phone;

  // Local methods
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

  // Server-side methods
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingInfos(true);
    if (!validateForm()) {
      setIsSendingInfos(false);
      return;
    }

    // Fusionner date et heure en un seul objet Date
    const startDateTime = new Date(
      `${formData.startDate}T${formData.startTime}`,
    );

    if (!sigRef.current || sigRef.current.isEmpty()) {
      setIsSendingInfos(false);
      alert("Veuillez apposer votre signature.");
      return;
    }

    // Sauvegarde signature
    const sigDataUrl = sigRef.current.toDataURL("image/png");
    const signatureFilename = await uploadSignature(sigDataUrl);

    const conditions: RentalCondition = {
      ...formData,
      firstName,
      lastName,
      email,
      phone: phone ?? "",
      signatureFilename: signatureFilename,
      startDateTime: new Timestamp(startDateTime.getSeconds(), 0),
      createdAt: new Timestamp(new Date().getSeconds(), 0),
    };

    const service = new RentalConditionsService();

    try {
      await service.addRentalCondition(conditions);
    } catch (error) {
      throw new Error("Erreur lors de la sauvegarde des informations");
    }

    setSuccess(true);
    setPhone(undefined);
    sigRef.current.clear();
    setErrors({ email: "", phone: "" });
    setIsSendingInfos(false);
  };

  async function uploadSignature(dataUrl: string) {
    // 1. Convert DataURL -> Blob
    const res = await fetch(dataUrl);
    const blob = await res.blob();

    // 2. Unique name to avoid collisions
    const fileName = `signatures/${Date.now()}.png`;

    // 3. Upload to the "signatures" bucket
    const service = new SupabaseService();
    try {
      await service.uploadImage(fileName, blob);
    } catch (error) {
      throw error;
    }

    return fileName;
  }

  useEffect(() => {
    setShowAlert(true);
  }, []);

  return {
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
  };
}
