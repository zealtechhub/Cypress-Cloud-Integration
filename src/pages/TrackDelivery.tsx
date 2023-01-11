import React from "react";
import GoBack from "@comps/GoBack";
import SlideTransition from "@comps/animations/SlideTransition";
import { Segmented } from "antd";
import SwipeableViews from "react-swipeable-views";

import EmptyComponent from "@comps/Empty";
import { useAppSelector } from "@lib/redux/store";
import OrderComponent from "@comps/Order";

function TrackDelivery() {
  const [unMount, setUnMount] = React.useState(false);
  const [tab, setTab] = React.useState("Current Delivery");
  const orders = useAppSelector((state) => state.sessionStore.orders);

  const changeTab = () =>
    setTab(
      tab === "Delivery History" ? "Current Delivery" : "Delivery History"
    );

  const activeDeliveries = orders.filter(
    (order) => order.status === "delivering"
  );

  const deliveryHistory = orders.filter(
    (order) => order.status !== "delivering"
  );

  return (
    <SlideTransition unMount={unMount} noPadding>
      <div className="track-delivery-wrapper h-full overflow-auto p-4">
        <div className="head sticky top-0 bg-white z-50">
          <div className="flex gap-x-3 items-center">
            <GoBack setUnMount={setUnMount} />
            <div className="page-title font-bold text-lg"> Track Delivery </div>
          </div>
          <Segmented
            size={"large"}
            block
            value={tab}
            onChange={changeTab}
            className="w-full p-1.5 shadow-lg mt-4 [&_.ant-segmented-item]:py-1.5 bg-secondary/30 [&_.ant-segmented-item-selected]:!bg-secondary [&_.ant-segmented-item]:font-bold"
            options={["Current Delivery", "Delivery History"]}
            onResize={undefined}
            onResizeCapture={undefined}
          />
        </div>
        <SwipeableViews
          className="h-full"
          index={tab === "Delivery History" ? 1 : 0}
          onChangeIndex={changeTab}
        >
          <section className="active-delivery my-5 flex flex-col gap-y-4">
            {activeDeliveries.map((order, index) => {
              return <OrderComponent key={order.id} order={order} />;
            })}
            {!activeDeliveries?.length && (
              <EmptyComponent title="OOPS! NO ACTIVE ORDER" />
            )}
          </section>
          <section className="delivery-history h-full">
            {deliveryHistory.map((order, index) => {
              return <OrderComponent key={order.id} order={order} />;
            })}
            {!Boolean(deliveryHistory.length) && (
              <EmptyComponent title="OOPS! NO PAST DELIVERY" />
            )}
          </section>
        </SwipeableViews>
      </div>
    </SlideTransition>
  );
}

// const orderData: Order[] = [
//   {
//     order_id: "124232",
//     date: new Date().toDateString(),
//     deliveryLocation: "H16, RD27 The Black Mamba Studio, Ikeja",
//     pickupLocation: "Tollartech Software Developement Company",
//     successful: true,
//     deliveryTime: "5.00pm - 6.00pm",
//     vehicle: "truck",
//   },
//   {
//     order_id: "1289232",
//     date: new Date().toDateString(),
//     deliveryLocation: "Airport Road, Lagos, Nigeria",
//     pickupLocation: "43 Shoprite road, ejigbo",
//     successful: false,
//     deliveryTime: "1.00pm - 4.00pm",
//     vehicle: "car",
//   },
// ];

export default TrackDelivery;
