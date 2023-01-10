import React from "react";
import { AnimatePresence, Transition, motion } from "framer-motion";
import { Button, Image, Spin } from "antd";
import { Icon } from "@iconify/react";
import { useAppSelector } from "@lib/redux/store";
import { VehicleIcon, VehicleIconLinks, driverDetails } from "@lib/constants";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { format } from "date-fns";
import moment from "moment";
import { getGeocode } from "@lib/helpers";

// @asset
import DriverImage from "@assets/profile.jpg";
import { DriverDetails, FormFields, OrderStateType } from "@lib/types";

type PropsType = {
  fields: FormFields;
  setOpenOrder: React.Dispatch<React.SetStateAction<boolean>>;
};

function OrderReech(props: PropsType) {
  const { pickupLocation, deliveryLocation, weight, type } = props.fields;
  const courier = useAppSelector((state) => state.sessionStore.info.courier);
  const [state, setState] = React.useState<OrderStateType>({
    loading: true,
    origin: null,
    destination: null,
    directions: null,
  });
  const [loading, setLoading] = React.useState<boolean>(true);

  const mapLoaded = async () => {
    var directionsService = new google.maps.DirectionsService();

    const pickup = (await getGeocode({ placeId: pickupLocation.place_id }))[0];
    const deliver = (
      await getGeocode({ placeId: deliveryLocation.place_id })
    )[0];

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

  const orderReech = async () => {
    setState({ ...state, reech: "Reeching" });

    // TODO - get closest and available driver from backend

    // * place driver location on map for user to see
    let driver,
      driverDirectionToOrigin: google.maps.DirectionsResult | null | undefined,
      directionsService = new google.maps.DirectionsService();

    const latlng = new google.maps.LatLng(
      driverDetails.currentLocation.lat,
      driverDetails.currentLocation.lng
    );

    // @ts-ignore
    driver = (await getGeocode({ latLng: latlng }))[0];

    // * The item pickup location turns to the driver destination
    // * the driver is going to pick up the items
    let destination = {
      lat: state.origin!.lat,
      lng: state.origin!.lng,
    };

    // * The current location of the driver becomes the origin
    let origin = {
      lat: driver.geometry.location.lat(),
      lng: driver.geometry.location.lng(),
    };

    console.log({
      destination,
      origin,
    });

    var request: google.maps.DirectionsRequest = {
      origin,
      destination,
      travelMode: google.maps.TravelMode["DRIVING"],
    };

    try {
      driverDirectionToOrigin = await directionsService.route(request);
    } catch (error: any) {
      console.error(error);
      window.alert(error.message);
      return;
    }

    setTimeout(() => {
      // * Tell the user that a driver has been found close to the pickup location
      setState({ ...state, reech: "Reeched" });

      setTimeout(() => {
        // * this scope timeout assigned a driver to the pick up location
        setState({
          ...state,
          reech: undefined,
          driverDetails,
          driverDirectionToOrigin,
        });

        // * This makes the driver to be at the pickup location
        setTimeout(() => {
          setState((state) => ({
            ...state,
            driverDetails: {
              ...state.driverDetails!,
              status: "arrived",
              currentLocation: state.origin!,
            },
          }));
        }, 5000);
      }, 2000);
    }, 4000);
  };

  return (
    <motion.div
      className="h-full overflow-hidden absolute z-[9999] bottom-0 shadow-2xl w-full bg-white rounded-t-2xl"
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
      <div className="wrapper h-full overflow-auto pb-20">
        <div className="close-btn-wrap pt-3 sticky top-0 z-[9999] bg-white flex justify-end px-3">
          <Button
            type="ghost"
            onClick={() => props.setOpenOrder(false)}
            className="rounded-lg shadow-lg text-primary mb-3"
          >
            Cancel
          </Button>
        </div>
        <div className="map-snapshot">
          <GoogleMap
            onLoad={mapLoaded}
            options={mapOptions}
            mapContainerStyle={{ height: 300, width: "100%" }}
          >
            {state.directions && state.driverDetails?.status !== "coming" && (
              <DirectionsRenderer
                directions={state.directions as google.maps.DirectionsResult}
                options={{ suppressMarkers: true }}
              />
            )}
            {state.driverDirectionToOrigin &&
              state.driverDetails?.status !== "arrived" && (
                <DirectionsRenderer
                  directions={
                    state.driverDirectionToOrigin as google.maps.DirectionsResult
                  }
                  options={{ suppressMarkers: true }}
                />
              )}
            <Marker
              position={state.origin as google.maps.LatLngLiteral}
              icon={
                "https://api.iconify.design/ic/sharp-location-on.svg" +
                `?color=${
                  state.driverDetails?.status === "coming" ? "blue" : "red"
                }&width=30`
              }
            />
            <Marker
              position={state.destination as google.maps.LatLngLiteral}
              icon={
                "https://api.iconify.design/ic/sharp-location-on.svg" +
                `?color=green&width=30`
              }
            />
            <Marker
              position={
                state.driverDetails
                  ?.currentLocation as google.maps.LatLngLiteral
              }
              icon={"/car.png"}
            />
          </GoogleMap>
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
      </div>
      <motion.div
        className="px-3 mt-5 bg-white fixed sm:absolute w-full left-0 bottom-0"
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
      <AnimatePresence>
        {state.driverDetails && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ type: "just", duration: 0.5 } as Transition}
            className="absolute bg-white rounded-t-2xl shadow-2xl bottom-0 left-0 w-full"
          >
            <div className="details-wrap justify-center bg-primary/5 p-3 items-center flex flex-col gap-y-4">
              <div className="time-count mb-3 font-bold">
                (10)mins until Reech arrives
              </div>
              <div className="group">
                <div className="bg-white mb-3 w-[90px] h-[90px] grid place-items-center rounded-full shadow-xl">
                  <Image
                    src={state.driverDetails.image}
                    width={"80%"}
                    className="rounded-full"
                  />
                </div>
                <div className="icons flex gap-x-4">
                  <div className="rating flex font-bold text-lg">
                    <span>{state.driverDetails.ratings}</span>
                    <Icon
                      icon={"material-symbols:star-rounded"}
                      className="text-primary"
                      height={24}
                    />
                  </div>
                  <div className="contact">
                    <a
                      title="call driver"
                      href={"tel:" + state.driverDetails.contact}
                    >
                      <Icon height={24} icon={"uil:phone-volume"} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="group flex px-3 flex-col gap-y-1">
                <div className="name">
                  Name: <b>{state.driverDetails.name}</b>
                </div>
                <hr />
                <div className="vehicle">
                  Vehicle:{" "}
                  <b
                    dangerouslySetInnerHTML={{
                      __html: state.driverDetails.vehicle,
                    }}
                  />
                </div>
                <hr />
                <div className="license">
                  License: <b>{state.driverDetails.license}</b>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const mapOptions = {
  mapTypeControl: false,
  zoomControl: false,
  fullscreenControl: false,
};

export default OrderReech;
