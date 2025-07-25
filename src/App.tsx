import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./ui/pages/HomePage";
import RentalConditionsPage from "./ui/pages/RentalConditionsPage";
import RentalPage from "./ui/pages/RentalPage";

const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* Rental */}
      <Route path="/location" element={<RentalPage />} />
      <Route path="/location-conditions" element={<RentalConditionsPage />} />
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
