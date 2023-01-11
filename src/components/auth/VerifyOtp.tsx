import React from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import Loading from "../Loading";
import SlideTransition from "@comps/animations/SlideTransition";
import GoBack from "@comps/GoBack";
import { message } from "antd";

function VerifyOtp() {
  const [unMount, setUnMount] = React.useState(false);
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
    message.success("Otp Verified Successfully");

    setTimeout(() => {
      setLoading(false);
      navigate("/auth/complete-details", { replace: true });
    }, 3000);
  }, [navigate]);

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
    setTimeout(() => {
      setOtp({
        1: String(Math.floor(Math.random() * 10)),
        2: String(Math.floor(Math.random() * 10)),
        3: String(Math.floor(Math.random() * 10)),
        4: String(Math.floor(Math.random() * 10)),
        5: String(Math.floor(Math.random() * 10)),
      });
    }, 500);
  }, []);

  React.useEffect(() => {
    let otpTextCompleted = Object.values(otp).every((o) => o);
    if (otpTextCompleted) verify();
  }, [otp, verify]);

  return (
    <SlideTransition unMount={unMount}>
      <AnimatePresence>
        {loading && <Loading text={"Verifying Otp..."} />}
      </AnimatePresence>
      <div className="head flex gap-x-3 items-center mb-5">
        <GoBack setUnMount={setUnMount} />
        <span className="title font-bold text-lg">Verify Number</span>
      </div>
      <hr className="my-2" />
      <div className="text-sm font-semibold">
        Enter the 5 digit activation code has been sent to the provided number
        for verification.
      </div>

      <div className="form-group flex gap-x-4 w-[350px] max-w-full mx-auto my-5">
        {Array.from(new Array(5)).map((_, index) => {
          return (
            <div className="form-control flex-grow" key={index}>
              <input
                title="code box"
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

                  let otpTextCompleted = Object.values(otp).every((o) => o);

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
    </SlideTransition>
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
