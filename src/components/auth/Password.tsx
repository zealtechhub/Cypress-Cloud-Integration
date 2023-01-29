import SlideTransition from "src/components/animations/SlideTransition";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "src/components/Loading";
import GoBack from "src/components/GoBack";
import { USER } from "src/lib/redux/userSlice";
import { Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/lib/redux/store";
import Button from "antd/lib/button";
import JQuery from "jquery";
import useFetch from "src/hooks/useFetch";

function Password({ phone }: { phone: string }) {
  const [unMount, setUnMount] = React.useState(false);
  const { fetching, sign } = useFetch();
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { user, error } = await sign({ phone, password });

    if (error) return;

    if (!user) return message.error("Incorrect Password");

    // * save user to store
    dispatch(USER(user));

    // * if user is found but the number is not verified, the user has to verify his number.
    if (!user.verified) return navigate("verify-otp");

    // * user passed the two checked face and signed in.
    navigate("/", { replace: true });
  };

  return (
    <SlideTransition {...{ unMount }}>
      <AnimatePresence>
        {fetching && <Loading text={"Authenticating"} />}
      </AnimatePresence>
      <div className="head flex gap-x-3 items-center mb-3">
        <GoBack {...{ setUnMount }} />
        <span className="title font-bold text-lg">Password</span>
      </div>
      <hr className="my-3" />
      <form action="#" onSubmit={submit}>
        <div className="form-group">
          <Input.Password
            size="large"
            className="shadow-lg py-3"
            placeholder="Enter your password"
            autoFocus
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div className=" mt-4 form-group flex justify-end">
          <Button size="small" type="ghost" className="text-lg font-semibold">
            Forgot Password ?
          </Button>
        </div>
        {!unMount && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            exit={{ y: 50, opacity: 0 }}
            className="actions fixed sm:absolute bottom-0 left-0 w-full bg-inherit p-4"
          >
            <Button
              type="ghost"
              htmlType="submit"
              size="large"
              className="!bg-secondary !text-black !w-full !rounded-lg !py-2 !h-auto !font-bold"
            >
              Sign in
            </Button>
          </motion.div>
        )}
      </form>
    </SlideTransition>
  );
}

export default Password;
