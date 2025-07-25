import { motion } from "framer-motion";
import React from "react";

const section =
  "w-full h-screen bg-background-dark flex flex-col justify-center items-center text-center overflow-hidden px-6 py-12";
const title = "text-3xl md:text-5xl font-extrabold text-white mb-2";
const subtitle = "text-md md:text-lg text-gray-300 mb-10";
const track = "flex gap-6";
const card =
  "min-w-[300px] md:min-w-[400px] h-[200px] bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between text-left";

interface Review {
  review: string;
  name: string;
  situation: string;
}

const ReviewsSection: React.FC = () => {
  const reviews: Review[] = [
    {
      review: "Le meilleur magasin de vélos que j’aie jamais visité !",
      name: "Jane Doe",
      situation: "Balades occasionnelles",
    },
    {
      review: "J’adore le choix d’accessoires !",
      name: "Jim Smith",
      situation: "Cycliste urbain",
    },
    {
      review:
        "Le personnel compétent m’a aidé à trouver exactement ce qu’il me fallait.",
      name: "Bob Johnson",
      situation: "VTTiste",
    },
    {
      review:
        "Je viens ici depuis des années et je repars toujours satisfait !",
      name: "Sarah Taylor",
      situation: "Passionnée de route",
    },
  ];

  return (
    <section className={section}>
      {/* Title & Description */}
      <h2 className={title}>Les avis de nos clients</h2>
      <p className={subtitle}>Ils vous le diront mieux que nous !</p>

      {/* Scrolling Reviews */}
      <motion.div
        className={track}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...reviews, ...reviews].map((review, index) => (
          <div key={index} className={card}>
            <p className="text-md mb-4 font-medium text-gray-800">
              “{review.review}”
            </p>
            <div>
              <h4 className="text-sm font-bold text-gray-700">{review.name}</h4>
              <p className="text-sm text-gray-500">{review.situation}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default ReviewsSection;
