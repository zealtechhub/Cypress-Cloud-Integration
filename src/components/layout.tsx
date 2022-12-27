import React from "react";
import { useLocation, useRoutes } from "react-router";

import { AnimatePresence } from "framer-motion";

// Pages
import Home from "src/pages/Home";
import Login from "../pages/signIn";
import Profile from "../pages/profile";
import addressPicker from "src/components/dashboard/AddressPicker";
import CreateAccount from "../pages/CreateAccount";
import Dashboard from "../pages/dashboard";
import ProtectedRoute from "./ProtectedRoute";

function Layout() {
  const element = useRoutes([
    {
      path: "profile",
      element: <Profile/>,
    },
    {
      path: "sign-in",
      element: <Login/>,
    },
    {
      path: "create-account/*",
      element: <CreateAccount/>,
    },
    {
      path: "/*",
      element: <ProtectedRoute children={<Home/>}/>,
    },
  ]);

  const location = useLocation();
  if (!element) return null;

  return (
    <AnimatePresence mode="wait">
      <div className="app-container grid h-screen overflow-hidden place-items-center">
        <div
          className="app-wrapper w-screen sm:w-[430px] h-screen max-h-full sm:h-[600px] max-w-[100vw] form-container bg-white sm:rounded-2xl shadow-lg overflow-auto relative">
          {React.cloneElement(element, { key: location.pathname })}
        </div>
      </div>
    </AnimatePresence>
  );
}

export default Layout;
