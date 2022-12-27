import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from "@iconify/react";
import Button from "antd/lib/button";
import { Car, Truck } from "../SVG";
import { useNavigate } from "react-router-dom";
import { Checkbox, Divider, Radio } from "antd";
import AddressPicker from "./AddressPicker";

CheckPrice.propTypes = {};

function CheckPrice(props: {}) {
  const [visible, setVisible] = React.useState(true);
  const navigate = useNavigate();

  return (
    // eslint-disable-next-line react/jsx-no-undef
    <div className="absolute top-0 h-full w-full overflow-hidden">
      <AnimatePresence onExitComplete={() => navigate(-1)}>
        {visible && (
          <motion.div
            animate={{ x: 0 }}
            initial={{ x: 500 }}
            exit={{ position: "absolute", left: "100%" }}
            transition={{ type: "just" }}
            className="p-4 h-full w-full top-0 left-0 bg-white"
          >
            <Button
              shape="circle"
              className=" !grid !place-items-center"
              onClick={() => setVisible(false)}
              icon={
                <Icon
                  icon={"material-symbols:arrow-back-ios-rounded"}
                  height={16}
                  className="inline-block ml-1"
                  color="inherit"
                />
              }
            />
            <div className="select-courier flex gap-3 items-center mt-4">
              <div className="label font-bold">
                Select Courier
              </div>
              <div className="options flex gap-3">
                <Button icon={<Car className={"!text-black"}/>} size={"large"} shape={"circle"}
                        className="car !bg-secondary text-black !border-none rounded-full h-10 w-10 !grid !place-items-center"/>
                <Button icon={<Truck/>} size={"large"} shape={"circle"}
                        className="car !bg-secondary/40 !border-none rounded-full h-10 w-10 !grid !place-items-center"/>
              </div>
            </div>
            <Divider style={{ marginBlock: 5 }}/>
            <div
              className="max-weight w-max px-5 p-3 bg-primary/10 rounded-lg broder-1 border-primary/70 font-semibold text-sm">
              Max Weight: 100kg
            </div>
            <div className="delivery flex my-5 gap-x-4">
              <span className="title font-semibold">Delivery Time</span>
              <Radio.Group name="delivery" defaultValue={"2hrs"}>
                {["2hrs", "4hrs", "Same Day"].map((label) => {
                  return (
                    <Radio value={label} children={label}/>
                  )
                })}
              </Radio.Group>
            </div>
            <section className="address">
              <div className="title font-bold">
                Pickup & Delivery Address
              </div>
              <AddressPicker/>
            </section>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="mt-4 !rounded-lg !py-2 !h-auto !font-bold"
            >
              Submit Form
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CheckPrice;