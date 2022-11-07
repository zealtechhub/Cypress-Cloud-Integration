import React from "react";
import Button from "antd/lib/button";
import { useForm } from "react-hook-form";
import Input from "antd/lib/input";
import { NavLink } from "react-router-dom";

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
    <div className="sign-in-wrapper p-3">
      <form
        action=""
        onSubmit={handleSubmit(submit)}
        className="w-[360px] max-w-[90%] mx-auto flex flex-col gap-3 px-6 py-10 my-5 bg-white shadow-xl"
      >
        <div className="form-label font-extrabold text-2xl text-center">
          Sign up for Courier Service
        </div>
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
        <div className="flex gap-3">
          Already have an account ?
          <NavLink to={"/sign-in"} className="inline">
            <span className="inline font-semibold">Sign in</span>
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default Register;
