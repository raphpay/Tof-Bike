import "react-phone-number-input/style.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./ui/pages/HomePage";
import RentalBikeSizes from "./ui/pages/RentalBikeSizes";
import RentalConditionsPage from "./ui/pages/RentalConditionsPage";
import RentalPage from "./ui/pages/RentalPage";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
}
