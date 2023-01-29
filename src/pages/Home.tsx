import React from "react";
import { useRoutes } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";

// pages
import Dashboard from "src/pages/dashboard";

// styles
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LandingView from "src/components/LandingView";
import { Button, Divider } from "antd";
import { NavLink } from "react-router-dom";
import SlideTransition from "src/components/animations/SlideTransition";

const Colors = ["rgba(255,0,0,.5)", "rgba(0,154,73,0.5)", "rgba(12,0,88,0.5)"];

function Home() {
  const session = sessionStorage?.getItem("user");
  const [loading, setLoading] = React.useState(true);

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 15000);
  // });

  // if (loading) return <LandingView />;

  if (true)
    return (
      <React.Fragment>
        <Dashboard />
      </React.Fragment>
    );

  // return (
  //   <SlideTransition unMount={false} noPadding>
  //     <div className="home p-3 h-full relative">
  //       <Carousel
  //         showThumbs={false}
  //         renderIndicator={(onClickHandler, isSelected, index, label) => {
  //           if (isSelected) {
  //             return (
  //               <motion.li
  //                 animate={true}
  //                 layoutId={label + index + 1}
  //                 key={index}
  //                 className="w-8 h-2 shadow-lg bg-[rgba(250,221,60,1)] inline-block mx-1.5 rounded-full"
  //                 aria-label={`Selected: ${label} ${index + 1}`}
  //                 title={`Selected: ${label} ${index + 1}`}
  //               />
  //             );
  //           }
  //           return (
  //             <motion.li
  //               animate={true}
  //               className="w-5 h-2 shadow-lg bg-[rgba(255,172,51,0.5)] inline-block mx-1.5 rounded-full"
  //               onClick={onClickHandler}
  //               onKeyDown={onClickHandler}
  //               value={index}
  //               key={index}
  //               role="button"
  //               tabIndex={0}
  //               layoutId={label + index + 1}
  //               title={`${label} ${index + 1}`}
  //               aria-label={`${label} ${index + 1}`}
  //             />
  //           );
  //         }}
  //         autoPlay
  //         infiniteLoop
  //         showArrows={false}
  //         showStatus={false}
  //       >
  //         {Array.from(new Array(3)).map((_, i) => (
  //           <div className="slider-child px-1">
  //             <div
  //               style={{ backgroundColor: `${Colors[i]}` }}
  //               className={`box grid place-items-center h-40 w-full shadow-xl rounded-lg`}
  //             >
  //               <span className="font-extrabold text-white text-2xl">
  //                 Reech
  //               </span>
  //             </div>
  //             <div className="lines my-20">
  //               <Divider style={{ marginBlock: 5 }} />
  //               <Divider style={{ marginBlock: 5 }} />
  //               <Divider style={{ marginBlock: 5 }} />
  //             </div>
  //           </div>
  //         ))}
  //       </Carousel>
  //       <div className="fixed sm:absolute bottom-0 left-0 w-full">
  //         <div className="my-5 text-center">
  //           <div className="title font-bold text-sm">Authenticate</div>
  //           <Divider style={{ margin: 0 }}>
  //             <motion.div
  //               initial={{ opacity: 0, y: 5 }}
  //               animate={{ opacity: 1, y: 0 }}
  //               className="form-label font-semibold text-xs"
  //             >
  //               Explore Courier Features
  //             </motion.div>
  //           </Divider>
  //         </div>
  //         <div className="wrap button-group flex flex-col gap-y-3 w-full justify-center p-3">
  //           <NavLink to="/create-account">
  //             <Button
  //               type="primary"
  //               htmlType="button"
  //               size="large"
  //               className="!rounded-lg !h-auto !py-3 !font-bold !text-gray-600 shadow-lg w-full !bg-[rgba(250,221,60,1)]  !border-none"
  //             >
  //               Create Account
  //             </Button>
  //           </NavLink>
  //           <NavLink to="/create-account">
  //             <Button
  //               className="!rounded-lg !h-auto !py-3 !font-bold !text-gray-600 shadow-lg w-full !border-slate-700"
  //               type="primary"
  //               size="large"
  //               htmlType="button"
  //               ghost
  //             >
  //               Sign in
  //             </Button>
  //           </NavLink>
  //         </div>
  //       </div>
  //     </div>
  //   </SlideTransition>
  // );
}

export default React.memo(Home, () => true);
