import React from "react";
import { useLocation, useRoutes } from "react-router";

import { AnimatePresence } from "framer-motion";

// Pages
import Dashboard from "src/pages/dashboard";
import Login from "../pages/signIn";
import Register from "../pages/signUp";
import Profile from "../pages/profile";

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
  if (!element) return null;

  return (
    <AnimatePresence mode="wait">
      <div className="app-wrapper grid h-screen overflow-hidden place-items-center">
        <div className="w-[430px] max-h-full md:h-[600px] max-w-[100vw] form-container p-3 bg-white rounded-2xl py-3 shadow-lg overflow-auto">
          {React.cloneElement(element, { key: location.pathname })}
        </div>
      </div>
    </AnimatePresence>
  );
}

export default Layout;
