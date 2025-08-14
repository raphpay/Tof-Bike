import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type RentalData from "../../business-logic/models/RentalData";
import SupabaseService from "../../business-logic/services/SupabaseService";
import { db } from "../../config/firebase";
import { generateRentalContractPdf } from "../components/RentalContractPDF";

export default function ContractPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  function rentalConditionToRentalData(
    data: any,
    signatureBase64: string | undefined,
  ): RentalData {
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      bikes: data.bikes.map((bike: any) => ({
        type: bike.type,
        quantity: bike.quantity,
      })),
      accessories: data.accessories.map((accessory: any) => ({
        type: accessory.type,
        quantity: accessory.quantity,
        other: accessory.other,
      })),
      startDateTime: data.startDateTime.toDate(),
      createdAt: data.createdAt.toDate(),
      signature: signatureBase64,
      acceptTerms: data.acceptTerms,
      acceptPrivacy: data.acceptPrivacy,
    };
  }

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      const docRef = doc(db, "rental-conditions", id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return;

      const data = docSnap.data();
      const signedUrl = await SupabaseService.instance.getSignedUrl(
        data.signatureFilename,
      );

      let signatureBase64: string | undefined = undefined;
      if (signedUrl) {
        const res = await fetch(signedUrl);
        const blob = await res.blob();
        signatureBase64 = await blobToBase64(blob);
      }

      const rentalData = rentalConditionToRentalData(data, signatureBase64);

      // Génération du PDF et ouverture dans un nouvel onglet
      const pdfBlob = await generateRentalContractPdf(rentalData);
      const url = URL.createObjectURL(pdfBlob);
      // window.open(url, "_blank");

      const a = document.createElement("a");
      a.href = url;
      a.download = "contrat-location.pdf";
      a.click();

      setLoading(false);
      navigate("/admin");
    }
    fetchData();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  return null; // on n'affiche rien, car le PDF s'ouvre directement
}
