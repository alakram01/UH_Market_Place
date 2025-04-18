"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const images = [
  "landing-images/tutoring-in-library.jpg",
  "landing-images/tutoring-1.jpg",
  "landing-images/tutoring-2.png",
];

const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const TutoringImageSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000); // change image every 3 seconds

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <div className="col-span-2 flex justify-center items-center w-full h-full">
      <div className="relative w-full h-full overflow-hidden rounded-xl shadow-lg">
        <AnimatePresence>
          <motion.img
            key={images[index]}
            src={images[index]}
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1 }}
            className="w-full h-full object-cover absolute top-0 left-0"
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TutoringImageSlider;