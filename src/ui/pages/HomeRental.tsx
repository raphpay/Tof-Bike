import { useNavigate } from "react-router-dom";
import GoogleLogo from "../../../public/icons8-google.svg";
import { Button as NeoButton } from "../../components/ui/button";
import RentalFooter from "../components/RentalFooter";
import RentalNavBar from "../components/RentalNavBar";
import TypewriterTitle from "../components/TypewriterTitle";

export default function HomeRental() {
  const navigate = useNavigate();

  function navigateToGoogle() {}

  return (
    <div className="flex min-h-screen flex-col">
      <RentalNavBar />
      <main className="flex flex-1 flex-col items-center justify-center gap-2">
        <TypewriterTitle />

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
      </main>
      <RentalFooter />
    </div>
  );
}
