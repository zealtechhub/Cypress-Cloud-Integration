import React from "react";
import SlideTransition from "@comps/animations/SlideTransition";
import { Spin } from "antd";

function Loading({ text }: { text: string }) {
  return (
    <SlideTransition unMount={false}>
      <div className="wrap grid place-items-center">
        <Spin />
        <div className="font-bold text-center text-lg">Loading...</div>
        <div className="text-xs">{text}</div>
      </div>
    </SlideTransition>
  );
}

export default Loading;
