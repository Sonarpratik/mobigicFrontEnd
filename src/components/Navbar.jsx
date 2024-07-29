import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userToken, user } = useSelector(
    (state) => state.user
  );
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "teal",
        padding: "10px",
        color: "white",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "20px" }}>
        <Link to={"/"}>
        Mobigic
        </Link>
         =<Link to="/download">Download url Link</Link>
      </h1>
      {user?._id ? (
        <div style={{ cursor: "pointer" }} onClick={() => dispatch(logout())}>
          Logout
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
