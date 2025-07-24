import Footer from "./ui/components/Footer";
import NavBar from "./ui/components/NavBar";
import Section from "./ui/components/Section";
import HeroSection from "./ui/section/HeroSection";
import RentalSection from "./ui/section/RentalSection";
import ShopSection from "./ui/section/ShopSection";

export default function App() {
  const sections = [
    { key: "home", label: "Home" },
    { key: "shop", label: "Magasin" },
    { key: "rental", label: "Location" },
    { key: "blog", label: "Blog" },
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
