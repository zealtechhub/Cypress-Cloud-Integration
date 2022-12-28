import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Button from "antd/lib/button";
import { Car, Truck } from "../SVG";
import { Divider, Input, Radio } from "antd";
import AddressPicker from "./AddressPicker";
import SlideTransition from "@comps/animations/SlideTransition";
import GoBack from "@comps/GoBack";

CheckPrice.propTypes = {};

function CheckPrice(props: {}) {
  const [unMount, setUnMount] = React.useState(false);

  return (
    <SlideTransition unMount={unMount}>
      <GoBack setUnMount={setUnMount} />
      <div className="select-courier flex gap-3 items-center mt-4">
        <div className="label font-bold">Selected Courier</div>
        <div className="options flex gap-3">
          <Button
            icon={<Car fill={"gray"} />}
            size={"large"}
            shape={"circle"}
            className="car !bg-secondary text-black !border-none rounded-full h-10 w-10 !grid !place-items-center"
          />
          <Button
            icon={
              <Icon icon="mdi:truck-check" color={"lightgrey"} height={30} />
            }
            size={"large"}
            shape={"circle"}
            className="car !bg-secondary/40 !border-none rounded-full h-10 w-10 !grid !place-items-center"
          />
        </div>
      </div>
      <Divider style={{ marginBlock: 5 }} />
      <div className="max-weight w-max px-5 p-3 bg-primary/10 rounded-lg broder-1 border-primary/70 font-semibold text-sm">
        Max Weight: 100kg
      </div>
      <div className="delivery flex my-5 gap-x-4">
        <span className="title font-semibold">Delivery Time</span>
        <Radio.Group name="delivery" defaultValue={"2hrs"}>
          {["2hrs", "4hrs", "Same Day"].map((label) => {
            return <Radio key={label} value={label} children={label} />;
          })}
        </Radio.Group>
      </div>
      <section className="address">
        <div className="title font-bold">Pickup & Delivery Address</div>
        <AddressPicker />
      </section>
      <section className="additional-info mb-10 flex flex-col gap-y-3 [&_label]:font-semibold [&_label]:block [&_label]:mb-2 [&_input]:rounded-lg [&_input]:shadow-sm [&_.ant-input]:focus:!border-secondary">
        <div className="form-group payment-option">
          <label htmlFor="payment-option-text-control">Payment Option</label>
          <Input
            size="large"
            id="payment-option-text-control"
            className="w-full"
          />
        </div>
        <div className="form-group payment-option">
          <label htmlFor="item-type-text-control">Item Type</label>
          <Input
            size="large"
            color="#42e3a3"
            id="item-type-text-control"
            className="w-full"
          />
        </div>
        <div className="form-group item-details">
          <label htmlFor="item-details-text-control">Item Details</label>
          <Input
            size="large"
            id="item-details-text-control"
            className="w-full"
          />
        </div>
      </section>
      {!unMount && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
          exit={{ y: 50, opacity: 0 }}
          className="actions fixed sm:absolute bottom-0 left-0 w-full bg-inherit p-4"
        >
          <Button
            type="ghost"
            htmlType="submit"
            size="large"
            className="!bg-secondary !text-black !w-full !rounded-lg !py-2 !h-auto !font-bold"
          >
            Submit Form
          </Button>
        </motion.div>
      )}
    </SlideTransition>
  );
}

export default CheckPrice;
