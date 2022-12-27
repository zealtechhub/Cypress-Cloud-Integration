import React, { ReactElement } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { Button, Input } from "antd";
import { Car, Truck } from "../SVG";
import { useNavigate, useRoutes } from "react-router-dom";
import CheckPrice from "./CheckPrice";

function InitialInfo() {
  const navigate = useNavigate();
  const element = useRoutes([
    {
      path: "/",
      element: <div/>
    },
    {
      path: "check-price",
      element: <CheckPrice/>
    }
  ]) as ReactElement;

  const handleClick = () => {
    navigate("check-price");
  }

  return (
    <React.Fragment>
      <div className="info">
        <motion.form
          animate
          layoutId="form"
          className="w-full rounded-tl-2xl absolute bottom-0 rounded-tr-2xl flex flex-col gap-3 pt-4 pb-10 px-6 shadow-2xl bg-[#f6fcff]"
        >
          <div className="w-12 rounded-xl shadow-xs h-1.5 bg-gray-400 mx-auto"/>
          <div className="drawer-content">
            <div className="form-group">
              <Input size={"large"} placeholder={"What are you sending?"}
                     className={"!rounded-xl !bg-secondary placeholder:!text-black/80 font-semibold"}/>
            </div>
            <div className="select-courier flex gap-3 items-center mt-4">
              <div className="label font-bold">
                Select Courier
              </div>
              <div className="options flex gap-3">
                <Button onClick={handleClick} icon={<Car/>} size={"large"} shape={"circle"}
                        className="car !bg-secondary/40 !border-none rounded-full h-10 w-10 !grid !place-items-center"/>
                <Button onClick={handleClick} icon={<Truck/>} size={"large"} shape={"circle"}
                        className="car !bg-secondary/40 !border-none rounded-full h-10 w-10 !grid !place-items-center"/>
              </div>
            </div>
          </div>
        </motion.form>
      </div>
      <AnimatePresence>
        {React.cloneElement(element, {})}
      </AnimatePresence>
    </React.Fragment>
  );
}

export default InitialInfo;