import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { RentalContractPdf } from "../components/RentalContractPDF";

export default function ContractPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      const docRef = doc(db, "rental-conditions", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
      }
    }
    fetchData();
  }, [id]);

  if (!data) return <p>Chargement...</p>;

  return <RentalContractPdf data={data} />;
}
