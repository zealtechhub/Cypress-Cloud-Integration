import React from "react";
import { AnimatePresence, motion, Transition } from "framer-motion";
import { Country } from "@pages/Auth";
import Countries from "@lib/countries";
import { nanoid } from "@reduxjs/toolkit";
import useMeasure from "react-use-measure";

type Props = {
  setCountry: React.Dispatch<Country>;
};

export type SelectCountryModalRefObject = {
  openModal: (selectedCountry: Country) => void;
};

const SelectCountryModal = React.forwardRef<SelectCountryModalRefObject, Props>(
  (props, ref) => {
    const [countries, setCountries] = React.useState<Country[]>(
      Countries.slice(0, 30)
    );
    const [selectedCountry, setSelectedCountry] = React.useState<Country>({
      code: "NG",
      dial_code: "+234",
    });
    const { setCountry } = props;
    const [open, setOpen] = React.useState(false);

    // const container = React.useRef<HTMLDivElement>();
    const [containerRef, { height }] = useMeasure({ scroll: true });

    React.useImperativeHandle(
      ref,
      () => ({
        openModal(selectedCountry) {
          setSelectedCountry(selectedCountry);
          setOpen(true);
        },
      }),
      []
    );

    const reset = () => {
      setOpen(false);
      setCountries(Countries.slice(0, 30));
    };

    return (
      <React.Fragment>
        <AnimatePresence>
          {open && (
            <div
              className={
                "select-country-wrapper grid place-items-start overflow-hidden w-full z-[999999] fixed sm:absolute h-screen sm:h-full top-0 left-0" +
                (open ? " visible" : " invisible pointer-events-none")
              }
            >
              {open && (
                <div
                  className="fixed sm:absolute top-0 h-full w-full cursor-pointer"
                  onClick={reset}
                />
              )}
              <motion.div
                className="h-full py-3 overflow-auto w-full"
                onScroll={(e) => {
                  let target = e.target as HTMLDivElement;
                  const bottomScrollHeight =
                    target.scrollHeight -
                    target.scrollTop -
                    target.clientHeight;
                  if (
                    bottomScrollHeight < 200 &&
                    Countries.length !== countries.length
                  ) {
                    setCountries([
                      ...countries,
                      ...Countries.slice(
                        countries.length,
                        countries.length + 30
                      ),
                    ]);
                  }
                }}
              >
                <motion.div
                  initial={{ y: 30 }}
                  animate={{ y: 0, scale: 1, height: height || "auto" }}
                  exit={{
                    y: 30,
                    opacity: 1,
                    transition: { duration: 0.1 },
                  }}
                  transition={{ type: "just" } as Transition}
                  className={
                    "z-10 relative w-[300px] mx-auto rounded-lg shadow-lg bg-white"
                  }
                >
                  <div>
                    {countries.map((_country, index) => (
                      <motion.div
                        layout
                        key={_country.code}
                        initial={{ x: 40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                          delay:
                            0.02 *
                            (index < 30
                              ? index
                              : index - Math.floor(index / 30) * 30),
                        }}
                        className={
                          "py-2 border-b-[thin] px-4 flex gap-x-3 items-center border-gray-500/20 hover:bg-secondary/20 cursor-pointer" +
                          (selectedCountry.code === _country.code
                            ? " bg-secondary/80"
                            : "")
                        }
                        onClickCapture={() => {
                          reset();
                          setCountry(_country);
                        }}
                      >
                        <motion.img
                          initial={{ y: -10 }}
                          animate={{ y: 0 }}
                          src={"/flags/" + _country.code + ".png"}
                          className="h-4 w-4 rounded-xl ring-4 ring-secondary shadow-lg"
                        />
                        <span className="font-medium overflow-hidden text-ellipsis">
                          {_country.name} ({_country.dial_code})
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </React.Fragment>
    );
  }
);

export default SelectCountryModal;
