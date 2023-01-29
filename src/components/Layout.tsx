import React from "react";
import { useLocation, useRoutes } from "react-router";
import { ConfigProvider } from "antd";

import { AnimatePresence } from "framer-motion";

// Pages
import Home from "src/pages/Home";
import Auth from "src/pages/Auth";
import ProtectedRoute from "src/components/ProtectedRoute";
import MediaControl from "./MediaControl";
import { useAppSelector } from "src/lib/redux/store";

function Layout() {
  const user = useAppSelector((state) => state.sessionStore.user);
  const element = useRoutes([
    {
      path: "auth/*",
      element: <Auth />,
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
          <div className="app-wrapper w-screen sm:w-[430px] h-full sm:h-[650px] max-w-[100vw] form-container bg-white sm:rounded-2xl shadow-lg overflow-hidden relative">
            {React.cloneElement(element, { key: location.pathname })}
          </div>
        </div>
      </AnimatePresence>
      <MediaControl />
    </ConfigProvider>
  );
}

export default Layout;
