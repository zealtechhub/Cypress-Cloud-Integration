import { Icon } from "@iconify/react";
import { Button } from "antd";
import React from "react";

function GoBack(props: {
  setUnMount: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Button
      shape="circle"
      className=" !grid !place-items-center"
      onClick={() => props.setUnMount(true)}
      icon={
        <Icon
          icon={"material-symbols:arrow-back-ios-rounded"}
          height={16}
          className="inline-block ml-1"
          color="inherit"
        />
      }
    />
  );
}

export default GoBack;
