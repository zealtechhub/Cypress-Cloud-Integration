import GoBack from "@comps/GoBack";
import SlideTransition from "@comps/animations/SlideTransition";
import React from "react";

function BecomeAReecher() {
  const [unMount, setUnMount] = React.useState(false);
  return (
    <SlideTransition unMount={unMount}>
      <div className="flex gap-x-3 items-center">
        <GoBack setUnMount={setUnMount} />
        <div className="page-title font-bold text-lg"> Become A Reecher</div>
      </div>
    </SlideTransition>
  );
}

export default BecomeAReecher;
