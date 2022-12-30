import React from "react";
import { motion, Transition } from "framer-motion";

const FadeTransition: React.FC<{
  children: React.ReactNode;
  duration?: number;
}> = (props) => {
  return (
    <motion.div
      key={"once"}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0.2 }}
      transition={
        { duration: props.duration ?? 0.5, type: "just" } as Transition
      }
      className="h-full relative"
    >
      {props.children}
    </motion.div>
  );
};

export default FadeTransition;
