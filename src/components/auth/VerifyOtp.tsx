import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";
import Loading from "../Loading";
import { Button, message } from "antd";
import { MessageInstance } from "antd/es/message/interface";

function VerifyOtp({ messageApi }: { messageApi: MessageInstance }) {
  const [visible, setVisible] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [otp, setOtp] = React.useState<{ [x: number]: string }>({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
  });
  const navigate = useNavigate();

  const verify = React.useCallback(() => {
    setLoading(true);

    messageApi.open({
      type: "success",
      content: "Otp Verified Successfully",
      style: {
        borderRadius: "20px",
      },
    });

    setTimeout(() => {
      navigate("/create-account/complete-details", { replace: true });
    }, 3000);
  }, [messageApi, navigate]);

  const updateOtp = (index: number, val: string, paste = false) => {
    const otpTextArray = Object.values(otp);
    let selected = window.getSelection()?.toString();

    let otpString = otpTextArray.join("");
    let textBefore = !selected ? otpString.substring(0, index + 1) : "";
    let textAfter = otpString.slice(index + 1);
    let textToInsert = val.slice(!paste ? 1 : 0);

    let newOtp = (textBefore + textToInsert + textAfter).slice(0, 5);
    setOtp({
      1: newOtp[0] ?? "",
      2: newOtp[1] ?? "",
      3: newOtp[2] ?? "",
      4: newOtp[3] ?? "",
      5: newOtp[4] ?? "",
    });
  };

  React.useEffect(() => {
    let otpTextCompleted = Object.values(otp).every((o) => o);
    if (otpTextCompleted) verify();
  }, [otp, verify]);

  return (
    <div className="absolute top-0 h-full w-full overflow-hidden">
      <AnimatePresence>
        {loading && <Loading text={"Verifying Otp..."} />}
      </AnimatePresence>
      <AnimatePresence onExitComplete={() => navigate(-1)}>
        {visible && (
          <motion.div
            animate={{ x: 0 }}
            initial={{ x: 500 }}
            exit={{ position: "absolute", left: "100%" }}
            transition={{ type: "just" }}
            className="h-full w-full top-0 left-0 bg-white p-4"
          >
            <Button
              shape="circle"
              className="mb-5 !grid !place-items-center"
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
            <div className="text-sm font-semibold">
              Enter the 5 digit activation code sent to your phone number below
              for verification.
            </div>

            <div className="form-group flex gap-x-4 w-[350px] max-w-full mx-auto my-5">
              {Array.from(new Array(5)).map((_, index) => {
                return (
                  <div className="form-control flex-grow">
                    <input
                      type="text"
                      className={inputBoxClass}
                      value={otp[index + 1]}
                      onKeyDown={(e) => {
                        if (
                          !Number(e.key) &&
                          !["0", "Backspace"].includes(e.key) &&
                          !e.ctrlKey
                        ) {
                          return e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        let val = e.target.value;

                        let otpTextCompleted = Object.values(otp).every(
                          (o) => o
                        );

                        if (val.length > 1 && !otpTextCompleted) {
                          return updateOtp(index, val);
                        }

                        // this checks if all textbox holds a value and the user is increasing the length of a textbox (val length), if so it will return; else (that is: user press backspace) so it setOtp value
                        if (otpTextCompleted && val) return;
                        setOtp({ ...otp, [index + 1]: e.target.value });
                      }}
                      onPasteCapture={(e) => {
                        let pastedData = e.clipboardData.getData("Text");
                        let formatted = pastedData.replaceAll(/\D/g, "");

                        updateOtp(index, formatted, true);
                        e.preventDefault();
                      }}
                      maxLength={2}
                    />
                  </div>
                );
              })}
            </div>

            <Timer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Timer: React.FC = () => {
  const [time, setTime] = React.useState(60);

  React.useEffect(() => {
    if (time) {
      let timeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [time]);

  const resendOtp = () => {
    if (time)
      return message.error(
        "Please wait for 1 minutes before clicking the resend"
      );
  };

  return (
    <div className="text-semibold mt-10 text-center">
      Didn’t receive the code?{" "}
      <b className="text-sky-300 cursor-pointer" onClick={resendOtp}>
        Resend Code (0:{time})
      </b>
    </div>
  );
};

const inputBoxClass =
  "w-full text-center font-extrabold text-2xl py-5 h-18 border-2 border-gray-300 focus:shadow-xl focus:border-secondary outline-none rounded-lg shadow-lg";

export default VerifyOtp;
