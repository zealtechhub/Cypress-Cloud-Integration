import React from "react";
import { Avatar, Divider, Input } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
import stringToColor from "src/lib/stringToColor";
import { useAppSelector } from "src/lib/redux/store";
import GoBack from "@comps/GoBack";
import SlideTransition from "@comps/animations/SlideTransition";

// assets
import ProfileImage from "@assets/profile.jpg";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react";

const EditButton: React.FC<{
  onClick?: React.MouseEventHandler;
  className?: string;
  icon?: string;
}> = (props) => {
  return (
    <IconButton
      onClick={props.onClick}
      className={"z-10 !bg-white !absolute " + (props.className ?? "")}
    >
      <Icon
        icon={props.icon ?? "tabler:brush"}
        height={20}
        className="text-secondary"
      />
    </IconButton>
  );
};

function Profile() {
  const [unMount, setUnMount] = React.useState(false);
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.sessionStore.user);

  return (
    <SlideTransition unMount={unMount}>
      <div className="flex gap-x-3 items-center">
        <GoBack setUnMount={setUnMount} />
        <div className="page-title font-bold text-lg text-center">Profile</div>
      </div>
      <div className="content my-10">
        <div className="flex flex-col justify-center items-center text-center gap-2">
          <div className="profile-image relative">
            <Avatar
              src={ProfileImage}
              size="large"
              className={`bg-[${stringToColor(
                "Timi James"
              )}] p-2 [&_img]:rounded-full shadow-lg !w-24 !h-24`}
            >
              {"Timi James".at(0)?.toUpperCase()}
            </Avatar>
            <EditButton className="bottom-0 right-0" />
          </div>
          <Divider />
        </div>
      </div>
      <section className="form flex flex-col gap-y-4">
        <div className="form-group">
          <label htmlFor="full-name" className="font-semibold text-gray-500">
            Full Name
          </label>
          <div className="holder relative  mt-2">
            <Input
              size="large"
              id="full-name"
              value={"Timi James"}
              disabled
              className="rounded-lg py-3 !bg-gray-200 !text-gray-800 font-bold font-[nunito]"
            />
            <EditButton className="right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="full-name" className="font-semibold text-gray-500">
            Email
          </label>
          <div className="holder relative mt-2">
            <Input
              size="large"
              id="email"
              value={"oderindejames02@gmail.com"}
              disabled
              className="rounded-lg py-3 !bg-gray-200 !text-gray-800 font-bold font-[nunito]"
            />
            <EditButton
              icon="material-symbols:check-circle-rounded"
              className="right-3 top-1/2 -translate-y-1/2 !text-secondary"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="font-semibold text-gray-500">
            Phone Number
          </label>
          <div className="holder relative mt-2">
            <Input
              size="large"
              id="phone"
              value={"+2349017241037"}
              disabled
              className="rounded-lg py-3 !bg-gray-200 !text-gray-800 font-bold font-[nunito]"
            />
            <EditButton
              className="right-3 top-1/2 -translate-y-1/2 !text-secondary"
              icon="carbon:pending-filled"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="full-name" className="font-semibold text-gray-500">
            Gender
          </label>
          <div className="holder relative  mt-2">
            <Input
              size="large"
              id="full-name"
              value={"Male"}
              disabled
              className="rounded-lg py-3 !bg-gray-200 !text-gray-800 font-bold font-[nunito]"
            />
            <EditButton className="right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </section>
      {/* <div className="profile-wrapper">
      </div> */}
    </SlideTransition>
  );
}

export default Profile;
