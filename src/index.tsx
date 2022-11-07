import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./lib/redux/store";
import { Provider } from "react-redux";

// Stylesheets
import "./index.css";
import "antd/dist/antd.min.css";

// Pages
import Dashboard from "./pages/dashboard";
import Login from "./pages/signIn";
import Register from "./pages/signUp";
import Profile from "./pages/profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/sign-in",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
