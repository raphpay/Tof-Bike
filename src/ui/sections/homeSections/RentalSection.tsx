import { Clock, MapPin, ShieldCheck } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const section =
  "flex flex-col justify-center items-center text-center w-full h-screen bg-background-light px-6 py-12";
const title =
  "text-3xl md:text-5xl font-extrabold mb-4 text-gray-800 leading-tight";
const description = "text-md md:text-lg mb-10 max-w-2xl text-gray-700";
const featuresContainer =
  "grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 w-full max-w-5xl";
const featureCard = "flex flex-col items-center p-6 transition";
const iconStyle = "w-10 h-10 text-primary mb-4";
const featureTitle = "text-lg font-semibold mb-2";
const featureDescription = "text-sm text-gray-600";

const RentalSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className={section}>
      {/* Title */}
      <h2 className={title}>Location de Vélos Simplifiée</h2>

      {/* Description */}
      <p className={description}>
        Louer un vélo n’a jamais été aussi facile. Nos formules s’adaptent à vos
        besoins pour une expérience sans souci, où que vous alliez.
      </p>

      {/* Features */}
      <div className={featuresContainer}>
        <div className={featureCard}>
          <Clock className={iconStyle} />
          <h4 className={featureTitle}>Flexibilité horaire</h4>
          <p className={featureDescription}>
            Louez pour une heure ou une journée entière, selon votre programme.
          </p>
        </div>
        <div className={featureCard}>
          <MapPin className={iconStyle} />
          <h4 className={featureTitle}>Facile à récupérer</h4>
          <p className={featureDescription}>
            Récupérez votre vélo dans notre boutique en plein cœur de Cilaos.
          </p>
        </div>
        <div className={featureCard}>
          <ShieldCheck className={iconStyle} />
          <h4 className={featureTitle}>Réservation en ligne simplifiée</h4>
          <p className={featureDescription}>
            Reservez votre vélo en quelques clics.
          </p>
        </div>
      </div>

      {/* Call-to-action Button */}
      <Button
        title="Réserver maintenant"
        variant="primary"
        onClick={() => {
          navigate("/location");
        }}
      />
    </section>
  );
};

export default RentalSection;
