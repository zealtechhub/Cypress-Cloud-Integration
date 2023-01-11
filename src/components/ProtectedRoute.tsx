import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router";
import { useAppSelector } from "@lib/redux/store";

ProtectedRoute.propTypes = {
  name: PropTypes.string,
};

interface ProtectedRouteInterface {
  children: React.ReactNode;
}

function ProtectedRoute(props: ProtectedRouteInterface) {
  const user = useAppSelector((state) => state.sessionStore.user);
  if (!user) return <Navigate to="/auth" replace />;

  return <>{props.children}</>;
}

export default React.memo(ProtectedRoute, () => true);
