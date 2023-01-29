import React from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter } from "react-router-dom";
import store from "src/lib/redux/store";
import { Provider } from "react-redux";
import Auth from "src/pages/Auth";

function Wrapper(props: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <div className="app-container grid h-screen overflow-hidden place-items-center">
            <div className="app-wrapper w-screen sm:w-[430px] h-full sm:h-[650px] max-w-[100vw] form-container bg-white sm:rounded-2xl shadow-lg overflow-hidden relative">
              {props.children}
            </div>
          </div>
        </AnimatePresence>
      </BrowserRouter>
    </Provider>
  );
}

export default Wrapper;
