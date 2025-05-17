// FadeInGrid.tsx
"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1, // how fast each one shows
      delayChildren: 0.3,   // wait 300ms before starting the sequence
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FadeInGrid = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [inView, controls]);

  const images = Array.from({ length: 24 }, (_, i) => `club-images/club-1.png`);
  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-6 gap-3 max-w-5xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <motion.div variants={itemVariants} className="p-2">
          <img src={`club-images/club-1.png`} className="w-full h-auto object-contain" />
      </motion.div>
      <motion.div variants={itemVariants} className="p-2">
          <img src={`club-images/club-2.png`} className="w-full h-auto object-contain" />
      </motion.div>
      <motion.div variants={itemVariants} className="p-2">
          <img src={`club-images/club-3.png`} className="w-full h-auto object-contain" />
      </motion.div>
      <motion.div variants={itemVariants} className="p-2">
          <img src={`club-images/club-4.png`} className="w-full h-auto object-contain" />
      </motion.div>
      <motion.div variants={itemVariants} className="p-2">
          <img src={`club-images/club-5.png`} className="w-full h-auto object-contain" />
      </motion.div>
      <motion.div variants={itemVariants} className="p-2">
          <img src={`club-images/club-6.png`} className="w-full h-auto object-contain" />
      </motion.div>
      <motion.div variants={itemVariants} className="p-2">
          <img src={`club-images/club-7.png`} className="w-full h-auto object-contain" />
      </motion.div>
      <motion.div variants={itemVariants} className="p-2">
          <img src={`club-images/club-8.png`} className="w-full h-auto object-contain" />
      </motion.div>
      <motion.div variants={itemVariants} className="p-2">
          <img src={`club-images/club-9.png`} className="w-full h-auto object-contain" />
      </motion.div>
      <motion.div variants={itemVariants} className="p-2">
          <img src={`club-images/club-10.png`} className="w-full h-auto object-contain" />
      </motion.div>
      <motion.div variants={itemVariants} className="p-2">
          <img src={`club-images/club-25.png`} className="w-full h-auto object-contain" />
      </motion.div>
      <motion.div variants={itemVariants} className="p-2">
          <img src={`club-images/club-12.png`} className="w-full h-auto object-contain" />
      </motion.div>
      <motion.div variants={itemVariants} className="p-2">
          <img src={`club-images/club-13.png`} className="w-full h-auto object-contain" />
      </motion.div>
      <motion.div variants={itemVariants} className="p-2">
          <img src={`club-images/club-14.png`} className="w-full h-auto object-contain" />
      </motion.div>
      <motion.div variants={itemVariants} className="p-2">
          <img src={`club-images/club-15.png`} className="w-full h-auto object-contain" />
      </motion.div>
      <motion.div variants={itemVariants} className="p-2">
          <img src={`club-images/club-16.png`} className="w-full h-auto object-contain" />
      </motion.div>
      <motion.div variants={itemVariants} className="p-2">
          <img src={`club-images/club-17.png`} className="w-full h-auto object-contain" />
      </motion.div>
      <motion.div variants={itemVariants} className="p-2">
          <img src={`club-images/club-18.png`} className="w-full h-auto object-contain" />
      </motion.div>
      <motion.div variants={itemVariants} className="p-2">
          <img src={`club-images/club-19.jpg`} className="w-full h-auto object-contain" />
      </motion.div>
      <motion.div variants={itemVariants} className="p-2">
          <img src={`club-images/club-24.png`} className="w-full h-auto object-contain" />
      </motion.div>
      <motion.div variants={itemVariants} className="p-2">
          <img src={`club-images/club-21.png`} className="w-full h-auto object-contain" />
      </motion.div>
      <motion.div variants={itemVariants} className="p-2">
          <img src={`club-images/club-22.png`} className="w-full h-auto object-contain" />
      </motion.div>
      <motion.div variants={itemVariants} className="p-2">
          <img src={`club-images/club-23.png`} className="w-full h-auto object-contain" />
      </motion.div>
      <motion.div variants={itemVariants} className="p-2">
          <img src={`club-images/club-20.png`} className="w-full h-auto object-contain" />
      </motion.div>
    </motion.div>
  );
};

export default FadeInGrid;
