import React from "react";
import { motion } from "framer-motion";

export default function Header() {
  const slideInVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <h1 className="text-4xl text-white text-center font-semibold bg-gradient-to-r from-orange-600 to-blue-800 py-4 italic">
        <motion.span
          initial="hidden"
          animate="visible"
          variants={slideInVariants}
        >
          TODO APP
        </motion.span>
      </h1>
    </>
  );
}
