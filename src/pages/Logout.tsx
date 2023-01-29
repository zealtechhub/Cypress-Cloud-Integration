import React from "react";
import Loading from "src/components/Loading";

function Logout() {
  const [unMount, setUnMount] = React.useState(false);
  return <Loading text={"Logging Out👋👋👋"} />;
}

export default Logout;
