import SlideTransition from "@comps/animations/SlideTransition";
import React from "react";

function Courier() {
  return (
    <SlideTransition unMount={false} noPadding>
      <div className="delivery-state"></div>
    </SlideTransition>
  );
}

export default Courier;
