import React from "react";
import { useLocation, useRoutes } from "react-router";
import { ConfigProvider } from "antd";

import { AnimatePresence } from "framer-motion";

// Pages
import Home from "@pages/Home";
import CreateAccount from "@pages/CreateAccount";
import ProtectedRoute from "@comps/ProtectedRoute";
import AppDrawer from "@comps/AppDrawer";

function Layout() {
  const element = useRoutes([
    {
      path: "create-account/*",
      element: <CreateAccount />,
    },
    {
      path: "/*",
      element: <ProtectedRoute children={<Home />} />,
    },
  ]);

  const location = useLocation();
  if (!element) return null;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "rgba(250,221,60,1)",
        },
      }}
    >
      <AnimatePresence mode="wait">
        <div className="app-container grid h-screen overflow-hidden place-items-center">
          <div className="app-wrapper w-screen sm:w-[430px] h-screen max-h-full sm:h-[600px] max-w-[100vw] form-container bg-white sm:rounded-2xl shadow-lg overflow-auto relative">
            <AppDrawer />
            {React.cloneElement(element, { key: location.pathname })}
          </div>
        </div>
      </AnimatePresence>
    </ConfigProvider>
  );
}

export default Layout;
