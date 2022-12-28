import React from "react";
import Button from "antd/lib/button";
import { useForm } from "react-hook-form";
import { InputNumber, Divider, message } from "antd";
import Input from "antd/lib/input";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppDispatch } from "@lib/redux/store";
import { USER } from "@lib/redux/userSlice";

type SignFormData = {
  phone_email: string;
  token: string;
};

function Login() {
  const [tokenSent, setTokenSent] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { setValue, getValues } = useForm<SignFormData>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const sendToken = async () => {
    const sendToken = await fetch(`https://node.wizarphics.com/sendToken`, {
      method: "Post",
      body: JSON.stringify(getValues()),
      redirect: "follow",
    });

    const response = await sendToken.json();
    if (!response.success)
      messageApi.error("Error while sending token, Please try again");

    // set sent token to true
    setTokenSent(() => true);

    messageApi.success("A Sign Token has been sent to your provided number");
  };

  const verifyToken = async () => {
    const sendToken = await fetch(`https://node.wizarphics.com/sendToken`, {
      method: "Post",
      body: JSON.stringify({ user: "", token: 232232 }),
      redirect: "follow",
    });

    const response = await sendToken.json();
    if (!response.success) messageApi.error("Invalid Token");

    dispatch(USER(response.user));
    navigate("/dashboard", { replace: true });
  };

  return (
    <>
      {contextHolder}
      <div className="sign-in-wrapper">
        <Link to="/">
          <div className="form-label font-[1000] text-purple-900 text-2xl text-center">
            Courier
          </div>
        </Link>
        <Divider dashed style={{ margin: 0 }}>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="form-label font-semibold text-sm"
          >
            Sign in to Courier Services
          </motion.div>
        </Divider>
        <motion.form
          layoutId="form"
          animate
          // initial={{ x: 100 }}
          // animate={{ x: 0, transition: { duration: 2 } }}
          action=""
          className="w-[95%] rounded-2xl mx-auto flex flex-col gap-3 py-10 px-6 my-5 shadow-xl bg-[#f6fcff]"
        >
          <div className="form-group">
            <label htmlFor="deliverTo" className="block font-semibold mb-1">
              Phone number
            </label>
            <div className="flex justify-end flex-col gap-3">
              <Input
                placeholder="Enter Phone no. or Email"
                addonBefore={"+234"}
                size="large"
                defaultValue={100}
                onChange={(e) => setValue("phone_email", e.target.value)}
              />
              <Button
                type="primary"
                size="small"
                disabled={!tokenSent}
                className="rounded-lg w-max"
                onClick={sendToken}
              >
                Get Token
              </Button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="deliverTo" className="block font-semibold mb-1">
              Token
            </label>
            <InputNumber
              placeholder="Enter token sent to you"
              className="w-full"
              size="large"
              style={{ width: "100%" }}
              onChange={(token) => setValue("token", token as string)}
            />
          </div>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="mt-4 !rounded-lg !py-2 !h-auto !font-bold"
            onClick={verifyToken}
          >
            Verify
          </Button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.3, staggerChildren: 0.3 },
            }}
            className="flex gap-3"
          >
            Don't have an account ?
            <NavLink to={"/sign-up"} className="inline">
              <motion.span className="inline font-semibold">
                Sign up
              </motion.span>
            </NavLink>
          </motion.div>
        </motion.form>
      </div>
    </>
  );
}

export default Login;
