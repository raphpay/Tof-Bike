import { UserStar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/tof-bike-logo.png";

const RentalNavBar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-primary fixed top-0 left-0 z-50 w-full border-b border-gray-200 shadow-md backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-row items-center justify-between px-4 py-2">
        {/* LEFT SIDE */}
        <div className="flex-shrink-0">
          <img src={Logo} alt="Logo" className="h-10 object-contain md:h-15" />
        </div>

        {/* RIGHT SIDE */}
        <button
          onClick={handleLoginClick}
          className="px-4 py-3 text-center text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none"
        >
          <UserStar color="black" />
        </button>
      </div>
    </nav>
  );
};

export default RentalNavBar;
