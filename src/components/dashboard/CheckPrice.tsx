import React from "react";
import { motion } from "framer-motion";
import Button from "antd/lib/button";
import { Divider, Input, Radio } from "antd";
import AddressPicker from "./AddressPicker";
import SlideTransition from "@comps/animations/SlideTransition";
import GoBack from "@comps/GoBack";
import { IconsComp } from "./InitialInfo";
import { useAppSelector } from "@lib/redux/store";

CheckPrice.propTypes = {};

function CheckPrice(props: { courier: "car" | "truck" }) {
  const [unMount, setUnMount] = React.useState(false);
  const courier = useAppSelector((state) => state.sessionStore.info.courier);

  return (
    <SlideTransition unMount={unMount} noPadding>
      <div className="check-price-wrapper h-full overflow-auto p-4">
        <GoBack setUnMount={setUnMount} />
        <div className="select-courier flex gap-3 items-center mt-4">
          <div className="label font-bold">Selected Courier</div>
          <div className="options flex gap-3">
            {IconsComp.map((item) => {
              return (
                <Button
                  key={item.courier}
                  icon={item.icon}
                  size={"large"}
                  shape={"circle"}
                  className={
                    "rounded-full h-10 w-10 !grid !place-items-center" +
                    (courier === item.courier
                      ? " !bg-secondary !text-black shadow-xl "
                      : " !bg-secondary/40 !text-gray-400")
                  }
                />
              );
            })}
          </div>
        </div>
        <Divider style={{ marginBlock: 5 }} />
        <div className="max-weight w-max px-5 p-3 bg-primary/10 rounded-lg broder-1 border-primary/70 font-semibold text-sm">
          Max Weight: 100kg
        </div>
        <div className="delivery flex items-center my-5 gap-x-4">
          <span className="title font-semibold text-sm">Delivery Time</span>
          <div className="bg-primary/10 rounded-lg p-2">
            <Radio.Group name="delivery" defaultValue={"2hrs"}>
              {["2hrs", "4hrs", "Same Day"].map((label) => {
                return <Radio key={label} value={label} children={label} />;
              })}
            </Radio.Group>
          </div>
        </div>
        <section className="address">
          <div className="title font-bold">Pickup & Delivery Address</div>
          <AddressPicker courier={props.courier} />
        </section>
        <section className="additional-info mb-16 flex flex-col gap-y-3 [&_label]:font-semibold [&_label]:block [&_label]:mb-2 [&_input]:rounded-lg [&_input]:shadow-sm [&_.ant-input]:focus:!border-secondary">
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
      </div>
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
            Book Reeech
          </Button>
        </motion.div>
      )}
    </SlideTransition>
  );
}

export default CheckPrice;
