import { CardActionArea, SwipeableDrawer } from "@mui/material";
import { Button, Input } from "antd";
import { AnimatePresence, motion, MotionProps } from "framer-motion";
import React from "react";
import { UseFormSetValue } from "react-hook-form";
import { PlaceResult, SearchType, AddressType } from "./AddressPicker";
import { Icon } from "@iconify/react";
import { ShowMapRefObject } from "@pages/ShowOnMap";
import Loading from "@comps/Loading";
import { useAppSelector } from "@lib/redux/store";

type LocationSearchPropsType = {
  showMapRef: React.RefObject<ShowMapRefObject>;
  search: SearchType;
  setValue: UseFormSetValue<AddressType>;
  handleLocationSearch: (
    open: boolean,
    title?: SearchType["title"],
    type?: SearchType["type"],
    selectedPlace?: PlaceResult
  ) => void;
};

function LocationSearch(props: LocationSearchPropsType) {
  const { search, handleLocationSearch, setValue, showMapRef } = props;

  const device = useAppSelector((state) => state.sessionStore.device);
  const [loading, setLoading] = React.useState(false);
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
    console.log({ search });
    let selectedPlace = search.selectedPlace?.description ?? "";
    if (search.open && selectedPlace) {
      setInputValue(selectedPlace);
      findPlaces(selectedPlace);
    } else if (!selectedPlace) {
      setPlaces([]);
      setInputValue("");
    }
  }, [search]);

  const openLocationOnMap = async () => {
    handleLocationSearch(false, search.title, search.type, places[0]);

    // tell user before show locations on map
    setLoading(true);

    const Geocoder = new google.maps.Geocoder();
    const placesData = (await Geocoder.geocode({ placeId: places[0].place_id }))
      .results;

    setTimeout(() => {
      showMapRef.current?.showOnMap({
        places: placesData,
        type: search.type,
        courier: search.courier,
      });

      setTimeout(() => {
        setLoading(false);
      }, 500);
    }, 1000);
  };

  const Content = (
    <div className="content h-[500px] rounded-t-2xl overflow-auto p-3 py-5">
      <div
        className="w-20 h-2 bg-gray-500/50 shadow-lg rounded-2xl mx-auto mb-3 cursor-pointer"
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
          placeholder={
            "Enter " + search.title?.toLocaleLowerCase() + " location"
          }
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
              onClickCapture={openLocationOnMap}
              className="!bg-primary text-lg font-bold mt-5 flex items-center gap-x-2"
            >
              <Icon icon={"material-symbols:map-outline"} height={24} />
              <span>Open on map</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
  return (
    <React.Fragment>
      {loading && <Loading text="" unMount={loading} />}

      {device === "desktop" ? (
        <React.Fragment>
          <AnimatePresence>
            {search.open && (
              <motion.div
                animate={{ opacity: 1, position: "absolute" }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                onClick={() => handleLocationSearch(false)}
                className="backdrop absolute left-0 h-full w-full cursor-pointer bg-black/40 z-[99999] top-0"
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {search.open && (
              <motion.div
                {...({
                  initial: { bottom: -500, opacity: 0.8, position: "fixed" },
                  animate: { bottom: 0, opacity: 1, position: "absolute" },
                  exit: { bottom: -500 },
                  transition: { type: "just", duration: 0.5 },
                  className:
                    "absolute bottom-0 w-full left-0 z-[99999] rounded-t-2xl shadow-lg bg-white",
                } as MotionProps)}
              >
                {Content}
              </motion.div>
            )}
          </AnimatePresence>
        </React.Fragment>
      ) : (
        <SwipeableDrawer
          onClose={() => handleLocationSearch(false)}
          onOpen={() => handleLocationSearch(true)}
          open={search.open}
          anchor={"bottom"}
          onEnded={() => alert("ended")}
          ModalProps={{ style: { zIndex: 9999 } }}
          PaperProps={{ className: "rounded-t-2xl shadow-lg" }}
          transitionDuration={{
            exit: 500,
            enter: 700,
          }}
        >
          {Content}
        </SwipeableDrawer>
      )}
    </React.Fragment>
  );
}

export default LocationSearch;
