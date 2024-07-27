import { Button, Input, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { url } from "../features/url";

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
      const url2 = `${url}/${response?.data?.file}`;
      try {
        // Fetch the file
        const response = await fetch(url2);
        if (!response.ok) throw new Error('Network response was not ok.');
  
        // Get the content type from headers
        const contentType = response.headers.get('Content-Type');
        const fileExtension = contentType ? contentType.split('/')[1] : 'unknown';
  
        // Convert the response to a Blob
        const blob = await response.blob();
  
        // Create a link element
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `downloaded_file.${fileExtension}`; // Dynamically set the file extension
  
        // Append the link to the body
        document.body.appendChild(link);
  
        // Programmatically click the link to trigger the download
        link.click();
  
        // Clean up
        URL.revokeObjectURL(link.href); // Revoke the Object URL
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading the file:', error);
      }

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
