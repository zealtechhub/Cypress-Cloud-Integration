import React from "react";
import Button from "antd/lib/button";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { Divider } from "antd";
import { AnimatePresence, motion } from "framer-motion";

import BgImage from "../assets/create-account-image.jpg";
import { Icon } from "@iconify/react";
import SelectCountry, {
  SelectCountryModalRefObject,
} from "src/components/auth/SelectCountryModal";
import VerifyOtp from "src/components/auth/VerifyOtp";
import CompleteDetails from "src/components/auth/CompleteDetails";
import FadeTransition from "src/components/animations/FadeTransition";
import { PatternFormat } from "react-number-format";
import Loading from "src/components/Loading";
import Password from "src/components/auth/Password";
import useFetch from "src/hooks/useFetch";

type FormDataType = {
  Name: string;
  email: string;
  Phone_num: string;
};

export type Country = {
  code: string;
  dial_code: string;
  name?: string;
};

type Keys = keyof FormDataType;

function CreateAccount() {
  // const controller = new AbortController();
  const [country, setCountry] = React.useState<Country>({
    code: "NG",
    dial_code: "+234",
  });

  const { fetching, userRegistered, sendCode } = useFetch();
  const navigate = useNavigate();
  const [phone, setPhone] = React.useState<string>(
    sessionStorage.getItem("phone") as string
  );
  const [phoneError, setPhoneError] = React.useState<boolean>(false);

  const selectCountryRef = React.useRef<SelectCountryModalRefObject>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    // * response should have object {isRegistered: true}
    const isRegistered = await userRegistered(phone);

    // * redirect to verifyPage if no user is found with the number
    // * if no user is found that means the user wants to create and the number provided needs to be verified.

    sessionStorage.setItem("phone", phone);
    if (!isRegistered) {
      // let userPhone = (
      //   country.dial_code + (phone[0] === "0" ? phone.slice(1) : phone)
      // ).replaceAll(" ", "");

      // const { success, message, error } = await sendCode(userPhone);
      // console.log({ success, message, error });
      return navigate("verify-otp");
    }

    // * user has already registered and needs to enter his/her password to gain access

    navigate("password");
  };

  const location = useLocation();
  const element = useRoutes([
    {
      path: "/",
      element: <div />,
    },
    {
      path: "/verify-otp",
      element: <VerifyOtp />,
    },
    {
      path: "/password",
      element: <Password phone={phone} />,
    },
    {
      path: "/complete-details",
      element: <CompleteDetails {...{ phone, country }} />,
    },
  ]) ?? <></>;

  return (
    <>
      <FadeTransition>
        <div className="auth-wrapper relative h-full">
          {fetching && <Loading text="Checking Number Validation" />}
          <SelectCountry ref={selectCountryRef} setCountry={setCountry} />
          <motion.img
            src={BgImage}
            className="image w-full max-h-full sm:h-[400px]"
          />
          <motion.form
            animate
            layoutId="form"
            action=""
            onSubmit={submit}
            className="w-full rounded-tl-2xl fixed sm:absolute bottom-0 rounded-tr-2xl flex flex-col gap-3 py-10 px-6 shadow-2xl bg-[#f6fcff]"
          >
            <div className="form-group">
              <label htmlFor="deliverTo" className="block font-semibold mb-1">
                Phone number
              </label>
              <div className="form-control flex bg-gray-200 shadow-lg rounded-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={country.dial_code}
                    initial={{ y: -30 }}
                    animate={{ y: 0 }}
                    exit={{ y: 30, opacity: 0, transition: { duration: 0.1 } }}
                    onClick={() => selectCountryRef.current?.openModal(country)}
                    className="select-toggler cursor-pointer p-3 gap-x-2 flex items-center justify-center"
                  >
                    <motion.img
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1, transition: { delay: 0.4 } }}
                      src={"/flags/" + country.code + ".png"}
                      className="h-5 w-6 rounded-lg shadow-2xl ring-4 ring-secondary/50"
                    />
                    <span className="font-bold">{country.dial_code}</span>
                  </motion.div>
                </AnimatePresence>
                <PatternFormat
                  className="rounded-r-lg p-3 flex-grow outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                  placeholder="Enter Phone no."
                  value={phone}
                  format="#### ### ####"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
            </div>
            <Button
              loading={fetching}
              disabled={fetching || !phone}
              type="primary"
              htmlType="submit"
              size="large"
              className="mt-2 hover:scale-[1.01] hover:shadow-lg active:scale-95 !bg-secondary disabled:!bg-secondary/30 !border-none !rounded-lg !py-2 !h-auto !font-bold"
            >
              Continue
            </Button>
            <Divider style={{ marginBlock: 10 }}>
              <span className="font-bold">OR</span>
            </Divider>
            <div
              className="google transition-[box-shadow] bg-gray-200 rounded-lg flex gap-x-2 items-center justify-center p-3 cursor-pointer hover:shadow-xl"
              onClick={() => navigate("complete-details")}
            >
              <Icon icon={"logos:google-icon"} />
              <span className="font-bold">Continue With Google</span>
            </div>
            <div className="note text-xs font-semibold my-4 text-center">
              If you are creating a new account, Terms & Conditions and Privacy
              policy apllies
            </div>
          </motion.form>
        </div>
      </FadeTransition>
      <AnimatePresence mode="wait">
        {React.cloneElement(element as React.ReactElement, {
          key: location.pathname,
        })}
      </AnimatePresence>
    </>
  );
}

export default CreateAccount;
