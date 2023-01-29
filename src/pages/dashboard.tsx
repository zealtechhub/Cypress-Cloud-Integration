import React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

// components
import Map from "../components/dashboard/Map";
import InitialInfo from "../components/dashboard/InitialInfo";
import { AnimatePresence } from "framer-motion";
import { useRoutes } from "react-router";
import BecomeAReecher from "src/pages/BecomeAReecher";
import TrackDelivery from "src/pages/TrackDelivery";
import Payment from "src/pages/Payment";
import Logout from "src/pages/Logout";
import Help from "src/pages/Help";
import Profile from "src/pages/Profile";
import AppDrawer from "src/components/AppDrawer";

// styles
import "src/styles/dashboard.sass";

export const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
export const render = (status: Status) => {
  return (
    <div
      title="This display the progress of map loading "
      role="progressbar"
      className="grid h-full shadow animate-pulse bg-secondary/20 place-items-center"
    />
  );
};

function Dashboard() {
  const element = useRoutes([
    {
      path: "profile",
      element: <Profile />,
    },
    {
      path: "become-a-reecher",
      element: <BecomeAReecher />,
    },
    {
      path: "track-delivery",
      element: <TrackDelivery />,
    },
    {
      path: "payment",
      element: <Payment />,
    },
    {
      path: "help-center",
      element: <Help />,
    },
    {
      path: "logout",
      element: <Logout />,
    },
    {
      path: "/*",
      element: <div />,
    },
  ]);

  return (
    <div className={"wrapper relative"}>
      <AppDrawer />
      <Wrapper apiKey={GOOGLE_API_KEY} render={render}>
        <Map />
      </Wrapper>
      <InitialInfo />
      <AnimatePresence>
        {React.cloneElement(element as React.ReactElement)}
      </AnimatePresence>
    </div>
  );
}

export default Dashboard;
