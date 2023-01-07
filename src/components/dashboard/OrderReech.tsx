import React from "react";
import { motion } from "framer-motion";
import { Button } from "antd";
import { Icon } from "@iconify/react";
import { useAppSelector } from "@lib/redux/store";
import { VehicleIcon } from "@lib/constants";
import { FormFields } from "./CheckPrice";
import Map from "./Map";
import { Wrapper } from "@googlemaps/react-wrapper";

type PropsType = {
  fields: FormFields;
};

function OrderReech(props: PropsType) {
  const { pickupLocation, deliveryLocation } = props.fields;
  const courier = useAppSelector((state) => state.sessionStore.info.courier);

  return (
    <motion.div
      className="h-[500px] absolute bottom-0 shadow-2xl w-full py-3 bg-white rounded-t-2xl"
      animate={{ y: 0 }}
      initial={{ y: 500 }}
    >
      <div className="wrapper">
        <div className="close-btn-wrap flex justify-end px-3">
          <Button type="ghost" className="rounded-lg shadow-lg text-primary">
            Cancel
          </Button>
        </div>
        <div className="map-snapshot h-[150px]">
          <Map showCurrent={false} />
        </div>
        <div className="address-stamp bg-secondary/20 p-2 my-3">
          <div className="pick-up flex gap-x-3 items-center">
            <Icon
              icon={VehicleIcon[courier as "car" | "truck"]}
              height={24}
              className="text-green-700"
            />
            <span>{pickupLocation.description}</span>
          </div>
          <hr className="my-3" />
          <div className="delivered flex gap-x-3 items-center">
            <Icon
              icon={VehicleIcon[courier as "car" | "truck"]}
              height={24}
              className="text-red-700"
            />
            <span>{deliveryLocation.description}</span>
          </div>
        </div>
        <div className="other-details p-3 flex flex-col gap-y-4">
          <div className="estimated-travel-time" aria-describedby="es-time">
            <span id="es-time" className="font-bold">
              Estimated Travel time:{" "}
            </span>{" "}
            <span>60mins</span>
          </div>
          <div className="delivery-time" aria-describedby="de-time">
            <span id="de-time" className="font-bold">
              Delivery time:{" "}
            </span>{" "}
            <span>6.00pm</span>
          </div>
          <div className="weight" aria-describedby="weigh">
            <span id="weigh" className="font-bold">
              Weight:{" "}
            </span>{" "}
            <span>40kg - 50kg</span>
          </div>
          <div className="price" aria-describedby="price-title">
            <span id="price-title" className="font-bold">
              Price:{" "}
            </span>{" "}
            <span>#{(50000).toLocaleString("en")}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default OrderReech;
