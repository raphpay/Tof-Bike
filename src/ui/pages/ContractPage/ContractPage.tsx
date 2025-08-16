import { useContractPage } from "./useContractPage";

export default function ContractPage() {
  const { loading } = useContractPage();

  if (loading) return <p>Chargement...</p>;
  return null; // on n'affiche rien, car le PDF s'ouvre directement
}
