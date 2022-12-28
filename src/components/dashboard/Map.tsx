import React from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";

interface MapProps extends google.maps.MapOptions {
  style?: React.CSSProperties;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode[];
}

function Map(props: MapProps) {
  const { style = {}, onIdle, onClick, ...options } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      const center: google.maps.LatLngLiteral = { lat: 6.5244, lng: 3.3792 };
      setMap(new window.google.maps.Map(ref.current, { zoom: 13, center }));
    }
  }, [ref, map]);

  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) map.addListener("click", onClick);
      if (onIdle) map.addListener("idle", () => onIdle(map));
    }
  }, [map, onClick, onIdle]);

  return <div ref={ref} className="h-full" />;
}

export default Map;
