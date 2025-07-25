import { Bike, ShoppingCart } from "lucide-react";
import React from "react";
import ShopImage from "../../../assets/shop.jpg";
import Button from "../../components/Button";

const section =
  "flex flex-col md:flex-row w-full h-screen bg-background-dark text-gray-800";
const left =
  "flex flex-col justify-center items-center text-left px-6 py-12 md:w-1/2";
const right = "md:w-1/2 h-full bg-cover bg-center";
const title =
  "text-3xl md:text-5xl font-extrabold mb-6 text-white leading-tight";
const description = "text-md md:text-lg mb-10 max-w-xl text-white";
const features = "grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl w-full";
const featureBox = "flex flex-col items-center text-center px-4 py-6 ";
const iconStyle = "w-10 h-10 text-primary mb-4";

const ShopSection: React.FC = () => {
  return (
    <section className={section}>
      {/* Left Column */}
      <div className={left}>
        <h2 className={title}>Notre boutique</h2>
        <p className={description}>
          Découvrez notre sélection de vélos, d'équipements et de pièces de
          qualité à la vente, pour tous les âges et tous les niveaux.
        </p>

        <div className={features}>
          <div className={featureBox}>
            <ShoppingCart className={iconStyle} />
            <h4 className="mb-2 text-lg font-semibold text-white">
              La qualité avant tout
            </h4>
            <p className="text-sm text-white">
              Nous offrons une large selection de vélos et équipements pour tous
              les goûts.
            </p>
          </div>
          <div className={featureBox}>
            <Bike className={iconStyle} />
            <h4 className="mb-2 text-lg font-semibold text-white">
              Staff expert
            </h4>
            <p className="text-sm text-white">
              Notre équipe d'experts est là pour vous accompagner à trouver la
              monture parfaite.
            </p>
          </div>
        </div>
        <Button
          title="Voir le magasin"
          variant="primary"
          onClick={() => console.log("Réservation")}
        />
      </div>

      {/* Right Column (Image) */}
      <div
        className={right}
        style={{ backgroundImage: `url(${ShopImage})` }}
      ></div>
    </section>
  );
};

export default ShopSection;
