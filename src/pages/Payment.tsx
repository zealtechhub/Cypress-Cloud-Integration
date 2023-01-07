import React from "react";
import GoBack from "@comps/GoBack";
import SlideTransition from "@comps/animations/SlideTransition";
import { Input, Select } from "antd";

function Payment() {
  const [unMount, setUnMount] = React.useState(false);
  return (
    <SlideTransition unMount={unMount}>
      <div className="flex gap-x-3 items-center">
        <GoBack setUnMount={setUnMount} />
        <div className="page-title font-bold text-lg"> Payment — Secured </div>
      </div>
      <hr className="my-4" />
      <main className="my-5">
        <form action="#" className="payment-form">
          <div className="form-group mb-5">
            <label
              htmlFor="payment-method"
              className="block font-semibold text-sm mb-2"
            >
              Payment Method
            </label>
            <Select
              size="large"
              className="w-full"
              defaultValue={{
                label: "Paystack",
                value: "paystack",
              }}
              options={[
                {
                  label: "Paystack",
                  value: "paystack",
                },
                {
                  label: "Cryptocurrency",
                  value: "crypto",
                },
                {
                  label: "Master Card",
                  value: "card",
                },
              ]}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="card-no"
              className="block font-semibold text-sm mb-2"
            >
              Card Number
            </label>
            <Input
              size="large"
              placeholder="Enter valid card number"
              className="w-full rounded-lg shadow-sm"
            />
          </div>
        </form>
      </main>
    </SlideTransition>
  );
}

export default Payment;
