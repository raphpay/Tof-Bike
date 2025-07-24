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
      className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white/80 shadow-md backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center px-4 py-2">
        {/* Logo and Brand */}
        <span className="flex items-center gap-2 pr-2">
          <img
            src={Logo}
            alt="Logo"
            className="h-10 object-contain pr-2 md:h-15"
          />
        </span>
        {isLarge ? (
          <div className="flex gap-6 md:gap-10">
            {navItems.map((item) => (
              <motion.a
                key={item.to}
                href={`#${item.to}`}
                className="cursor-pointer rounded px-2 py-1 text-base font-semibold text-gray-800 transition-colors duration-200 hover:text-emerald-500 focus:text-emerald-500 focus:outline-none md:text-lg dark:hover:text-emerald-100 dark:focus:text-emerald-100"
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
              className="flex h-10 w-10 flex-col items-center justify-center focus:outline-none"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className="mb-1.5 block h-0.5 w-7 rounded bg-emerald-800 transition-all duration-300"
                style={{
                  transform: open ? "rotate(45deg) translateY(7px)" : "none",
                }}
              />
              <span
                className={`mb-1.5 block h-0.5 w-7 rounded bg-emerald-800 transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className="block h-0.5 w-7 rounded bg-emerald-800 transition-all duration-300"
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
                  className="absolute top-full left-0 z-50 flex w-full flex-col items-center gap-2 border-b border-emerald-950 bg-white/95 py-4 shadow-lg"
                >
                  {navItems.map((item) => (
                    <motion.a
                      key={item.to}
                      href={`#${item.to}`}
                      className="w-full cursor-pointer rounded px-4 py-2 text-center text-lg font-semibold text-gray-800 transition-colors duration-200 hover:text-emerald-500 focus:text-emerald-500 focus:outline-none dark:hover:text-emerald-100 dark:focus:text-emerald-100"
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
