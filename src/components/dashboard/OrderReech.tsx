import React from "react";
import { motion } from "framer-motion";
import { Button, Spin } from "antd";
import { Icon } from "@iconify/react";
import { useAppSelector } from "@lib/redux/store";
import { VehicleIcon } from "@lib/constants";
import { FormFields } from "./CheckPrice";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { format } from "date-fns";
import moment from "moment";
import { getGeocode } from "@lib/helpers";

// @asset
import DriverImage from "@assets/driver.png";

type PropsType = {
  fields: FormFields;
  setOpenOrder: React.Dispatch<React.SetStateAction<boolean>>;
};

type StateType = {
  loading: boolean;
  origin: google.maps.LatLngLiteral | null;
  destination: google.maps.LatLngLiteral | null;
  directions: google.maps.DirectionsResult | null;
  /** the delivery distance */
  distance?: { value: number; text: string };
  /** the delivery duration */
  duration?: { value: number; text: string };
  reech?: "Reeching" | "Reeched";
  courierDetails?: {
    name: string;
    contact: string;
    license: string;
    image: string;
    vehicle: string;
    ratings: number;
  };
};

function OrderReech(props: PropsType) {
  const { pickupLocation, deliveryLocation, weight, type } = props.fields;
  const courier = useAppSelector((state) => state.sessionStore.info.courier);
  const [state, setState] = React.useState<StateType>({
    loading: true,
    origin: null,
    destination: null,
    directions: null,
  });
  const [loading, setLoading] = React.useState<boolean>(true);

  const mapLoaded = async () => {
    var directionsService = new google.maps.DirectionsService();

    const pickup = (await getGeocode(pickupLocation.place_id))[0];
    const deliver = (await getGeocode(deliveryLocation.place_id))[0];

    let origin = {
      lat: pickup.geometry.location.lat(),
      lng: pickup.geometry.location.lng(),
    };

    let destination = {
      lat: deliver.geometry.location.lat(),
      lng: deliver.geometry.location.lng(),
    };

    var request: google.maps.DirectionsRequest = {
      origin,
      destination,
      travelMode: google.maps.TravelMode["DRIVING"],
    };

    directionsService.route(request, function (directions, status) {
      if (status === "OK") {
        let legsToGetDistanceFrom = directions?.routes[0].legs.filter(
          (leg) => leg.start_address !== leg.end_address
        )[0];
        setState({
          loading: false,
          origin,
          destination,
          directions,
          duration: legsToGetDistanceFrom?.duration,
          distance: legsToGetDistanceFrom?.distance,
        });

        setLoading(false);
      } else {
        alert("directions request failed, status=" + status);
      }
    });
  };

  const orderReech = () => {
    setState({ ...state, reech: "Reeching" });

    setTimeout(() => {
      setState({ ...state, reech: "Reeched" });

      setTimeout(() => {
        setState({
          ...state,
          reech: undefined,
          courierDetails: {
            name: "Olugbode Ajanaku",
            contact: "+2349017241037",
            image: DriverImage,
            license: "BAT419JP",
            vehicle:
              "Lexus RX350, color red with plate number <b class='font-lg'>28s3aaBT2</b>",
            ratings: 4.5,
          },
        });
      }, 3000);
    }, 4000);
  };

  return (
    <motion.div
      className="min-h-[500px] absolute z-[9999] bottom-0 shadow-2xl w-full bg-white rounded-t-2xl"
      animate={{ y: 0 }}
      initial={{ y: 500 }}
      exit={{ y: 500 }}
      transition={{ type: "just" }}
    >
      {loading && (
        <motion.div
          exit={{ x: "100%" }}
          className="bg-white z-50 top-0 w-full absolute h-full rounded-t-2xl"
        >
          <div className="loading-container bg-primary/10 h-full flex flex-col justify-center items-center rounded-t-2xl">
            <Spin />
            <Button
              type="ghost"
              onClick={() => props.setOpenOrder(false)}
              className="rounded-lg shadow-lg text-primary mb-3"
            >
              Cancel
            </Button>
          </div>
        </motion.div>
      )}
      <div className="wrapper py-3">
        <div className="close-btn-wrap flex justify-end px-3">
          <Button
            type="ghost"
            onClick={() => props.setOpenOrder(false)}
            className="rounded-lg shadow-lg text-primary mb-3"
          >
            Cancel
          </Button>
        </div>
        <div className="map-snapshot h-[150px]">
          <GoogleMap
            onLoad={mapLoaded}
            options={mapOptions}
            mapContainerStyle={{ height: 150, width: "100%" }}
          >
            {state.directions && (
              <DirectionsRenderer
                directions={state.directions as google.maps.DirectionsResult}
                options={{ suppressMarkers: true }}
              />
            )}
            <Marker
              position={state.origin as google.maps.LatLngLiteral}
              icon={
                "https://api.iconify.design/ic/sharp-location-on.svg" +
                `?color=red&width=30`
              }
            />
            <Marker
              position={state.destination as google.maps.LatLngLiteral}
              icon={
                "https://api.iconify.design/ic/sharp-location-on.svg" +
                `?color=green&width=30`
              }
            />
          </GoogleMap>
          {/* <Map showCurrent={false} onLoad={mapLoaded} /> */}
        </div>
        <div className="address-stamp bg-secondary/20 p-2 my-3">
          <div className="pick-up flex gap-x-3 items-center">
            <Icon
              icon={VehicleIcon[courier as "car" | "truck"]}
              height={24}
              className="text-green-700"
            />
            <span>{pickupLocation.description}</span>
          </div>
          <hr className="my-3" />
          <div className="delivered flex gap-x-3 items-center">
            <Icon
              icon={VehicleIcon[courier as "car" | "truck"]}
              height={24}
              className="text-red-700"
            />
            <span>{deliveryLocation.description}</span>
          </div>
        </div>
        {!loading && (
          <div className="other-details p-3 flex flex-col gap-y-4">
            <div className="estimated-travel-time" aria-describedby="es-time">
              <span id="es-time" className="font-bold">
                Estimated Travel time:{" "}
              </span>{" "}
              <span>{state.duration?.text}</span>
              <span className="shadow-xl bg-primary font-bold text-xs rounded-2xl p-2 ml-3">
                {state.distance?.text}
              </span>
            </div>
            <div className="delivery-time" aria-describedby="de-time">
              <span id="de-time" className="font-bold">
                Delivery time:
              </span>
              <span>
                {" "}
                between
                {format(
                  moment().add(state.duration!.value!, "s").toDate(),
                  " h:mm a"
                )}
                <b className="mx-2 font-extrabold">⇀</b>
                {format(
                  moment()
                    .add(state.duration!.value! + 60 * 60, "s")
                    .toDate(),
                  " h:mm a"
                )}
              </span>
            </div>
            <div className="weight" aria-describedby="weigh">
              <span id="weight" className="font-bold">
                Weight:
              </span>
              <span> {weight.label}</span>
            </div>
            <div className="item-type" aria-describedby="item-type-title">
              <span id="item-type-title" className="font-bold">
                Items Type:
              </span>
              <span> {props.fields.type.label}</span>
            </div>
            <div className="price" aria-describedby="price-title">
              <span id="price-title" className="font-bold">
                Price:{" "}
              </span>{" "}
              <span className="font-extrabold">
                <span className="min">
                  ₦
                  {(
                    (state.distance!.value / 1000) *
                      (weight.value * type.charge) +
                    state.duration!.value
                  ).toLocaleString("en")}
                </span>
                <b> — </b>
                <span className="min">
                  ₦
                  {(
                    (state.distance!.value / 1000) *
                      (weight.value * type.charge) +
                    state.duration!.value +
                    500
                  ).toLocaleString("en")}
                </span>
              </span>
            </div>

            {type.value === "not-specified" && (
              <div className="info text-xs">
                Price might has some slight change on arrival, because the type
                of item you want to carry has not being specified
              </div>
            )}
          </div>
        )}
        <motion.div
          className="px-3 mt-5"
          animate={{ y: 0 }}
          initial={{ y: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            type="primary"
            disabled={Boolean(state.reech)}
            loading={Boolean(state.reech)}
            className={
              "w-full font-bold mb-3 !h-auto !py-3" +
              (state.reech
                ? " disabled:!font-extrabold disabled:!text-lg disabled:!text-black " +
                  (state.reech === "Reeched"
                    ? " !bg-primary/60"
                    : " !bg-primary/20")
                : " bg-secondary")
            }
            size="large"
            onClick={orderReech}
          >
            {state.reech ? state.reech : "Order Reech"}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

const mapOptions = {
  mapTypeControl: false,
  zoomControl: false,
  fullscreenControl: false,
};

export default OrderReech;
