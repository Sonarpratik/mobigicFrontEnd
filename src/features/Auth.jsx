import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Auth({ children }) {
  const { isAuthenticated, userToken, loading} = useSelector(
    (state) => state.user
  );
  if (loading)
    return (
      <h1 style={{ margin: "2rem", textAlign: "center" }}>
        Loading
      </h1>
    );

  if (
    !isAuthenticated ||
    !userToken
    //JSON.parse(user)?.permission?.some((perm) => perm.model === "STAFF  ")
  ) {
    return <Navigate to={"/login"} />;
  }

  return <>{children}</>;
}

export default Auth;
