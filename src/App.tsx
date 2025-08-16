import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./ui/context/AuthContext";
import { ProtectedRoute } from "./ui/context/ProtectedRoute";
import AdminPage from "./ui/pages/AdminPage/AdminPage";
import BikeRentalForm from "./ui/pages/BikeRentalForm/BikeRentalForm";
import ContractPage from "./ui/pages/ContractPage/ContractPage";
import HomeRental from "./ui/pages/HomeRental";
import LoginPage from "./ui/pages/LoginPage/LoginPage";

const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeRental />} />
      <Route path="/formulaire-location" element={<BikeRentalForm />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/contract/:id"
        element={
          <ProtectedRoute>
            <ContractPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
