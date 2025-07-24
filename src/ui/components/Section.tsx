import { motion } from "framer-motion";
import React from "react";
import { useIsLargeScreen } from "../../hooks/useIsLargeScreen";

interface SectionProps {
  children: React.ReactNode;
  id: string;
}

const Section: React.FC<SectionProps> = ({ children, id }) => {
  const isLarge = useIsLargeScreen();

  if (isLarge) {
    return (
      <motion.section
        id={id}
        className="w-full min-h-screen flex items-center justify-center bg-white pb-8"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.7 }}
        style={{ scrollMarginTop: 80 }}
      >
        {children}
      </motion.section>
    );
  }

  // On mobile: no animation
  return (
    <section
      id={id}
      className="w-full min-h-screen flex items-center justify-center bg-white py-8"
      style={{ scrollMarginTop: 80 }}
    >
      {children}
    </section>
  );
};

export default Section;
