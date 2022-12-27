import { Avatar, Divider, Modal, Select } from "antd";
import Button from "antd/lib/button";
import React from "react";
import Autocomplete from "react-google-autocomplete";
import { useForm } from "react-hook-form";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import stringToColor from "@/lib/stringToColor";

interface PlaceResult {
  geometry?: {
    location?: {
      lat: () => number;
      lng: () => number;
    };
  };
}

function AddressPicker() {
  const { handleSubmit, setValue, watch, getValues } = useForm<{
    pickup: PlaceResult;
    deliverTo: PlaceResult;
    weightCharge: number;
    distance: number;
    type: string;
  }>({
    defaultValues: {
      pickup: {},
      deliverTo: {},
      weightCharge: 1,
      type: "address",
    },
  });

  const { distance, weightCharge, type } = watch();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [location, setLocation] = React.useState<string>();

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

    setValue("distance", distanceInMeters);
    setOpenModal(true);
  };

  const getReverseGeocodingData = React.useCallback(
    function getReverseGeocodingData(lat: number, lng: number) {
      // @ts-ignore
      var latlng = new google.maps.LatLng(lat, lng);
      // @ts-ignore
      var geocoder = new google.maps.Geocoder();
      // @ts-ignore
      geocoder.geocode({ latLng: latlng }, (results, status) => {
        // @ts-ignore
        if (status !== google.maps.GeocoderStatus.OK) {
          alert(status);
        }
        // This is checking to see if the Geo-code Status is OK before proceeding
        // @ts-ignore
        if (status === google.maps.GeocoderStatus.OK) {
          setLocation(results![0].formatted_address);
          setValue("pickup", results![0]);
        }
      });
    },
    [setValue]
  );

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        getReverseGeocodingData(lat, lng);
      },
      function errorCallback(error) {
        console.log(error);
      }
    );
  }, [getReverseGeocodingData]);

  return (
    <>
      <motion.form
        initial={{ opacity: 0.6, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit(submit)}
        className="rounded-2xl mx-auto flex flex-col gap-3 py-3 px-6 my-5 shadow-xl bg-[#f6fcff]"
      >
        <div className="form-group">
          <label htmlFor="deliverTo" className="block font-semibold mb-1">
            Pick Up Location
          </label>
          <Autocomplete
            className="w-full shadow-lg p-3 bg-transparent border border-solid border-blue-300 rounded-xl outline-none focus:ring ring-blue-400"
            placeholder="Enter pick up location"
            defaultValue={location}
            options={{
              types: [type],
              componentRestrictions: {
                country: "ng",
              },
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
              types: [type],
              componentRestrictions: {
                country: "ng",
              },
            }}
          />
        </div>

      </motion.form>
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
    </>
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

export default AddressPicker;
