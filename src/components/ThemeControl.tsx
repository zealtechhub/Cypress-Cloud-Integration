import React from "react";
import { Icon } from "@iconify/react";
import { IconButton } from "@mui/material";
import { Dropdown, MenuProps } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { useAppDispatch, useAppSelector } from "@lib/redux/store";
import { MODE, stateInterface } from "@lib/redux/userSlice";
import { nanoid } from "@reduxjs/toolkit";
import { AnimatePresence, motion } from "framer-motion";

const Icons = {
  default: "mdi:theme-light-dark",
  dark: "ic:baseline-dark-mode",
  light: "material-symbols:light-mode",
};

function ThemeControl() {
  const [open, setOpen] = React.useState(false);
  const mode = useAppSelector((state) => state.sessionStore.mode);
  const dispatch = useAppDispatch();

  function handleTheme(this: stateInterface["mode"]) {
    setOpen(false);
    setTimeout(() => {
      dispatch(MODE(this));
    }, 300);
  }

  return (
    <div className="theme-controller absolute bottom-5 left-5">
      <AnimatePresence>
        <motion.div
          key={mode}
          initial={{ scale: 0 }}
          exit={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <Dropdown
            open={open}
            onOpenChange={() => setOpen(!open)}
            placement="topRight"
            overlayClassName="z-[9999]"
            className="z-[99999]"
            menu={{
              items: Items(handleTheme, mode),
            }}
          >
            <IconButton
              size="large"
              onClick={() => setOpen(true)}
              className="!bg-primary/10 shadow-xl shadow-secondary/30"
            >
              <Icon icon={Icons[mode]} height={40} />
            </IconButton>
          </Dropdown>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const Items: (
  handleTheme: (item: ItemType) => void,
  mode: stateInterface["mode"]
) => ItemType[] = (handleTheme, mode) => [
  {
    label: "System Default",
    key: nanoid(),
    onClick: handleTheme.bind("default"),
    icon: <Icon icon="mdi:theme-light-dark" height={24} />,
    className: mode === "default" ? "bg-secondary/30" : "",
  },
  {
    label: "Light Mode",
    key: nanoid(),
    onClick: handleTheme.bind("light"),
    className: mode === "light" ? "bg-secondary/30" : "",
    icon: <Icon icon="material-symbols:light-mode" height={24} />,
  },
  {
    label: "Dark Mode",
    key: nanoid(),
    onClick: handleTheme.bind("dark"),
    className: mode === "dark" ? "bg-secondary/30" : "",
    icon: <Icon icon="ic:baseline-dark-mode" height={24} />,
  },
];

export default ThemeControl;
