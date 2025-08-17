import { useEffect, useState } from "react";

const text = "Louez. Pédalez. Kiffez.";

export default function TypewriterTitle() {
  const [displayedText, setDisplayedText] = useState<React.ReactNode[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        const currentChar = text.charAt(index);

        if (currentChar === " ") {
          setDisplayedText((prev) => [...prev, <br key={index} />]);
        } else {
          setDisplayedText((prev) => [...prev, currentChar]);
        }

        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <h2 className="px-4 pt-4 text-left text-xl leading-relaxed font-bold sm:text-2xl">
      {displayedText}
      <span className="animate-pulse">|</span>
    </h2>
  );
}
