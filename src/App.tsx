import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BikeRentalForm from "./ui/pages/BikeRentalForm";
import HomeRental from "./ui/pages/HomeRental";

const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeRental />} />
      <Route path="/formulaire-location" element={<BikeRentalForm />} />
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
