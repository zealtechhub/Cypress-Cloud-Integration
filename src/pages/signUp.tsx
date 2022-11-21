import React from "react";
import Button from "antd/lib/button";
import { useForm } from "react-hook-form";
import Input from "antd/lib/input";
import { NavLink } from "react-router-dom";
import { Divider, message } from "antd";
import { motion } from "framer-motion";

type FormDataType = {
  name: string;
  email: string;
  phone: string;
};

type Keys = keyof FormDataType;

function Register() {
  const controller = new AbortController();
  const [loading, setLoading] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const {
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const submit = async (data: FormDataType) => {
    console.log({ data });
    if (loading)
      return messageApi.open({
        type: "info",
        content: "There is a pending request",
      });

    setLoading(true);

    if (!data.name || !data.email || !data.phone) {
      (Object.keys(data) as [Keys]).forEach((key, i) => {
        if (!data[key]) {
          setError(key, { message: "Field is required" });
        }
      });

      setLoading(false);

      messageApi.open({
        type: "error",
        content: "All Fields Required",
      });

      return;
    }

    const send = await fetch("https://node.wizarphics.com/users/create/", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        token: 123456,
        token_expired: 10,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });

    const response = await send.json();
    console.log({ response });
    setLoading(false);
  };

  React.useEffect(() => {
    return () => controller.abort();
  }, []);

  return (
    <>
      {contextHolder}
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
              size="large"
              status={errors.name ? "error" : undefined}
              onChange={(e) => setValue("name", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="deliverTo" className="block font-semibold mb-1">
              Phone number
            </label>
            <Input
              placeholder="Enter Phone no."
              addonBefore={"+234"}
              size="large"
              status={errors.phone ? "error" : undefined}
              onChange={(e) => setValue("phone", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="deliverTo" className="block font-semibold mb-1">
              Email Address
            </label>
            <Input
              placeholder="Enter your Email"
              size="large"
              status={errors.email ? "error" : undefined}
              onChange={(e) => setValue("email", e.target.value)}
            />
          </div>
          <Button
            loading={loading}
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
    </>
  );
}

export default Register;
