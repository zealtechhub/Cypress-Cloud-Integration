import { useAppDispatch, useAppSelector } from "src/lib/redux/store";
import { RESIZE } from "src/lib/redux/userSlice";
import React from "react";

function MediaControl() {
  const device = useAppSelector((state) => state.sessionStore.device);
  const dispatch = useAppDispatch();

  const handleWindowResize = React.useCallback(() => {
    let width = window.innerWidth;
    switch (true) {
      // set device to mobile if width is less than 500 and the screen is not mobile screen
      case width < 600 && device !== "mobile":
        dispatch(RESIZE("mobile"));
        break;
      case width > 600 && device !== "desktop":
        dispatch(RESIZE("desktop"));
        break;
    }
  }, [device, dispatch]);

  React.useEffect(() => {
    handleWindowResize();
    window.onresize = handleWindowResize;

    return () => {
      window.onresize = null;
    };
  }, [handleWindowResize]);

  return <></>;
}

export default MediaControl;
