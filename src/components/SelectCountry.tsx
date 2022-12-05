import React from "react";
import { Dropdown, Space } from "antd";
import { motion } from "framer-motion";
import { Country } from "src/pages/CreateAccount";
import countries from "../lib/countries";
import { nanoid } from "@reduxjs/toolkit";

type Props = {
  country: Country;
  setCountry: React.Dispatch<Country>;
};

function SelectCountry(props: Props) {
  const { country, setCountry } = props;
  const [open, setOpen] = React.useState(false);

  const CountryComponent = (
    <div className="country">
      {countries.map((_country) => (
        <div
          className={
            "py-2 px-6 border-b-[thin] border-gray-500/20 hover:bg-secondary/20 cursor-pointer" +
            (country.code === _country.code ? " bg-secondary/80" : "")
          }
          onClickCapture={() => {
            setOpen(false);
            setCountry(_country);
          }}
          key={_country.name}
        >
          <Space>
            <motion.img
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              src={"/flags/" + _country.code + ".png"}
              className="h-4 w-4 rounded-xl ring-4 ring-secondary shadow-lg"
            />
            <span className="font-medium">
              {_country.name} ({_country.dial_code})
            </span>
          </Space>
        </div>
      ))}
    </div>
  );

  return (
    <Dropdown
      open={open}
      onOpenChange={() => setOpen(!open)}
      overlayClassName="h-[300px] overflow-auto bg-white shadow-lg rounded-lg"
      trigger={["click"]}
      overlay={CountryComponent}
    >
      <motion.div
        key={nanoid()}
        initial={{ y: -30 }}
        animate={{ y: 0 }}
        className="min-w-[90px] cursor-pointer px-3 flex items-center justify-center"
      >
        <motion.img
          animate={{ x: -10 }}
          src={"/flags/" + country.code + ".png"}
          className="h-5 w-6 rounded-lg shadow-2xl ring-4 ring-secondary/50"
        />
        <span className="font-bold">{country.dial_code}</span>
      </motion.div>
    </Dropdown>
  );
}

export default SelectCountry;
