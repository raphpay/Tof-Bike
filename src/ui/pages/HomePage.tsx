import Footer from "../../ui/components/Footer";
import NavBar from "../../ui/components/NavBar";
import Section from "../../ui/components/Section";
import ContactSection from "../sections/homeSections/ContactSection";
import HeroSection from "../sections/homeSections/HeroSection";
import RentalSection from "../sections/homeSections/RentalSection";
import ReviewsSection from "../sections/homeSections/ReviewsSection";
import ShopSection from "../sections/homeSections/ShopSection";

export default function HomePage() {
  const sections = [
    { key: "home", label: "Home" },
    { key: "shop", label: "Magasin" },
    { key: "rental", label: "Location" },
    { key: "reviews", label: "Avis" },
    { key: "contact", label: "Contact" },
  ];

  return (
    <div>
      <NavBar />
      <div
        className="h-screen w-full snap-y snap-mandatory overflow-y-scroll scroll-smooth"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {sections.map((section) => (
          <Section key={section.key} id={section.key}>
            {section.key === "home" ? (
              <HeroSection />
            ) : section.key === "shop" ? (
              <ShopSection />
            ) : section.key === "rental" ? (
              <RentalSection />
            ) : section.key === "reviews" ? (
              <ReviewsSection />
            ) : section.key === "contact" ? (
              <ContactSection />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center">
                <h1 className="mb-4 text-4xl font-extrabold text-gray-900 md:text-6xl">
                  {section.label}
                </h1>
                <p className="text-lg text-gray-500">
                  Section de démonstration: {section.label}
                </p>
                <button className="h-25 w-50 text-black"></button>
              </div>
            )}
          </Section>
        ))}
      </div>
      <Footer />
    </div>
  );
}
