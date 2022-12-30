import React from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { Icon } from "@iconify/react";
import { IconButton } from "@mui/material";

interface MapProps extends google.maps.MapOptions {
  className?: string;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode[];
  markers?: google.maps.GeocoderResult[];
  type?: "pickupLocation" | "deliveryLocation";
  courier?: "car" | "truck";
}

function Map(props: MapProps) {
  const { className, onIdle, onClick, markers, type, ...options } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();
  const [markersRef, setMarkersRef] = React.useState<google.maps.Marker[]>([]);

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          zoom: options.zoom ?? 13,
          mapTypeControl: false,
          center: {
            lat: markers!?.length
              ? markers![0]?.geometry.location.lat()
              : 6.5244,
            lng: markers!?.length
              ? markers![0]?.geometry.location.lng()
              : 3.3792,
          },
          zoomControl: false,
          fullscreenControl: false,
        })
      );
    }
  }, [ref, map, options.zoom, markers]);

  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) map.addListener("click", onClick);
      if (onIdle) map.addListener("idle", () => onIdle(map));

      const Icon = {
        car: "https://api.iconify.design/game-icons/city-car.svg",
        truck: "https://api.iconify.design/mdi/truck-cargo-container.svg",
      };

      if (markers?.length && type && options.courier) {
        markers?.forEach((place) => {
          const markerView = new google.maps.Marker({
            map,
            position: {
              lat: place?.geometry.location.lat(),
              lng: place?.geometry.location.lng(),
            },
            icon: `${Icon[options.courier as "car" | "truck"]}?color=${
              type === "deliveryLocation" ? "green" : "red"
            }&width=40`,
            title: "View Location",
          });

          setMarkersRef((refs) => [...refs, markerView]);
          markerView.addListener("click", () => {
            console.log({ place });
          });
        });
      }
    }
  }, [map, markers, onClick, onIdle, options.courier, type]);

  return (
    <React.Fragment>
      <div className="current-location fixed z-[999] bottom-52 right-5">
        <IconButton
          size="large"
          className="toggle-bt !z[9999] !bg-white shadow-2xl"
        >
          <Icon icon={"tabler:current-location"} />
        </IconButton>
      </div>
      <div ref={ref} className={className ?? "h-full"} />
    </React.Fragment>
  );
}

export default Map;
