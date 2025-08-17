import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "../../components/ui/button";

export default function RentalFooter() {
  const socialLinks = [
    {
      href: "https://github.com/raphpay",
      label: "GitHub",
      icon: <Github size={28} />,
    },
    {
      href: "https://www.linkedin.com/in/raphael-payet/",
      label: "LinkedIn",
      icon: <Linkedin size={28} />,
    },
    {
      href: "mailto:raphael.payet@etik.com",
      label: "Email",
      icon: <Mail size={28} />,
    },
  ];

  return (
    <footer className="bg-main w-full text-white">
      <div className="mx-auto flex max-w-4xl flex-col items-center">
        <div className="mb-4 flex flex-wrap justify-center gap-8">
          {socialLinks.map((link) => (
            <Button key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            </Button>
          ))}
        </div>
        <div
          className="mt-2 text-center text-xs text-gray-400"
          style={{ fontFamily: "ArchivoCondensed" }}
        >
          © Raphaël Payet 2025. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
