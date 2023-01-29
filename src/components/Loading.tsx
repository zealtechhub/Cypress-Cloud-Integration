import React from "react";
import SlideTransition from "src/components/animations/SlideTransition";
import { Spin } from "antd";

function Loading({
  text = "Loading",
  unMount,
}: {
  text: string;
  unMount?: boolean;
}) {
  return (
    <SlideTransition unMount={false} goBack={false} noPadding>
      <div className="wrap flex flex-col items-center justify-center h-full animate-pulse bg-slate-100">
        <Spin className="[&_.ant-spin-dot-item]:bg-primary" />
        <div className="text-xs">{text}</div>
        <div>
          {/* <div className="font-bold text-center text-lg">Loading...</div> */}
        </div>
      </div>
    </SlideTransition>
  );
}

export default Loading;
