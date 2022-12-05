import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Spin } from "antd";

const TextArray = [
  "Thanks for choosing us.",
  "This is won't take much time",
  "Setting things up",
  "Done",
];

function LandingView() {
  const [text, setText] = React.useState<number>(0);

  React.useEffect(() => {
    if (TextArray.length > text) {
      setTimeout(() => {
        setText(text + 1);
      }, 4000);
    }
  }, [text]);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0.8 }}
      exit={{ left: "-100%" }}
      className="p-4 h-full w-full z-[100] ab bg-sky-50 grid place-items-center"
    >
      <div className="wrap grid place-items-center">
        <Spin />
        <div className="font-extrabold text-center text-2xl">Reech</div>
        <AnimatePresence mode="wait">
          <motion.div
            key={text}
            animate={{ y: 0 }}
            initial={{ y: 20 }}
            exit={{ y: -5, opacity: 0, transition: { duration: 0.03 } }}
            className="text-xs"
          >
            {TextArray[text]}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default LandingView;
