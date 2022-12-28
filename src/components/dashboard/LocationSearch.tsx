import { CardActionArea, SwipeableDrawer } from "@mui/material";
import { Button, Input } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { UseFormSetValue } from "react-hook-form";
import { PlaceResult, SearchType, AddressType } from "./AddressPicker";
import j from "jquery";
import { Icon } from "@iconify/react";

type LocationSearchPropsType = {
  search: SearchType;
  setValue: UseFormSetValue<AddressType>;
  handleLocationSearch: (
    open: boolean,
    title?: SearchType["title"],
    type?: SearchType["type"]
  ) => void;
};

function LocationSearch(props: LocationSearchPropsType) {
  const { search, handleLocationSearch, setValue } = props;

  const [inputValue, setInputValue] = React.useState(
    search.selectedPlace?.description
  );
  const [places, setPlaces] = React.useState<PlaceResult[]>([]);

  const findPlaces = async (place: string) => {
    if (!place) return setPlaces([]);
    const placesFinder = new google.maps.places.AutocompleteService();
    const places = await placesFinder.getPlacePredictions({
      input: place,
      types: ["address"],
      componentRestrictions: {
        country: "ng",
      },
    });

    setPlaces(places.predictions);
  };

  React.useEffect(() => {
    if (search.open && search.selectedPlace) {
      setInputValue(search.selectedPlace.description);
      findPlaces(search.selectedPlace.description);
    }
  }, [search]);

  return (
    <SwipeableDrawer
      onClose={() => handleLocationSearch(false)}
      onOpen={() => handleLocationSearch(true)}
      open={search.open}
      anchor="bottom"
      ModalProps={{
        className: "!z-[99999]",
      }}
      PaperProps={{
        className: "rounded-t-2xl shadow-lg",
      }}
    >
      <div className="content h-[500px] overflow-auto p-3 py-5 bg-white">
        <div
          className="w-20 h-2 bg-gray-500/50 shadow-lg rounded-2xl mx-auto mb-3"
          onClick={() => handleLocationSearch(false)}
        />
        <div className="title font-extrabold text-gray-700 text-lg mb-3 uppercase text-center">
          {search.title} Location
        </div>
        {search.open && (
          <Input
            onChange={(e) => {
              setInputValue(e.target.value);
              findPlaces(e.target.value);
            }}
            size={"large"}
            value={inputValue}
            bordered
            id="search-location-input"
            autoFocus
            className={"mb-3 shadow-lg shadow-secondary/10"}
          />
        )}
        <div className="matched-results flex flex-col gap-y-2 min-h-[250px]">
          {!Boolean(places.length) && (
            <div className="waiting text-sm">
              Place Predictions Will Appear Here
            </div>
          )}
          <AnimatePresence mode="wait">
            {places.map((place) => (
              <motion.div
                initial={{ x: 10, opacity: 0.5 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="place-wrap border-b border-gray-400 p-3 font-semibold"
                key={place.place_id}
              >
                <CardActionArea
                  onClick={() => {
                    handleLocationSearch(false);
                    setValue(
                      search.type as NonNullable<SearchType["type"]>,
                      place
                    );
                  }}
                >
                  {place.description}
                </CardActionArea>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {inputValue && (
            <motion.div
              className="action"
              animate={{ y: 0, opacity: 1 }}
              initial={{ y: 50, opacity: 0 }}
            >
              <Button
                type="primary"
                size="large"
                className="!bg-primary text-lg font-bold mt-5 flex items-center gap-x-2"
              >
                <Icon icon={"material-symbols:map-outline"} height={24} />
                <span>Open on map</span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SwipeableDrawer>
  );
}

export default LocationSearch;
