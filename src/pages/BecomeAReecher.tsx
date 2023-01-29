import GoBack from "src/components/GoBack";
import SlideTransition from "src/components/animations/SlideTransition";
import React from "react";
import { motion } from "framer-motion";

// asset
import SpiralImage from "src/assets/Spiral.png";
import Button from "antd/lib/button";

function BecomeAReecher() {
  const [unMount, setUnMount] = React.useState(false);
  return (
    <SlideTransition unMount={unMount}>
      <motion.img
        className="absolute -right-10 top-10"
        src={SpiralImage}
        animate={{ x: 0, opacity: 1 }}
        initial={{ x: 100, opacity: 0 }}
        transition={{ delay: 0.7 }}
      />
      <div className="flex gap-x-3 items-center">
        <GoBack setUnMount={setUnMount} />
        <div className="page-title font-bold text-lg"> Become A Reecher</div>
      </div>
      <div className="grid place-items-center justify-start items-center h-[calc(100%-60px)]">
        <div className="text flex flex-col font-extrabold text-xl">
          <span>EARN MORE</span>
          <span>MAKE SAFE DELIVERIES</span>
          <span> NO STRESS</span>
        </div>
      </div>
      {!unMount && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
          exit={{ y: 50, opacity: 0 }}
          className="actions fixed sm:absolute bottom-0 left-0 w-full bg-inherit p-4"
        >
          <Button
            type="ghost"
            htmlType="submit"
            size="large"
            className="!bg-secondary !text-black !w-full !rounded-lg !py-2 !h-auto !font-bold"
          >
            Continue
          </Button>
        </motion.div>
      )}
    </SlideTransition>
  );
}

export default BecomeAReecher;
