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
    <footer className="mt-2 mt-12 w-full border-t border-emerald-800 bg-emerald-950 px-4 text-white dark:border-emerald-950 dark:bg-emerald-800">
      <div className="mx-auto flex max-w-4xl flex-col items-center">
        <div className="mb-4 flex flex-wrap justify-center gap-8">
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="group flex h-12 w-12 items-center justify-center rounded-full bg-emerald-800 shadow-md transition-colors duration-200 hover:bg-emerald-500 dark:bg-emerald-950 dark:hover:bg-emerald-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="text-emerald-100 transition-colors duration-200 group-hover:text-sky-100 dark:text-sky-100 dark:group-hover:text-emerald-100">
                {link.icon}
              </span>
            </motion.a>
          ))}
        </div>
        <div className="mt-2 text-center text-xs text-gray-400">
          © Raphaël Payet 2025. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
