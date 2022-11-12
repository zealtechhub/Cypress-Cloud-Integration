import React from "react";
import { useLocation, useRoutes } from "react-router";

import { AnimatePresence } from "framer-motion";

// Pages
import Dashboard from "src/pages/dashboard";
import Login from "../pages/signIn";
import Register from "../pages/signUp";
import Profile from "../pages/profile";
import { Divider, Modal, Select } from "antd";
import Button from "antd/lib/button";
import { Link, NavLink } from "react-router-dom";

function Layout() {
  const element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "sign-in",
      element: <Login />,
    },
    {
      path: "sign-up",
      element: <Register />,
    },
    {
      path: "profile",
      element: <Profile />,
    },
  ]);

  const location = useLocation();
  console.log({ element, location });
  if (!element) return null;

  return (
    <AnimatePresence mode="wait">
      <div className="app-wrapper grid h-screen overflow-hidden place-items-center">
        <div className="w-[430px] h-full md:h-[600px] max-w-[100vw] form-container p-3 bg-white rounded-2xl py-3 shadow-lg overflow-hidden">
          <Link to="/">
            <div className="form-label font-[1000] text-purple-900 text-2xl text-center">
              Courier
            </div>
          </Link>
          {React.cloneElement(element, { key: location.pathname })}
        </div>
      </div>
    </AnimatePresence>
  );
}

export default Layout;
