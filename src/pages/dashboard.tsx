import React from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "../components/dashboard/Map";
import { Drawer, Input } from "antd";
import { motion } from 'framer-motion';
import { Car, Truck } from "../components/SVG";
import InitialInfo from "../components/dashboard/InitialInfo";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const render = (status: Status) => {
  console.log({ status })
  return (
    <div className="grid h-[400px] place-items-center">
      <h1>{status}</h1>
    </div>
  )
};

function Dashboard() {
  return (
    <div className={"wrapper"}>
      <Wrapper apiKey={GOOGLE_API_KEY} render={render}>
        <Map style={{ height: 900 }}></Map>
      </Wrapper>
      <InitialInfo/>
    </div>
  );
}

export default Dashboard;