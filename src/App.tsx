import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./ui/pages/HomePage";

const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
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
