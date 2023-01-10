import { CardActionArea, SwipeableDrawer } from "@mui/material";
import { Button, Dropdown, Input } from "antd";
import { AnimatePresence, motion, MotionProps } from "framer-motion";
import React from "react";
import { Icon } from "@iconify/react";
import Loading from "@comps/Loading";
import { useAppSelector } from "@lib/redux/store";
import { LocationSearchPropsType, PlaceResult } from "@lib/types";

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
    if (place.length % 2 !== 0) return;

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
    let selectedPlace = search.selectedPlace?.description ?? "";
    if (search.open && selectedPlace) {
      setInputValue(selectedPlace);
      findPlaces(selectedPlace);
    } else if (!selectedPlace) {
      setPlaces([]);
      setInputValue("");
    }
  }, [search]);

  const openLocationOnMap = async (placeId: string) => {
    handleLocationSearch(false, search.title, search.type, places[0]);

    // tell user before show locations on map
    setLoading(true);

    const Geocoder = new google.maps.Geocoder();
    const placesData = (await Geocoder.geocode({ placeId })).results;

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
    <div className="content h-full rounded-t-2xl overflow-auto px-3 pb-5">
      <div
        className="flex justify-end py-3"
        onClick={() => handleLocationSearch(false)}
      >
        <Button type="ghost" className="text-primary font-bold rounded-lg">
          Cancel
        </Button>
      </div>

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
      <div className="matched-results flex flex-col gap-y-4 min-h-[250px]">
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
              className="place-wrap font-semibold"
              key={place.place_id}
            >
              <Dropdown
                menu={{
                  items: [
                    {
                      label: "Show on map",
                      key: place.place_id,
                      onClick: () => openLocationOnMap(place.place_id),
                    },
                  ],
                }}
                overlayClassName="z-[99999]"
                openClassName="z-[9999999]"
                trigger={["contextMenu"]}
              >
                <CardActionArea
                  className="!px-3 shadow-sm !bg-primary/[0.03] !rounded-lg !py-2 !border-b !border-gray-400"
                  onClick={() => {
                    handleLocationSearch(false);
                    setValue(search.type, place);
                  }}
                >
                  <b className="text-blue-900">
                    {place.description.substring(0, inputValue?.length)}
                  </b>{" "}
                  {place.description.slice(inputValue!.length)}
                </CardActionArea>
              </Dropdown>
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
              onClickCapture={() => openLocationOnMap(places[0].place_id)}
              className="!bg-primary text-lg font-bold mt-5 flex items-center gap-x-2"
            >
              <Icon icon={"material-symbols:map-outline"} height={24} />
              <span>Search on Map</span>
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
                animate={{ opacity: 1 }}
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
                  initial: { y: 500, position: "fixed" },
                  animate: { y: 0 },
                  exit: { y: 500 },
                  transition: { type: "just", duration: 0.5 },
                  className:
                    "fixed bottom-0 h-[500px] w-full left-0 z-[99999] rounded-t-2xl shadow-lg bg-white",
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
