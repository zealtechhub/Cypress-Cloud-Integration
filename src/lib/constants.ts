export const VehicleIcon = {
  car: "game-icons:city-car",
  truck: "mdi:truck-cargo-container",
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
}[] = [
  {
    label: "Flammable",
    value: "flammable",
  },
  {
    label: "Fragile",
    value: "fragile",
  },
  {
    label: "Normal",
    value: "normal",
  },
  {
    label: "Not Specified",
    value: "not-specified",
  },
];
