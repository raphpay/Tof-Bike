import { useNavigate } from "react-router-dom";
import { useRentalConditions } from "../../business-logic/hooks/useRentalConditions";
import Button from "../components/Button";
import RentalNavBar from "../components/RentalNavBar";

export default function AdminPage() {
  const navigate = useNavigate();

  const {
    loading,
    filteredData,
    searchName,
    filterDate,
    setSearchName,
    setFilterDate,
    formatBikeType,
    formatAccessoryType,
  } = useRentalConditions();

  return (
    <div>
      <RentalNavBar showTitle={true} />
      <div className="mt-4 min-h-screen bg-gray-100 p-4">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Admin - Locations
        </h1>

        {/* Filtres */}
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

          <Button
            title="Réinitialiser"
            onClick={() => {
              setSearchName("");
              setFilterDate("");
            }}
          />
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
                    <td colSpan={8} className="border px-4 py-2 text-center">
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
                          .map((b) => `${b.quantity} x ${formatBikeType(b)}`)
                          .join(", ")}
                      </td>
                      <td className="border px-4 py-2">
                        {item.accessories
                          .map((a) =>
                            a.other
                              ? `${a.other}`
                              : `${a.quantity} x ${formatAccessoryType(a)}`,
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
                          onClick={() => navigate(`/admin/contract/${item.id}`)}
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
    </div>
  );
}
