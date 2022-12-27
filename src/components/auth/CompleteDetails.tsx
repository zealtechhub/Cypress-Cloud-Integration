import React from "react";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import { NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Checkbox, Divider, message, notification, Radio, Space } from "antd";
import { Icon } from "@iconify/react";
import Loading from "../Loading";

type FormDataType = {
  name: string;
  email: string;
  phone: string;
  checked: boolean;
};

type Keys = keyof FormDataType;

function CompleteDetails(props: { phone: string }) {
  const { phone } = props;
  const [messageApi, contextHolder] = message.useMessage();
  // created to animate component before detaching
  const [visible, setVisible] = React.useState(true);
  // created for managing request state
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  // formState handle
  const [fields, setFields] = React.useState<FormDataType>({
    name: "",
    email: "",
    checked: false,
    phone,
  });

  const [errors, setErrors] = React.useState<{
    [x in keyof FormDataType]?: boolean;
  }>({});

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(true);
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 3000);
  //   }, 3000);
  // }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) {
      return messageApi.open({
        type: "info",
        content: "There is a pending request",
      });
    }

    setLoading(true);

    // if (!fields.name || !fields.email || !fields.phone) {
    //   (Object.keys(fields) as [Keys]).forEach((key, i) => {
    //     if (!fields[key]) {
    //       setErrors((errors) => ({ ...errors, [key]: true }));
    //     }
    //   });

    //   setLoading(false);

    //   messageApi.open({
    //     type: "error",
    //     content: "All Fields Required",
    //     className: "rounded-lg items-center",
    //   });

    //   return;
    // }

    // const send = await fetch("https://node.wizarphics.com/users/create/", {
    //   method: "POST",
    //   body: JSON.stringify(fields),
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
    //   style: {
    //     borderRadius: "20px",
    //   },
    // });

    // if (response.success) {
    //   setTimeout(() => {
    //     navigate("/sign-in", { replace: true });
    //   }, 3000);
    // } else setLoading(false);

    messageApi.open({
      type: "success",
      content: "All Fields Required",
      className: "!rounded-lg !items-center ",
    });

    notification.info({
      message: "You have a new notification",
      placement: "bottomRight",
      className: "border-4 border-secondary/50 !rounded-lg",
    });

    setTimeout(() => {
      sessionStorage.setItem("user", JSON.stringify(fields));
      navigate("/", { replace: true });
    }, 1000);
  };

  return (
    <div className="absolute top-0 h-full w-full overflow-hidden">
      {contextHolder}
      <AnimatePresence>
        {loading && <Loading text="Creating Account..."/>}
      </AnimatePresence>
      <AnimatePresence onExitComplete={() => navigate(-1)}>
        {visible && (
          <motion.form
            animate={{ x: 0 }}
            initial={{ x: 500 }}
            exit={{ position: "absolute", left: "100%" }}
            transition={{ type: "just" }}
            onSubmit={submit}
            className="p-4 h-full w-full top-0 left-0 bg-white"
          >
            <div className="flex items-center gap-x-3">
              <Button
                shape="circle"
                className=" !grid !place-items-center"
                onClick={() => setVisible(false)}
                icon={
                  <Icon
                    icon={"material-symbols:arrow-back-ios-rounded"}
                    height={16}
                    className="inline-block ml-1"
                    color="inherit"
                  />
                }
              />
              <div className="title font-bold text-xl">Complete Details</div>
            </div>
            <Divider style={{ marginBlock: 10 }}/>
            <div className="form-group mb-2">
              <label htmlFor="deliverTo" className="block font-semibold mb-1">
                Name
              </label>
              <Input
                placeholder="Enter your name"
                size="large"
                className="!rounded-lg shadow-sm"
                status={errors.name ? "error" : undefined}
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
                onChange={(e) =>
                  setFields({ ...fields, email: e.target.value })
                }
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
                  loading={loading}
                  disabled={!fields.checked || !fields.name || !fields.email}
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="!rounded-lg !h-auto !py-3 disabled:!bg-secondary/30 !font-bold !text-gray-600 shadow-lg w-full !bg-[rgba(250,221,60,1)]  !border-none"
                >
                  Complete Account
                </Button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CompleteDetails;
