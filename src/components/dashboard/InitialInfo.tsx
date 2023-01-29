import React, { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Input, message } from "antd";
import { useNavigate, useRoutes } from "react-router-dom";
import CheckPrice from "./CheckPrice";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "src/lib/redux/store";
import { INFO } from "src/lib/redux/userSlice";

function InitialInfo() {
  const storedCourier = useAppSelector(
    (state) => state.sessionStore.info.courier
  );
  const [courier, setCourier] =
    React.useState<typeof storedCourier>(storedCourier);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const element = useRoutes([
    {
      path: "check-price",
      element: <CheckPrice />,
    },
    {
      path: "/*",
      element: <div />,
    },
  ]) as ReactElement;

  const handleClick = () => {
    if (!courier) return message.error("Select Courier");
    dispatch(
      INFO({
        courier,
        description: "",
      })
    );

    navigate("check-price");
  };

  return (
    <React.Fragment>
      <div className="info">
        <motion.form
          animate
          className="w-full rounded-tl-2xl fixed sm:absolute bottom-0 rounded-tr-2xl flex flex-col gap-3 pt-4 pb-10 px-6 shadow-2xl bg-[#f6fcff]"
        >
          <div className="w-12 rounded-xl shadow-xs h-1.5 bg-gray-400 mx-auto" />
          <div className="drawer-content">
            {/* <div className="form-group">
              <Input
                size={"large"}
                placeholder={"What are you sending?"}
                onChange={(e) =>
                  setInfo({ ...info, description: e.target.value })
                }
                className={
                  "!rounded-xl !bg-secondary/60 py-3 placeholder:!text-black/70 !font-[nunito] font-semibold"
                }
              />
            </div> */}
            <div className="select-courier flex gap-3 items-center mt-4">
              <div className="label font-bold">Select Courier</div>
              <div className="options flex gap-3">
                {IconsComp.map((item) => {
                  return (
                    <Button
                      key={item.courier}
                      onClick={() =>
                        setCourier(item.courier as "car" | "truck")
                      }
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
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              exit={{ y: 50, opacity: 0 }}
              className="actions w-full bg-inherit mt-4"
            >
              <Button
                type="ghost"
                htmlType="button"
                size="large"
                onClick={handleClick}
                className="!bg-secondary !text-black !w-full !rounded-lg !py-2 !h-auto !font-bold"
              >
                Book Reech
              </Button>
            </motion.div>
          </div>
        </motion.form>
      </div>
      <AnimatePresence>{React.cloneElement(element, {})}</AnimatePresence>
    </React.Fragment>
  );
}

export const IconsComp = [
  {
    icon: <Icon icon="game-icons:city-car" height={30} />,
    courier: "car",
  },
  {
    icon: <Icon icon="mdi:truck-check" height={30} />,
    courier: "truck",
  },
];

export default InitialInfo;
