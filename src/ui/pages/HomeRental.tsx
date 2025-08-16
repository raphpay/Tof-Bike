import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import RentalNavBar from "../components/RentalNavBar";

export default function HomeRental() {
  const navigate = useNavigate();
  return (
    <div>
      <RentalNavBar />
      <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-2">
        <Button
          title="Je m'enregistre pour la location"
          onClick={() => navigate("formulaire-location")}
        />
        <Button
          title="Laisser un avis"
          variant="secondary"
          href="http://bit.ly/3UhVsql"
        />
      </div>
    </div>
  );
}
