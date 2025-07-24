import React from "react";
import Hero from "../../assets/hero.jpg";
import Button from "../components/Button"; // adjust path as needed

const section = "relative flex flex-col h-full w-full bg-cover bg-center";
const container = "relative z-10 flex flex-col justify-center h-screen mx-10";
const overlay = "absolute inset-0 bg-black/60";
const headline =
  "mb-4 text-3xl leading-tight font-extrabold text-gray-200 md:text-5xl";
const description = "text-md md:text-lg text-white mb-6";
const buttonGroup = "flex flex-col sm:flex-row gap-4";

const HeroSection: React.FC = () => {
  return (
    <section className={section} style={{ backgroundImage: `url(${Hero})` }}>
      <div className={overlay}></div>

      <div className={container}>
        <h1 className={headline}>Explorez Cilaos à vélo !</h1>
        <p className={description}>
          Découvrez les paysages grandioses du cirque de Cilaos en toute
          liberté. Que vous soyez amateur de balades tranquilles ou passionné de
          VTT, notre magasin vous propose une sélection de vélos à la vente et à
          la location, adaptés à tous les niveaux.
        </p>

        <div className={buttonGroup}>
          <Button
            title="Réserver maintenant"
            variant="primary"
            onClick={() => console.log("Réservation")}
          />
          <Button
            title="En savoir plus"
            variant="secondary"
            onClick={() => console.log("Plus d'infos")}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
