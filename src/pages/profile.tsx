import React from "react";
import { Avatar, Divider, Space, Tag } from "antd";
import Button from "antd/lib/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
import stringToColor from "src/lib/stringToColor";
import { Icon } from "@iconify/react";
import { useAppSelector } from "src/lib/redux/store";

function Profile() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.sessionStore.user);

  if (!user) return <Navigate to={"/sign-in"} />;

  return (
    <div className="profile-wrapper">
      <div className="back">
        <Button type="text" onClick={() => navigate(-1)}>
          <Space>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m10.875 19.3l-6.6-6.6q-.15-.15-.213-.325Q4 12.2 4 12t.062-.375q.063-.175.213-.325l6.6-6.6q.275-.275.687-.288q.413-.012.713.288q.3.275.313.687q.012.413-.288.713L7.4 11h11.175q.425 0 .713.287q.287.288.287.713t-.287.712Q19 13 18.575 13H7.4l4.9 4.9q.275.275.288.7q.012.425-.288.7q-.275.3-.7.3q-.425 0-.725-.3Z"
              />
            </svg>
            <span>Back</span>
          </Space>
        </Button>
      </div>
      <div className="wrap">
        <div className="head flex flex-col justify-center items-center text-center gap-2">
          <Link to={"/profile"}>
            <Avatar
              src={""}
              size="large"
              className={`bg-[${stringToColor("Timi James")}]`}
            >
              {user.name.at(0)?.toUpperCase()}
            </Avatar>
          </Link>
          <div className="name">
            <div className="name font-bold text-gray-800 ml-2">{user.name}</div>
            <div className="email text-gray-500 font-bold text-xs ml-2">
              {user.email}
            </div>
          </div>

          <Divider />
        </div>
        <div className="tags flex">
          <div className="tag flex justify-center gap-x-2 px-3 rounded-xl py-1 bg-sky-100 items-center font-bold text-gray-700">
            <Icon icon={"material-symbols:phone-enabled"} />
            <span>{user.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
