import React from "react";
import { Button } from "antd";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { VehicleIcon } from "@lib/constants";
import { Order as OrderType } from "@lib/types";

function Order(props: { order: OrderType }) {
  const order = props.order;
  return (
    <div key={order.id} className="bg-[#F5F5F5] shadow-lg p-3 rounded-lg">
      <div className="head flex items-center justify-between">
        <div className="text-sm font-bold">DEl:{order.id}</div>
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
              (order.status === "delivered"
                ? " bg-green-800"
                : order.status === "cancelled"
                ? " bg-red-600"
                : " bg-yellow-600")
            }
          />
        </div>
        <div className="delivery-time font-semibold mt-4">
          Delivery Time:{" "}
          <span
            dangerouslySetInnerHTML={{
              __html: order.deliveryTime,
            }}
          />
        </div>
        <div className="addresses flex flex-col gap-y-4 my-3 font-semibold">
          <div className="pick-up flex gap-x-2">
            <Icon
              icon={VehicleIcon[order.courier]}
              height={24}
              className="text-red-700 min-w-max"
            />
            <div className="address text-sm">
              From: {order.pickupLocation.description}
            </div>
          </div>
          <div className="delivery flex gap-x-2">
            <Icon
              icon={VehicleIcon[order.courier]}
              className="text-green-700 min-w-max"
              height={24}
            />
            <div className="address text-sm">
              To: {order.deliveryLocation.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
