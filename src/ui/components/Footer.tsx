import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

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

const Footer = () => {
  return (
    <footer className="w-full bg-emerald-950 text-white py-8 px-4 mt-12 border-t border-emerald-800 dark:bg-emerald-800 dark:border-emerald-950">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-8 mb-4">
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-800 hover:bg-emerald-500 transition-colors duration-200 shadow-md group dark:bg-emerald-950 dark:hover:bg-emerald-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="text-emerald-100 group-hover:text-sky-100 transition-colors duration-200 dark:text-sky-100 dark:group-hover:text-emerald-100">
                {link.icon}
              </span>
            </motion.a>
          ))}
        </div>
        <div className="text-xs text-gray-400 text-center mt-2">
          © Raphaël Payet 2025. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
