import React from "react";
import GoBack from "@comps/GoBack";
import SlideTransition from "@comps/animations/SlideTransition";
import { Segmented, Button } from "antd";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { VehicleIcon } from "@lib/constants";

function TrackDelivery() {
  const [unMount, setUnMount] = React.useState(false);
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
            onChange={(e) => console.log({ e })}
            className="w-full p-1.5 shadow-lg mt-4 [&_.ant-segmented-item]:py-1.5 bg-secondary/30 [&_.ant-segmented-item-selected]:bg-secondary [&_.ant-segmented-item]:font-bold"
            options={["Current Delivery", "Delivery History"]}
            onResize={undefined}
            onResizeCapture={undefined}
          />
        </div>
        <section className="deliveries my-5 flex flex-col gap-y-4">
          {orderData.map((order, index) => {
            return (
              <div
                key={order.order_id}
                className="bg-[#F5F5F5] shadow-lg p-3 rounded-lg"
              >
                <div className="head flex items-center justify-between">
                  <div className="text-sm font-bold">DEl:{order.order_id}</div>
                  <Button
                    shape="circle"
                    size="small"
                    className=" !grid !place-items-center"
                    icon={
                      <Icon
                        icon={"material-symbols:arrow-forward-ios-rounded"}
                        color="inherit"
                      />
                    }
                  />
                </div>
                <div className="wrap bg-white p-3 rounded-sm mt-3">
                  <div className="delivery-date font-medium text-sm text-gray-600 flex justify-between">
                    {format(new Date(), "ccc MMM d, H:mm b")}
                    {/* tells if the order was cancelled or not */}
                    <div
                      title="Order was successful"
                      className={
                        "status h-3 w-3 rounded-full" +
                        (order.successful ? " bg-green-800" : " bg-red-600")
                      }
                    />
                  </div>
                  <div className="delivery-time font-semibold mt-4">
                    Delivery Time: {order.deliveryTime}
                  </div>
                  <div className="addresses flex flex-col gap-y-4 my-3 font-semibold">
                    <div className="pick-up flex gap-x-2">
                      <Icon
                        icon={VehicleIcon[order.vehicle]}
                        height={24}
                        className="text-red-700"
                      />
                      <div className="address text-sm">
                        From: {order.pickupLocation}
                      </div>
                    </div>
                    <div className="delivery flex gap-x-2">
                      <Icon
                        icon={VehicleIcon[order.vehicle]}
                        className="text-green-700"
                        height={24}
                      />
                      <div className="address text-sm">
                        To: {order.deliveryLocation}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </SlideTransition>
  );
}

type OrderType = {
  order_id: string;
  date: string;
  deliveryTime: string;
  vehicle: "car" | "truck";
  deliveryLocation: string;
  pickupLocation: string;
  successful: boolean;
};

const orderData: OrderType[] = [
  {
    order_id: "124232",
    date: new Date().toDateString(),
    deliveryLocation: "H16, RD27 The Black Mamba Studio, Ikeja",
    pickupLocation: "Tollartech Software Developement Company",
    successful: true,
    deliveryTime: "5.00pm - 6.00pm",
    vehicle: "truck",
  },
  {
    order_id: "1289232",
    date: new Date().toDateString(),
    deliveryLocation: "Airport Road, Lagos, Nigeria",
    pickupLocation: "43 Shoprite road, ejigbo",
    successful: false,
    deliveryTime: "1.00pm - 4.00pm",
    vehicle: "car",
  },
];

export default TrackDelivery;
