import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router";

interface SlideTransitionInterface {
  children: React.ReactNode;
  unMount: boolean;
}

function SlideTransition(props: SlideTransitionInterface) {
  const navigate = useNavigate();
  console.log({ props });
  return (
    <div className="absolute top-0 h-full w-full overflow-hidden z-[99999]">
      <AnimatePresence onExitComplete={() => navigate(-1)}>
        {!props.unMount && (
          <motion.div
            animate={{ x: 0 }}
            initial={{ x: 500 }}
            exit={{ position: "absolute", left: "100%" }}
            transition={{ type: "just" }}
            className="p-4 pb-16 h-full w-full z-[100] top-0 left-0 bg-white overflow-auto"
          >
            {props.children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SlideTransition;
