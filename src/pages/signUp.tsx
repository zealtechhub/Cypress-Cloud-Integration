import React from "react";
import Button from "antd/lib/button";
import { useForm } from "react-hook-form";
import Input from "antd/lib/input";
import { NavLink } from "react-router-dom";
import { Divider } from "antd";
import { motion } from "framer-motion";

function Register() {
  const { handleSubmit, setValue } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const submit = (data: object) => {
    console.log({ data });
  };

  return (
    <motion.div
      // initial={{ scale: 0.5 }}
      // animate={{ scale: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
      className="sign-up-wrapper"
    >
      <Divider dashed style={{ margin: 0 }}>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="form-label font-semibold text-sm"
        >
          Sign up for Courier Service
        </motion.div>
      </Divider>
      <motion.form
        animate
        layoutId="form"
        action=""
        onSubmit={handleSubmit(submit)}
        className="w-[95%] rounded-2xl mx-auto flex flex-col gap-3 py-10 px-6 my-5 shadow-xl bg-[#f6fcff]"
      >
        <div className="form-group">
          <label htmlFor="deliverTo" className="block font-semibold mb-1">
            Name
          </label>
          <Input
            placeholder="Enter your name"
            defaultValue={100}
            size="large"
            onChange={(e) => setValue("name", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deliverTo" className="block font-semibold mb-1">
            Phone number
          </label>
          <Input
            placeholder="Enter Phone no. or Email"
            addonBefore={"+234"}
            defaultValue={100}
            size="large"
            onChange={(e) => setValue("phone", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deliverTo" className="block font-semibold mb-1">
            Email Address
          </label>
          <Input
            placeholder="Enter your Email"
            defaultValue={100}
            size="large"
            onChange={(e) => setValue("email", e.target.value)}
          />
        </div>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="mt-4 !rounded-lg !py-2 !h-auto !font-bold"
        >
          Sign up
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
          Already have an account ?
          <NavLink to={"/sign-in"} className="inline">
            <motion.span animate className="inline font-semibold">
              Sign In
            </motion.span>
          </NavLink>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}

export default Register;
