import { useNavigate } from "react-router-dom";
import Logo from "../../assets/tof-bike-logo.png";
import Button from "../components/Button";

export default function HomeRental() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-2">
      <img src={Logo} alt="Logo" className="h-15 object-contain pr-2 md:h-25" />
      <Button
        title="Je réserve un vélo"
        onClick={() => navigate("formulaire-location")}
      />
      <Button
        title="Laisser un avis"
        variant="secondary"
        href="http://bit.ly/3UhVsql"
      />
    </div>
  );
}
