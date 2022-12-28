import React from "react";
import GoBack from "@comps/GoBack";
import SlideTransition from "@comps/animations/SlideTransition";

function TrackDelivery() {
  const [unMount, setUnMount] = React.useState(false);
  return (
    <SlideTransition unMount={unMount}>
      <div className="flex gap-x-3 items-center">
        <GoBack setUnMount={setUnMount} />
        <div className="page-title font-bold text-lg"> Track Delivery </div>
      </div>
    </SlideTransition>
  );
}

export default TrackDelivery;
