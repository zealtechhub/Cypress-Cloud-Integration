import { Modal, Select } from "antd";
import Button from "antd/lib/button";
import { PlaceResult } from "google.maps";
import React from "react";
import Autocomplete from "react-google-autocomplete";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

function Dashboard() {
  const { handleSubmit, setValue, watch, getValues } = useForm<{
    pickup: PlaceResult;
    deliverTo: PlaceResult;
    weightCharge: number;
    distance: number;
  }>({
    defaultValues: {
      pickup: {},
      deliverTo: {},
      weightCharge: 1,
    },
  });

  const { distance, weightCharge } = watch();
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const submit = (data: { pickup: PlaceResult; deliverTo: PlaceResult }) => {
    const pickupCoordinates = {
      lat: data.pickup.geometry?.location?.lat() as number,
      lng: data.pickup.geometry?.location?.lng() as number,
    };
    const deliverToCoordinates = {
      lat: data.deliverTo.geometry?.location?.lat() as number,
      lng: data.deliverTo.geometry?.location?.lng() as number,
    };

    const distanceInMeters =
      // @ts-ignore
      google.maps.geometry.spherical.computeDistanceBetween(
        pickupCoordinates,
        deliverToCoordinates
      ) as number;

    setValue("distance", distanceInMeters / 1000);
    setOpenModal(true);
  };

  return (
    <div className="dashboard-wrapper flex h-screen">
      <div className="sidebar w-[300px] bg-white rounded-tr-xl h-full shadow-lg">
        <div className="content h-[85%] p-3 grid place-items-center">
          <div className="not-auth">Not signed in</div>
        </div>
        <div className="button-group flex justify-center p-3">
          <NavLink to="/sign-in">
            <Button className="mr-3" type="primary" ghost>
              Sign in
            </Button>
          </NavLink>
          <NavLink to="/sign-up">
            <Button type="primary">Sign up</Button>
          </NavLink>
        </div>
      </div>
      <div className="form-container flex-grow p-3 grid place-items-center place-content-center">
        <div className="form-label font-extrabold text-2xl text-center">
          Courier Services
        </div>
        <form
          action=""
          onSubmit={handleSubmit(submit)}
          className="w-[500px] max-w-[90%] mx-auto flex flex-col gap-3 px-6 py-10 my-5 bg-white shadow-xl"
        >
          <div className="form-group">
            <label htmlFor="deliverTo" className="block font-semibold mb-1">
              Pick Up Location
            </label>
            <Autocomplete
              className="w-full shadow-lg p-3 bg-transparent border border-solid border-blue-300 rounded-xl outline-none focus:ring ring-blue-400"
              placeholder="Enter pick up location"
              options={{
                types: ["address"],
              }}
              onPlaceSelected={(place) => setValue("pickup", place)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="deliverTo" className="block font-semibold mb-1">
              Delivery Location
            </label>
            <Autocomplete
              className="w-full shadow-lg p-3 bg-transparent border border-solid border-blue-300 rounded-xl outline-none focus:ring ring-blue-400"
              placeholder="Enter delivery location"
              onPlaceSelected={(place) => setValue("deliverTo", place)}
              options={{
                types: ["address"],
              }}
            />
          </div>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="mt-4 !rounded-lg !py-2 !h-auto !font-bold"
          >
            Submit Form
          </Button>
        </form>
      </div>
      <Modal
        title="Complete Request"
        centered
        open={openModal}
        okText="Accept"
        onOk={() => {
          setOpenModal(false);
          console.log({ values: getValues() });
        }}
        onCancel={() => setOpenModal(false)}
      >
        <div className="wrap mb-3">
          <label htmlFor="weight" className="block mb-2">
            Select Item Weight
          </label>
          <Select
            id="weight"
            placeholder="Weight of goods"
            defaultValue="1-5"
            placement="topRight"
            style={{ width: "100%" }}
            onChange={(value) => setValue("weightCharge", parseInt(value))}
            options={weights}
          />
        </div>
        <div className="cost flex justify-between items-center">
          <span className="text-blue-600 font-medium">Service Payment:</span>
          <span className="font-bold text-slate-600 items-center flex">
            <svg
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 18V7.052a1.05 1.05 0 0 1 1.968-.51l6.064 10.916a1.05 1.05 0 0 0 1.968-.51V6M5 10h14M5 14h14"
              />
            </svg>
            <span>
              {Math.round(distance * weightCharge).toLocaleString("en")}{" "}
            </span>
          </span>
        </div>
      </Modal>
    </div>
  );
}

const weights = [
  {
    label: "0kg - 5kg",
    value: 1,
  },
  {
    label: "6kg - 10kg",
    value: 2,
  },
  {
    label: "11kg - 15kg",
    value: 3,
  },
];

export default Dashboard;
