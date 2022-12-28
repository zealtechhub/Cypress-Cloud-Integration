import React from "react";
import PropTypes from "prop-types";

ProtectedRoute.propTypes = {
  name: PropTypes.string,
};

interface ProtectedRouteInterface {
  children: React.ReactNode;
}

function ProtectedRoute(props: ProtectedRouteInterface) {
  console.debug("Protected Route");
  return <>{props.children}</>;
}

export default React.memo(ProtectedRoute, () => true);
