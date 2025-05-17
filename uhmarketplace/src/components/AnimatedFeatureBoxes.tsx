"use client";

import { motion } from "framer-motion";
import FeatureBox from "./ui/FeatureBox";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const AnimatedFeatureBoxes = () => {
  return (
    <motion.div
      className="grid grid-cols-4 py-8 bg-white text-gray-700 z-1 ml-8 mr-8 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants}>
        <FeatureBox
          imageSrc="landing-images/box-icon.png"
          altText="Box Icon"
          description="Marketplace"
          scrollToId="marketplace"
      />
      </motion.div>
      <motion.div variants={itemVariants}>
        <FeatureBox
          imageSrc="landing-images/chat-icon.png"
          altText="Chat Icon"
          description="Check In Bot"
          scrollToId="check-in"
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <FeatureBox
          imageSrc="landing-images/services-cion.png"
          altText="Tutoring Icon"
          description="Schedule Tutoring"
          scrollToId="tutoring"
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <FeatureBox
          imageSrc="landing-images/group-icon-24.jpg"
          altText="Chat Icon"
          description="Join a Club"
          scrollToId="clubs"
        />
      </motion.div>
    </motion.div>
  );
};

export default AnimatedFeatureBoxes;
