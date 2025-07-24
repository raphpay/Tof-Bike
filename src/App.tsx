import Footer from "./ui/components/Footer";
import NavBar from "./ui/components/NavBar";
import Section from "./ui/components/Section";

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
        className="h-screen w-full overflow-y-scroll scroll-smooth snap-y snap-mandatory"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {sections.map((section) => (
          <Section key={section.key} id={section.key}>
            <div className="flex flex-col items-center justify-center w-full h-full">
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
                {section.label}
              </h1>
              <p className="text-lg text-gray-500">
                Section de démonstration: {section.label}
              </p>
            </div>
          </Section>
        ))}
      </div>
      <Footer />
    </div>
  );
}
