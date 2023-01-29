import React from "react";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import { NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Checkbox, Divider, message, notification, Radio, Space } from "antd";
import { Icon } from "@iconify/react";
import Loading from "../Loading";
import SlideTransition from "src/components/animations/SlideTransition";
import GoBack from "src/components/GoBack";
import useFetch from "src/hooks/useFetch";
import { PatternFormat } from "react-number-format";
import { Country } from "src/pages/Auth";
import { useAppDispatch } from "src/lib/redux/store";
import { USER } from "src/lib/redux/userSlice";

export type FormDataType = {
  name: string;
  email: string;
  phone: string;
  checked: boolean;
  password: string;
};

type Keys = keyof FormDataType;

function CompleteDetails(props: { phone: string; country: Country }) {
  const { phone, country } = props;
  const navigate = useNavigate();
  const [unMount, setUnMount] = React.useState(false);
  const { fetching, create } = useFetch();
  const dispatch = useAppDispatch();

  // formState handle
  const [fields, setFields] = React.useState<FormDataType>({
    name: "",
    email: "",
    checked: false,
    phone,
    password: "",
  });

  const [errors, setErrors] = React.useState<{
    [x in keyof FormDataType]?: boolean;
  }>({});

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (fetching) {
      return message.error("There is an active fetch session");
    }

    if (Object.values(fields).some((v) => !v)) {
      (Object.keys(fields) as [Keys]).forEach((key, i) => {
        if (!fields[key]) {
          setErrors((errors) => ({ ...errors, [key]: true }));
        }
      });

      return message.error("All Fields Required");
    }

    const { success, error, feedback } = await create(fields);

    if (!error) message[success ? "success" : "error"](feedback);

    if (!success) return;
    notification.info({
      message: "You have a new notification",
      placement: "bottomRight",
      className: "ring-2 ring-secondary/30 !rounded-lg",
    });

    dispatch(
      USER({
        name: fields.name,
        email: fields.email,
        phone: fields.phone,
        verified: true,
        gender: null,
      })
    );
    navigate("/", { replace: true });
  };

  return (
    <SlideTransition unMount={unMount}>
      <AnimatePresence>
        {fetching && <Loading text="Creating Account" />}
      </AnimatePresence>
      <div className="flex items-center gap-x-3">
        <GoBack setUnMount={setUnMount} />
        <div className="title font-bold text-xl">Complete Details</div>
      </div>
      <Divider style={{ marginBlock: 10 }} />
      <form
        onSubmit={submit}
        className="py-4 flex flex-col gap-y-4 h-full w-full top-0 left-0 bg-white"
      >
        <div className="form-group mb-2">
          <label htmlFor="deliverTo" className="block font-semibold mb-1">
            Name
          </label>
          <Input
            placeholder="Enter your name"
            size="large"
            className="!rounded-lg shadow-sm"
            status={errors.name ? "error" : undefined}
            value={fields.name}
            onChange={(e) => setFields({ ...fields, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deliverTo" className="block font-semibold mb-1">
            Email Address
          </label>
          <Input
            placeholder="Enter your Email"
            size="large"
            className="!rounded-lg shadow-sm"
            status={errors.email ? "error" : undefined}
            value={fields.email}
            onChange={(e) => setFields({ ...fields, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deliverTo" className="block font-semibold mb-1">
            Phone number
          </label>
          <div className="form-control ring ring-gray-100 flex bg-gray-200 shadow-sm rounded-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={country.dial_code}
                initial={{ y: -30 }}
                animate={{ y: 0 }}
                exit={{ y: 30, opacity: 0, transition: { duration: 0.1 } }}
                className="cursor-pointer border-r-2 border- p-3 gap-x-2 flex items-center justify-center"
              >
                <img
                  alt="user country flag"
                  src={"/flags/" + country.code + ".png"}
                  className="h-5 w-6 rounded-lg shadow-2xl ring-4 ring-secondary/50"
                />
                <span className="font-bold">{country.dial_code}</span>
              </motion.div>
            </AnimatePresence>

            <PatternFormat
              className="rounded-r-lg disabled:!bg-white p-3 flex-grow outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
              placeholder="Enter Phone no."
              disabled
              value={phone}
              format="#### ### ####"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password" className="block font-semibold mb-1">
            Password
          </label>
          <Input.Password
            size="large"
            id="password"
            className="shadow-sm"
            status={errors.password ? "error" : undefined}
            placeholder="Create your password"
            value={fields.password}
            onChange={(e) => setFields({ ...fields, password: e.target.value })}
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <div className="wrap button-group flex flex-col gap-y-3 w-full justify-center p-3">
            <div className="form-group">
              <Space>
                <Checkbox
                  onChange={(e) =>
                    setFields({ ...fields, checked: e.target.checked })
                  }
                />
                <span>
                  I agree to Reech’s{" "}
                  <b className="text-primary">Terms and Policy</b>
                </span>
              </Space>
            </div>
            <Button
              loading={fetching}
              disabled={Object.values(fields).some((v) => !v)}
              type="primary"
              htmlType="submit"
              size="large"
              className="!rounded-lg !h-auto !py-3 disabled:!bg-secondary/30 !font-bold !text-gray-600 shadow-lg w-full !bg-[rgba(250,221,60,1)]  !border-none"
            >
              Complete Account
            </Button>
          </div>
        </div>
      </form>
    </SlideTransition>
  );
}

export default CompleteDetails;
