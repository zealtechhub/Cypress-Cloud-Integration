import React from "react";
import GoBack from "src/components/GoBack";
import SlideTransition from "src/components/animations/SlideTransition";

function Help() {
  const [unMount, setUnMount] = React.useState(false);
  return (
    <SlideTransition unMount={unMount}>
      <div className="flex gap-x-3 items-center">
        <GoBack setUnMount={setUnMount} />
        <div className="page-title font-bold text-lg">Help Center</div>
      </div>
    </SlideTransition>
  );
}

export default Help;
