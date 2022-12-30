import React from "react";

// components
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { CardActionArea, IconButton, SwipeableDrawer } from "@mui/material";
import { Avatar, Dropdown } from "antd";

// assets
import ProfileImage from "@assets/profile.jpg";
import ThemeControl from "./ThemeControl";

function AppDrawer() {
  const [open, setOpen] = React.useState(false);

  function _c(this: boolean) {
    setOpen(this);
  }

  return (
    <React.Fragment>
      <div className="drawer-container bg-white h-32 fixed z-[999]">
        <IconButton
          onClick={() => setOpen(true)}
          size="large"
          className="toggle-bt !absolute top-5 left-10 !bg-white shadow-2xl"
        >
          <Icon icon={"ic:round-menu"} />
        </IconButton>
        <SwipeableDrawer
          open={open}
          swipeAreaWidth={60}
          onOpen={_c.bind(true)}
          onClose={_c.bind(false)}
        >
          <div className="drawer-content !bg-primary/10 h-full py-3 w-[300px]">
            <CardActionArea onClick={_c.bind(false)}>
              <NavLink to={"profile"}>
                <div role={"list"} className="list">
                  <div
                    role={"listitem"}
                    className="flex items-center gap-x-3 p-2 border-b border-gray-300"
                  >
                    <Avatar src={ProfileImage} shape="circle" size={"large"} />
                    <div className="name flex flex-col flex-grow">
                      <span className="name font-bold text-lg">
                        Timothy Barlin
                      </span>
                      <span className="subtitle text-xs">View profile</span>
                    </div>
                    <div className="nav-signal">
                      <Icon
                        icon={"material-symbols:arrow-forward-ios-rounded"}
                      />
                    </div>
                  </div>
                </div>
              </NavLink>
            </CardActionArea>
            {ListItems.map((item) => (
              <CardActionArea onClick={_c.bind(false)} key={item.path}>
                <NavLink to={item.path}>
                  <div role={"list"} className="list">
                    <div
                      role={"listitem"}
                      className="flex items-center gap-x-3 p-2 py-4 border-b border-gray-300"
                    >
                      <Icon icon={item.icon} height={24} color={"gray"} />
                      <span className="name font-semibold flex-grow">
                        {item.title}
                      </span>
                      {item.path !== "logout" && (
                        <div className="nav-signal">
                          <Icon
                            icon={"material-symbols:arrow-forward-ios-rounded"}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </NavLink>
              </CardActionArea>
            ))}
          </div>

          <ThemeControl />
        </SwipeableDrawer>
      </div>
    </React.Fragment>
  );
}

const ListItems = [
  {
    icon: "healthicons:truck-driver-outline",
    title: "Become a Reecher",
    path: "become-a-reecher",
  },
  {
    icon: "tabler:truck-delivery",
    title: "Track Delivery",
    path: "track-delivery",
  },
  {
    icon: "ri:secure-payment-line",
    title: "Payment",
    path: "payment",
  },
  {
    icon: "ic:baseline-live-help",
    title: "Help",
    path: "help-center",
  },
  {
    icon: "heroicons-outline:logout",
    title: "Logout",
    path: "logout",
  },
];

export default AppDrawer;
