import React from "react";
import { motion } from "framer-motion";
import { Spin } from "antd";

function Loading({ text }: { text: string }) {
  return (
    <motion.div
      animate={{ x: 0 }}
      initial={{ x: 500 }}
      exit={{ position: "absolute", left: "100%" }}
      transition={{ type: "just" }}
      className="p-4 h-full w-full z-[100] absolute top-0 left-0 bg-sky-50 grid place-items-center"
    >
      <div className="wrap grid place-items-center">
        <Spin />
        <div className="font-bold text-center text-lg">Loading...</div>
        <div className="text-xs">{text}</div>
      </div>
    </motion.div>
  );
}

export default Loading;
