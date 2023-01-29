import { Icon } from "@iconify/react";
import DriverImage from "src/assets/profile.jpg";
import { DriverDetails } from "./types";
export const VehicleIcon = {
  car: "game-icons:city-car",
  truck: "mdi:truck-cargo-container",
};

export const VehicleIconLinks = {
  car: "https://api.iconify.design/game-icons/city-car.svg",
  truck: "https://api.iconify.design/mdi/truck-cargo-container.svg",
};

export const LocationType = {
  deliveryLocation: "text-green-700",
  pickupLocation: "text-red-700",
};

export const weights = [
  {
    label: "0kg - 10kg",
    value: 1,
  },
  {
    label: "10kg - 20kg",
    value: 2,
  },
  {
    label: "20kg - 30kg",
    value: 3,
  },
  {
    label: "40kg - 50kg",
    value: 4,
  },
  {
    label: "50kg - 60kg",
    value: 5,
  },
  {
    label: "70kg - 80kg",
    value: 6,
  },
  {
    label: "80kg - 90kg",
    value: 7,
  },
  {
    label: "90kg - 100kg",
    value: 8,
  },
];

export const paymentOptions = [
  {
    label: "Pay On Delivery",
    value: "POD",
  },
  {
    label: "Pay With Card",
    value: "PWC",
  },
];

export const itemTypes: {
  value: "flammable" | "fragile" | "normal" | "not-specified";
  label: string;
  charge: number;
}[] = [
  {
    label: "Flammable",
    value: "flammable",
    charge: 2.3,
  },
  {
    label: "Fragile",
    value: "fragile",
    charge: 4,
  },
  {
    label: "Normal",
    value: "normal",
    charge: 1.5,
  },
  {
    label: "Not Specified",
    value: "not-specified",
    charge: 1,
  },
];

export const driverDetails: DriverDetails = {
  name: "Olugbode Ajanaku",
  contact: "+2349017241037",
  image: DriverImage,
  license: "BAT419JP",
  color: "pink",
  vehicle:
    "Lexus RX350, color red with plate number <b class='font-lg'>28s3aaBT2</b>",
  ratings: 4.5,
  status: "coming",
  currentLocation: {
    lat: 6.50153,
    lng: 3.35808,
  },
};
