import React, { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Input } from "antd";
import { useNavigate, useRoutes } from "react-router-dom";
import CheckPrice from "./CheckPrice";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "@lib/redux/store";
import { INFO } from "@lib/redux/userSlice";

function InitialInfo() {
  const StateInfo = useAppSelector((state) => state.sessionStore.info);
  const [info, setInfo] = React.useState(
    StateInfo ?? {
      description: "",
    }
  );
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const element = useRoutes([
    {
      path: "check-price",
      element: <CheckPrice courier={info.courier as "car" | "truck"} />,
    },
    {
      path: "/*",
      element: <div />,
    },
  ]) as ReactElement;

  const handleClick = (courier: "car" | "truck") => {
    dispatch(
      INFO({
        courier,
        description: info.description,
      })
    );

    setTimeout(() => {
      navigate("check-price");
    }, 300);
  };

  return (
    <React.Fragment>
      <div className="info">
        <motion.form
          animate
          layoutId="form"
          className="w-full rounded-tl-2xl fixed sm:absolute bottom-0 rounded-tr-2xl flex flex-col gap-3 pt-4 pb-10 px-6 shadow-2xl bg-[#f6fcff]"
        >
          <div className="w-12 rounded-xl shadow-xs h-1.5 bg-gray-400 mx-auto" />
          <div className="drawer-content">
            <div className="form-group">
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
            </div>
            <div className="select-courier flex gap-3 items-center mt-4">
              <div className="label font-bold">Select Courier</div>
              <div className="options flex gap-3">
                {IconsComp.map((item) => {
                  return (
                    <Button
                      key={item.courier}
                      onClick={() =>
                        handleClick(item.courier as "car" | "truck")
                      }
                      icon={item.icon}
                      size={"large"}
                      shape={"circle"}
                      className={
                        "rounded-full h-10 w-10 !grid !place-items-center" +
                        (StateInfo.courier === item.courier
                          ? " !bg-secondary !text-black shadow-xl "
                          : " !bg-secondary/40 !text-gray-400")
                      }
                    />
                  );
                })}
              </div>
            </div>
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
