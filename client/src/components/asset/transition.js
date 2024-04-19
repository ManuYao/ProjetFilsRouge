//Me permet de gérer les transitions entre les pages avec framer-motion

import React from "react";
import { motion } from "framer-motion";

const transitions = (OrgComponent) => {
  return () => (
    <>
      <OrgComponent />
      <motion.div
        className="slide-in"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 6, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="slide-out"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 6, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
};

export default transitions;
