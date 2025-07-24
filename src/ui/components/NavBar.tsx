import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Logo from "../../assets/Company-Logo.png";
import { useIsLargeScreen } from "../../hooks/useIsLargeScreen";

const navItems = [
  { label: "Home", to: "home" },
  { label: "Magasin", to: "shop" },
  { label: "Location", to: "rental" },
  { label: "Blog", to: "blog" },
  { label: "Contact", to: "contact" },
];

const menuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const NavBar = () => {
  const isLarge = useIsLargeScreen();
  const [open, setOpen] = useState(false);

  const handleNavClick = (to: string) => {
    setOpen(false);
    const el = document.getElementById(to);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-gray-200"
    >
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center ">
        {/* Logo and Brand */}
        <span className="flex items-center gap-2 pr-2">
          <img
            src={Logo}
            alt="Logo"
            className="h-10 md:h-15 pr-2 object-contain"
          />
        </span>
        {isLarge ? (
          <div className="flex gap-6 md:gap-10">
            {navItems.map((item) => (
              <motion.a
                key={item.to}
                href={`#${item.to}`}
                className="text-gray-800 font-semibold text-base md:text-lg px-2 py-1 rounded transition-colors duration-200 hover:text-emerald-500 focus:text-emerald-500 focus:outline-none cursor-pointer dark:hover:text-emerald-100 dark:focus:text-emerald-100"
                whileHover={{ scale: 1.08, color: "#22c55e" }}
                whileTap={{ scale: 0.96 }}
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.to);
                }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        ) : (
          <>
            <button
              className="flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className="block w-7 h-0.5 bg-emerald-800 mb-1.5 rounded transition-all duration-300"
                style={{
                  transform: open ? "rotate(45deg) translateY(7px)" : "none",
                }}
              />
              <span
                className={`block w-7 h-0.5 bg-emerald-800 mb-1.5 rounded transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className="block w-7 h-0.5 bg-emerald-800 rounded transition-all duration-300"
                style={{
                  transform: open ? "rotate(-45deg) translateY(-7px)" : "none",
                }}
              />
            </button>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={menuVariants}
                  className="absolute top-full left-0 w-full bg-white/95 shadow-lg border-b border-emerald-950 flex flex-col items-center py-4 gap-2 z-50"
                >
                  {navItems.map((item) => (
                    <motion.a
                      key={item.to}
                      href={`#${item.to}`}
                      className="text-gray-800 font-semibold text-lg px-4 py-2 rounded transition-colors duration-200 hover:text-emerald-500 focus:text-emerald-500 focus:outline-none cursor-pointer w-full text-center dark:hover:text-emerald-100 dark:focus:text-emerald-100"
                      variants={itemVariants}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.to);
                      }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default NavBar;
