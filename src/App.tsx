import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./ui/pages/HomePage";
import RentalBikeSizes from "./ui/pages/RentalBikeSizes";
import RentalConditionsPage from "./ui/pages/RentalConditionsPage";
import RentalPage from "./ui/pages/RentalPage";

const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* Rental */}
      <Route path="/location" element={<RentalPage />} />
      <Route path="/location-conditions" element={<RentalConditionsPage />} />
      <Route path="/location-bike-sizes" element={<RentalBikeSizes />} />
    </Routes>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
