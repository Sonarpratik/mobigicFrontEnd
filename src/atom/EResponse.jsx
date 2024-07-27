import { message } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EResponse = ({ Response, type, cancel, navigateTo, error }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (Response?.isSuccess) {
      if (type === "create") {
        message.success("Created");
      }
       else if (type === "update") {
        message.success("Updated");
      }
       else if (type === "delete") {
        message.success("Deleted");
      }
      if (navigateTo?.length > 0) {
        navigate(navigateTo);
      }
      if (typeof cancel === "function") {
        cancel();
      }
      
    }

    if (Response?.isError) {
      if (error?.length > 0) {
        message.error(error);
      } else {
        message.error("Something Went Wrong");
      }
    }
  }, [Response]);
  return null;
};

export default EResponse;
