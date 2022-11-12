import React from "react";
import Button from "antd/lib/button";
import { useForm } from "react-hook-form";
import { InputNumber, Divider } from "antd";
import Input from "antd/lib/input";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  const { handleSubmit, setValue } = useForm({
    defaultValues: {
      phone_email: "",
      token: "",
    },
  });

  const submit = (data: object) => {
    console.log({ data });
  };

  const sendToken = () => {};

  return (
    <div className="sign-in-wrapper">
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
        onSubmit={handleSubmit(submit)}
        className="w-[95%] rounded-2xl mx-auto flex flex-col gap-3 py-10 px-6 my-5 shadow-xl bg-[#f6fcff]"
      >
        <div className="form-group">
          <label htmlFor="deliverTo" className="block font-semibold mb-1">
            Phone number
          </label>
          <Input
            placeholder="Enter Phone no. or Email"
            addonBefore={"+234"}
            addonAfter={
              <Button type="primary" size="small" disabled onClick={sendToken}>
                Get Token
              </Button>
            }
            size="large"
            defaultValue={100}
            onChange={(e) => setValue("phone_email", e.target.value)}
          />
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
        >
          Sign in
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
            <motion.span className="inline font-semibold">Sign up</motion.span>
          </NavLink>
        </motion.div>
      </motion.form>
    </div>
  );
}

export default Login;
