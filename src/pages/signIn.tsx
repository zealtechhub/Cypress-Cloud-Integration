import React from "react";
import Button from "antd/lib/button";
import { useForm } from "react-hook-form";
import { InputNumber } from "antd";
import Input from "antd/lib/input";
import { NavLink } from "react-router-dom";

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
    <div className="sign-in-wrapper p-3">
      <form
        action=""
        onSubmit={handleSubmit(submit)}
        className="w-[360px] max-w-[90%] mx-auto flex flex-col gap-3 px-6 py-10 my-5 bg-white shadow-xl"
      >
        <div className="form-label font-extrabold text-2xl text-center">
          Sign in to Courier Services
        </div>
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
        <div className="flex gap-3">
          Don't have an account ?
          <NavLink to={"/sign-up"} className="inline">
            <span className="inline font-semibold">Sign up</span>
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default Login;
