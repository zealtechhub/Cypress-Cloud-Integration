import { Input, Modal, Select } from "antd";
import React from "react";
import Autocomplete from "react-google-autocomplete";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import LocationSearch from "./LocationSearch";

export type PlaceResult = google.maps.places.AutocompletePrediction;

export type SearchType = {
  open: boolean;
  /** the LocationSearch component can only open for Pick-Up location
  and for Delivery location **/
  type?: "pickupLocation" | "deliveryLocation";
  title?: "Pick Up" | "Delivery";
  selectedPlace?: PlaceResult;
};

export type AddressType = {
  pickupLocation?: PlaceResult;
  deliveryLocation?: PlaceResult;
  weightCharge: number;
  distance: number;
};

function AddressPicker() {
  const { handleSubmit, setValue, watch, getValues } = useForm<AddressType>({
    defaultValues: {
      weightCharge: 1,
    },
  });

  const { distance, weightCharge, deliveryLocation, pickupLocation } = watch();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<SearchType>({
    open: false,
  });
  const [location, setLocation] = React.useState<string>();

  const submit = (data: {
    pickupLocation?: PlaceResult;
    deliveryLocation?: PlaceResult;
  }) => {
    // let pickup = data.pickup as google.maps.places.PlaceResult
    //   const pickupCoordinates = {
    //     lat: data.pickup.geometry?.location?.lat() as number,
    //     lng: data.pickup.geometry?.location?.lng() as number,
    //   };
    //   const deliverToCoordinates = {
    //     lat: data.deliverTo.geometry?.location?.lat() as number,
    //     lng: data.deliverTo.geometry?.location?.lng() as number,
    //   };
    //   const distanceInMeters =
    //     // @ts-ignore
    //     google.maps.geometry.spherical.computeDistanceBetween(
    //       pickupCoordinates,
    //       deliverToCoordinates
    //     ) as number;
    //   setValue("distance", distanceInMeters);
    //   setOpenModal(true);
  };

  const getReverseGeocodingData = React.useCallback(
    function getReverseGeocodingData(lat: number, lng: number) {
      const latlng = new google.maps.LatLng(lat, lng);
      const geocoder = new google.maps.Geocoder();

      console.log({ latlng });
      // @ts-ignore
      geocoder.geocode({ latLng: latlng }, (results, status) => {
        if (status !== google.maps.GeocoderStatus.OK) {
          alert(status);
        }
        // This is checking to see if the Geo-code Status is OK before proceeding
        if (status === google.maps.GeocoderStatus.OK) {
          setLocation(results![0].formatted_address);
          console.log({ results });
          // @ts-ignore
          setValue("pickupLocation", results![0]);
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

  /**
   * @description The parameter tell the function which location the user wants to type and set an identity state for it
   * @param open tells the function to either close or open the LocationSearchComponent
   * @param type
   */
  const handleLocationSearch = (
    open: boolean,
    title?: SearchType["title"],
    type?: SearchType["type"]
  ) => {
    setSearch({
      open,
      title,
      type,
      ...(open
        ? { selectedPlace: getValues(type as NonNullable<SearchType["type"]>) }
        : {}),
    });
  };

  return (
    <>
      <motion.form
        initial={{ opacity: 0.6, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit(submit)}
        className="rounded-2xl mx-auto flex flex-col gap-3 py-4 px-2 my-5 shadow-sm bg-[#f6fcff]"
      >
        <div
          className="form-group"
          onClickCapture={() =>
            handleLocationSearch(true, "Pick Up", "pickupLocation")
          }
        >
          <div className="relative">
            <div className="text-red-700 absolute top-[40%] -translate-y-1/2 left-2 h-3 w-3 rounded-full">
              <Icon icon={"mdi:truck-cargo-container"} height={24} />
            </div>
            <Input
              className={AutoCompleteClassName}
              placeholder={"Pick up location"}
              value={pickupLocation?.description}
              disabled
            />
          </div>
        </div>
        <div
          className="form-group"
          onClickCapture={() =>
            handleLocationSearch(true, "Delivery", "deliveryLocation")
          }
        >
          <div className="relative">
            <div className="text-green-700 absolute top-[40%] -translate-y-1/2 left-2 h-3 w-3 rounded-full">
              <Icon icon={"mdi:truck-check"} height={24} />
            </div>
            <Input
              className={AutoCompleteClassName}
              placeholder={"Delivery location"}
              value={deliveryLocation?.description}
              disabled
            />
          </div>
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
      <LocationSearch {...{ setValue, search, handleLocationSearch }} />
    </>
  );
}

const AutoCompleteClassName =
  "w-full !shadow-xs px-3 pl-12 py-2 !bg-transparent !text-gray-600 !border-b-[1.5px] border-solid border-gray-300 !outline-none";

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
