import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SupabaseService from "../../business-logic/services/SupabaseService";
import { db } from "../../config/firebase";
import { RentalContractPdf } from "../components/RentalContractPDF";

export default function ContractPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);

  function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      const docRef = doc(db, "rental-conditions", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();

        const signedUrl = await SupabaseService.instance.getSignedUrl(
          data.signatureFilename,
        );

        let signatureBase64 = null;
        if (signedUrl) {
          // On télécharge l'image et on la convertit en base64
          const res = await fetch(signedUrl);
          const blob = await res.blob();
          signatureBase64 = await blobToBase64(blob);
        }

        setData({
          ...data,
          signature: signatureBase64,
        });
      }
    }
    fetchData();
  }, [id]);

  if (!data) return <p>Chargement...</p>;

  return <RentalContractPdf data={data} />;
}
