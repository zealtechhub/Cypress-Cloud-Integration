import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router";

interface SlideTransitionInterface {
  children: React.ReactNode;
  unMount: boolean;
  goBack?: boolean;
  noPadding?: boolean;
  className?: string;
  style?: React.CSSProperties;
  zIndex?: number;
}

function SlideTransition(props: SlideTransitionInterface) {
  const navigate = useNavigate();
  return (
    <div
      style={{ zIndex: 9999 ?? props.zIndex }}
      className={"fixed sm:absolute left-0 top-0 h-full w-full overflow-hidden"}
    >
      <AnimatePresence
        onExitComplete={() => {
          if (props.goBack === false) return;
          navigate(-1);
        }}
      >
        {!props.unMount && (
          <motion.div
            animate={{
              x: 0,
            }}
            initial={{ x: "100%" }}
            exit={{ position: "absolute", left: "100%" }}
            transition={{ type: "just" }}
            className={
              "h-full w-full z-[99999999] top-0 left-0 bg-white overflow-hidden absolute" +
              (props.noPadding ? "" : " p-4")
            }
          >
            {props.children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SlideTransition;
