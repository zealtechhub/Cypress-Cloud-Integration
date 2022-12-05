import React from "react";
import Button from "antd/lib/button";
import { useForm } from "react-hook-form";
import Input from "antd/lib/input";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { Divider, message } from "antd";
import { AnimatePresence, motion } from "framer-motion";

import BgImage from "../assets/create-account-image.jpg";
import { Icon } from "@iconify/react";
import SelectCountry from "src/components/SelectCountry";
import VerifyOtp from "src/components/VerifyOtp";
import CompleteDetails from "src/components/CompleteDetails";

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

  const [loading, setLoading] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [phone, setPhone] = React.useState<string>("");
  const [phoneError, setPhoneError] = React.useState<boolean>(false);

  const submit = async (e: React.FormEvent) => {
    return navigate("verify-otp");
    // if (loading)
    //   return messageApi.open({
    //     type: "info",
    //     content: "There is a pending request",
    //   });

    // setLoading(true);

    // const send = await fetch("https://node.wizarphics.com/users/sendOtp/", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: {
    //     Accept: "application/json",
    //   },
    //   redirect: "follow",
    // });

    // const response = await send.json();

    // messageApi.open({
    //   type: response.success ? "success" : "error",
    //   content: response.success
    //     ? "Account Created Successfully"
    //     : response.message,
    // });

    // if (response.success) {
    //   setTimeout(() => {
    //     navigate("/sign-in", { replace: true });
    //   }, 3000);
    // } else setLoading(false);
  };

  const location = useLocation();
  const element = useRoutes([
    {
      path: "/",
      element: <div />,
    },
    {
      path: "/verify-otp",
      element: <VerifyOtp {...{ messageApi }} />,
    },
    {
      path: "/complete-details",
      element: <CompleteDetails phone={phone} />,
    },
  ]);

  return (
    <>
      <motion.div
        // initial={{ scale: 0.5 }}
        // animate={{ scale: 1 }}
        exit={{ x: -500, transition: { duration: 1 } }}
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
        className="create-account-wrapper relative h-full"
      >
        {contextHolder}

        <motion.img
          src={BgImage}
          className="image w-full max-h-full sm:h-[400px]"
        />
        <motion.form
          animate
          layoutId="form"
          action=""
          onSubmit={submit}
          className="w-full rounded-tl-2xl absolute bottom-0 rounded-tr-2xl flex flex-col gap-3 py-10 px-6 shadow-2xl bg-[#f6fcff]"
        >
          <div className="form-group">
            <label htmlFor="deliverTo" className="block font-semibold mb-1">
              Phone number
            </label>
            <Input
              size="large"
              className="rounded-lg shadow-lg [&_input]:rounded-tr-lg [&_input]:rounded-br-lg [&_.ant-input-group-addon]:px-0 [&_.ant-input-group-addon]:rounded-tl-lg [&_.ant-input-group-addon]:rounded-bl-lg"
              placeholder="Enter Phone no."
              addonBefore={<SelectCountry {...{ country, setCountry }} />}
              status={phoneError ? "error" : undefined}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <Button
            loading={loading}
            disabled={loading || !phone}
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
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.3, staggerChildren: 0.3 },
            }}
            className="flex gap-3"
          >
            Already have an account ?
            <NavLink to={"/sign-in"} className="inline">
              <motion.span animate className="inline font-semibold">
                Sign In
              </motion.span>
            </NavLink>
          </motion.div> */}
        </motion.form>
      </motion.div>
      <AnimatePresence mode="wait">
        {React.cloneElement(element as React.ReactElement, {
          key: location.pathname,
        })}
      </AnimatePresence>
    </>
  );
}

export default CreateAccount;
