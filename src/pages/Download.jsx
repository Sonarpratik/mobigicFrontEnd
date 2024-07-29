import { Button, Input, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { url } from "../features/url";
import { handleDownloadFIle } from "../atom/State";

const Download = () => {
  const [inputValue, setInputValue] = useState();
  const handleDownload = async () => {
    console.log(inputValue);
    const response = await axios.get(`${url}/api/upload/${inputValue}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        "Content-Type": "application/json",
      },
    });
    if (response?.data?.file?.length > 0) {
      // const url2 = `${url}/${response?.data?.file}`;
      handleDownloadFIle(response?.data?.file)
 

      message.success("File downloaded successfully");
    } else {
      message.error("Something went wrong or code is incorrect");
    }
  };
  return (
    <div>
      <label>Enter Code TO Download</label>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <Button
        type="primary"
        style={{ marginTop: "20px" }}
        onClick={handleDownload}
      >
        Download
      </Button>
    </div>
  );
};

export default Download;
