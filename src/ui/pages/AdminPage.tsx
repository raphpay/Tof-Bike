import { collection, getDocs, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase"; // adapte ton chemin Firebase

type RentalCondition = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  bikes: { quantity: number; type: string }[];
  accessories: { quantity: number; type: string; other?: string }[];
  startDateTime: Timestamp;
  createdAt: Timestamp;
};

export default function AdminPage() {
  const navigate = useNavigate();

  const [data, setData] = useState<RentalCondition[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [filterDate, setFilterDate] = useState<string>(""); // date ISO yyyy-mm-dd

  // Chargement des données Firestore
  const fetchData = async () => {
    setLoading(true);
    try {
      const colRef = collection(db, "rental-conditions");
      const snapshot = await getDocs(colRef);
      const docsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<RentalCondition, "id">),
      }));
      setData(docsData);
    } catch (error) {
      console.error("Erreur chargement données:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtrage local par nom + date
  const filteredData = data.filter((item) => {
    const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
    const matchesName = fullName.includes(searchName.toLowerCase());

    let matchesDate = true;
    if (filterDate) {
      const filterTimestampStart = new Date(filterDate);
      filterTimestampStart.setHours(0, 0, 0, 0);
      const filterTimestampEnd = new Date(filterDate);
      filterTimestampEnd.setHours(23, 59, 59, 999);

      const startDateTime = item.startDateTime.toDate();

      matchesDate =
        startDateTime >= filterTimestampStart &&
        startDateTime <= filterTimestampEnd;
    }

    return matchesName && matchesDate;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="mb-6 text-center text-3xl font-bold">Admin - Locations</h1>

      {/* Recherche */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
        <input
          type="text"
          placeholder="Rechercher par nom"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-full max-w-xs rounded border border-gray-300 p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="w-full max-w-xs rounded border border-gray-300 p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        <button
          onClick={() => {
            setSearchName("");
            setFilterDate("");
          }}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Réinitialiser
        </button>
      </div>

      {/* Tableau */}
      {loading ? (
        <p className="text-center">Chargement...</p>
      ) : (
        <div className="overflow-auto rounded border border-gray-300 bg-white shadow">
          <table className="min-w-full table-auto border-collapse text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">Nom</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Téléphone</th>
                <th className="border px-4 py-2">Vélos</th>
                <th className="border px-4 py-2">Accessoires</th>
                <th className="border px-4 py-2">Début location</th>
                <th className="border px-4 py-2">Créé le</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="border px-4 py-2 text-center">
                    Aucun résultat
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.id} className="even:bg-gray-50">
                    <td className="border px-4 py-2">
                      {item.firstName} {item.lastName}
                    </td>
                    <td className="border px-4 py-2">{item.email || "-"}</td>
                    <td className="border px-4 py-2">{item.phone}</td>
                    <td className="border px-4 py-2">
                      {item.bikes
                        .map((b) => `${b.quantity} × ${b.type}`)
                        .join(", ")}
                    </td>
                    <td className="border px-4 py-2">
                      {item.accessories
                        .map(
                          (a) =>
                            `${a.quantity} × ${
                              a.type === "other" && a.other ? a.other : a.type
                            }`,
                        )
                        .join(", ")}
                    </td>
                    <td className="border px-4 py-2">
                      {item.startDateTime.toDate().toLocaleString()}
                    </td>
                    <td className="border px-4 py-2">
                      {item.createdAt.toDate().toLocaleString()}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => {
                          // Redirige vers la page d’export
                          navigate(`/admin/contract/${item.id}`);
                        }}
                      >
                        Exporter en PDF
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
