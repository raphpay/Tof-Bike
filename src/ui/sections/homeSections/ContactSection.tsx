import { Clock, MapPin, Phone } from "lucide-react";
import React from "react";
import ContactMap from "../../../assets/map.png";

const section =
  "w-full h-screen flex flex-col md:flex-row bg-background-light text-gray-800";
const mapContainer = "md:w-1/2 h-64 md:h-full bg-cover bg-center";
const infoContainer =
  "flex flex-col justify-center items-start px-8 py-12 md:w-1/2";
const infoItem = "flex items-start gap-4 mb-6";
const iconStyle = "w-6 h-6 text-primary";

const ContactSection: React.FC = () => {
  return (
    <section className={section}>
      {/* Left Side – Map */}
      <div
        className={mapContainer}
        style={{ backgroundImage: `url(${ContactMap})` }}
      ></div>

      {/* Right Side – Contact Info */}
      <div className={infoContainer}>
        <h2 className="mb-8 text-3xl font-extrabold">Pour nous retrouver</h2>

        <div className={infoItem}>
          <MapPin className={iconStyle} />
          <div>
            <h4 className="font-semibold">Adresse</h4>
            <p>68 Rue du Père Boiteau, 97413 Cilaos</p>
          </div>
        </div>

        <div className={infoItem}>
          <Phone className={iconStyle} />
          <div>
            <h4 className="font-semibold">Téléphone</h4>
            <p>+262 692 25 61 61</p>
          </div>
        </div>

        <div className={infoItem}>
          <Clock className={iconStyle} />
          <div>
            <h4 className="font-semibold">Horaires</h4>
            <p>
              Lundi - Samedi : 8h30 - 12h et de 14h - 17h
              <br />
              Dimanche : 8h30 - 12h
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
