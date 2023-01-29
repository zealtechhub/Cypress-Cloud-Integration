import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import Map from "src/components/dashboard/Map";
import SlideTransition from "src/components/animations/SlideTransition";
import GoBack from "src/components/GoBack";
import { GOOGLE_API_KEY, render } from "./dashboard";
import { Input } from "antd";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Button from "antd/lib/button";
import { HandleLocationSearch, PlaceResult } from "src/lib/types";
import { LocationType, VehicleIcon } from "src/lib/constants";
import { AutoCompleteClassName } from "src/components/dashboard/AddressPicker";

type showMapOptions = {
  places: google.maps.GeocoderResult[];
  type: "deliveryLocation" | "pickupLocation";
  courier: "truck" | "car";
};

export interface ShowMapRefObject {
  showOnMap: (options: showMapOptions) => void;
}

const ShowOnMap = React.forwardRef<
  ShowMapRefObject,
  {
    handleLocationSearch: HandleLocationSearch;
  }
>(function ShowOnMap(props, ref) {
  // here works for the slideTransition
  const [unMount, setUnMount] = React.useState(false);
  // here works for what to render
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<showMapOptions>({
    places: [],
    type: "deliveryLocation",
    courier: "car",
  });

  React.useImperativeHandle(
    ref,
    () => ({
      showOnMap: (options) => {
        setUnMount(false);
        setOptions(options);
        setOpen(true);
      },
    }),
    []
  );

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    console.log({ e });
  };

  React.useEffect(() => {
    if (unMount) {
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    }
  }, [unMount]);

  if (!open) return <></>;

  // Doing this complete AutoComplete because of the types assigned to it
  // what's important here, is just the description and the place id
  const selectAsPlace: PlaceResult = {
    description: options.places[0].formatted_address,
    place_id: options.places[0].place_id,
    types: options.places[0].types,
    terms: [],
    structured_formatting: {
      main_text: "",
      secondary_text: "",
      main_text_matched_substrings: [],
    },
    matched_substrings: [],
  };

  return (
    <SlideTransition unMount={unMount} goBack={false} noPadding>
      <div className="show-on-map-wrapper h-full">
        <div className="flex gap-x-3 items-center p-4">
          <GoBack setUnMount={setUnMount} />
          <span className="font-bold text-lg">Show On Map</span>
        </div>
        <Wrapper apiKey={GOOGLE_API_KEY} render={render}>
          <Map
            className="h-[87%]"
            markers={options.places}
            type={options.type}
            courier={options.courier}
            zoom={16}
            onClick={handleMapClick}
          />
        </Wrapper>
        {!unMount && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            exit={{ y: 50, opacity: 0 }}
            className="actions fixed sm:absolute bg-white py-3 bottom-0 left-0 w-full p-4"
          >
            <div
              className="form-group mb-5"
              onClickCapture={() =>
                props.handleLocationSearch(
                  true,
                  options.type.includes("delivery") ? "Delivery" : "Pick Up",
                  options.type,
                  selectAsPlace
                )
              }
            >
              <div className="relative">
                <div
                  className={
                    "absolute top-[40%] -translate-y-1/2 left-2 h-3 w-3 rounded-full " +
                    LocationType[options.type]
                  }
                >
                  <Icon icon={VehicleIcon[options.courier]} height={24} />
                </div>
                <Input
                  className={AutoCompleteClassName}
                  placeholder={"Pick up location"}
                  value={options.places[0].formatted_address}
                  disabled
                />
              </div>
            </div>
            <Button
              type="ghost"
              htmlType="submit"
              size="large"
              className="!bg-secondary !text-black !w-full !rounded-lg !py-3 !h-auto !font-bold"
            >
              Select Location
            </Button>
          </motion.div>
        )}
      </div>
    </SlideTransition>
  );
});

export default ShowOnMap;
