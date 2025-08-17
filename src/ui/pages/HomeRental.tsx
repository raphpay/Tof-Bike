import { useNavigate } from "react-router-dom";
import GoogleLogo from "../../../public/icons8-google.svg";
import { Button as NeoButton } from "../../components/ui/button";
import RentalNavBar from "../components/RentalNavBar";

export default function HomeRental() {
  const navigate = useNavigate();

  function navigateToGoogle() {}

  return (
    <div>
      <RentalNavBar />
      <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-2">
        <NeoButton onClick={() => navigate("formulaire-location")}>
          Je m'enregistre
        </NeoButton>
        <NeoButton variant="neutral" onClick={navigateToGoogle}>
          <a
            href="http://bit.ly/3UhVsql"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row items-center gap-2"
          >
            <img src={GoogleLogo} width={20} height={20} />
            Laisser un avis
          </a>
        </NeoButton>
      </div>
    </div>
  );
}
