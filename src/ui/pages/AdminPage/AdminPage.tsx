import { FileDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAdminPage } from "./useAdminPage";

import { Button as NeoButton } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import RentalNavBar from "../../components/RentalNavBar";

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
  } = useAdminPage();

  return (
    <div>
      <RentalNavBar showTitle={true} />
      <div className="bg-background mt-4 min-h-screen p-4">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Admin - Locations
        </h1>

        {/* Filtres */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
          <Input
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Rechercher par nom"
            className="w-full max-w-xs border border-gray-300 p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <Input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            placeholder="Rechercher par date"
            className="w-full max-w-xs border border-gray-300 p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <NeoButton
            onClick={() => {
              setSearchName("");
              setFilterDate("");
            }}
          >
            Réinitialiser
          </NeoButton>
        </div>

        {/* Tableau */}
        {loading ? (
          <p className="text-center">Chargement...</p>
        ) : (
          <div className="bg-background overflow-auto rounded border border-gray-300 shadow">
            <table className="min-w-full table-auto border-collapse text-left">
              <thead className="bg-main">
                <tr>
                  <th className="py- border px-4 text-center">Nom</th>
                  <th className="border px-4 py-2 text-center">Email</th>
                  <th className="border px-4 py-2 text-center">Téléphone</th>
                  <th className="border px-4 py-2 text-center">Vélos</th>
                  <th className="border px-4 py-2 text-center">Accessoires</th>
                  <th className="border px-4 py-2 text-center">
                    Début location
                  </th>
                  <th className="border px-4 py-2 text-center">Créé le</th>
                  <th className="border px-4 py-2 text-center">Actions</th>
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
                        <NeoButton
                          onClick={() => navigate(`/admin/contract/${item.id}`)}
                        >
                          <FileDown />
                        </NeoButton>
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
