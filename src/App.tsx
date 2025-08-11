import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminPage from "./ui/pages/AdminPage";
import BikeRentalForm from "./ui/pages/BikeRentalForm";
import HomeRental from "./ui/pages/HomeRental";
import LoginPage from "./ui/pages/LoginPage";

const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeRental />} />
      <Route path="/formulaire-location" element={<BikeRentalForm />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
