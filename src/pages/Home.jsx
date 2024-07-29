import React, { useState } from "react";
import { useDeleteFileMutation, useFetchFileQuery } from "../features/allApi";
import SimpleTable from "../components/SimpleTable";
import { Button, message } from "antd";
import { url } from "../features/url";
import axios from "axios";
import EResponse from "../atom/EResponse";
import {
   
    EyeFilled,
    DeleteOutlined,
    DownloadOutlined,
  } from "@ant-design/icons";
import { handleDownloadFIle } from "../atom/State";

const Home = () => {
  const {
    data: data,
    isLoading: isLoading,
    isFetching: fetch,
    refetch,
  } = useFetchFileQuery();
  console.log(data);
  const columns = [
    {
      title: <span>Sr. No.</span>,

      dataIndex: "_id",
      width: "70px",
      // fixed: 'left', // Fixed to the left
      key: "_id",
      render: (_id, _, index) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: <span>Six Digit Code</span>,
      dataIndex: "name",
      key: "name",
      // render: (text) => <span className="text-[#010101] font-medium" >{text}</span>,
      render: (text, record) => (
        <div>
          <div
            style={{ color: "var(--color-primary)" }}
            className="font-medium"
          >
            {record?.six_digit_code}
          </div>
        </div>
      ), //
    },
    {
      title: <span>File Name</span>,
      dataIndex: "name",
      key: "name",
      // render: (text) => <span className="text-[#010101] font-medium" >{text}</span>,
      render: (text, record) => (
        <div>
          <div
            style={{ cursor: "pointer", color: "var(--color-primary)" }}
            className="font-medium"
          >
            <a href={`${url}/${record?.file}`} target="_blank">
              {record?.file}
            </a>
          </div>
        </div>
      ), //
    },

    {
      title: "Action",
      key: "edit",
      width: "90px",
      fixed: "right",
      render: (_, record) => (
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <div
            style={{
              display: "flex",
              gap: "5px",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => handleDownloadFIle(record?.file)}
          >
            <DownloadOutlined style={{fontSize:"20px"}}/>
          </div>
          <div
            style={{
              display: "flex",
              gap: "5px",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => deleteTask(record)}
          >
            <DeleteOutlined style={{ color:"red",fontSize:"20px"}}/>
          </div>
        
        </div>
      ),
    },
  ];

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      message.error("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(`${url}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      message.success("File uploaded successfully");
      refetch();
      console.log(response.data);
    } catch (error) {
      message.error("Failed to upload file");
      console.error(error);
    }
  };
  const [deleteTask, GetTaskResponse] = useDeleteFileMutation();

  return (
    <div>
      <EResponse Response={GetTaskResponse} type={"delete"} />

      <div>
        <input type="file" onChange={handleFileChange} />

        <Button
          type="primary"
          onClick={handleUpload}
          style={{ marginLeft: "10px" }}
        >
          Upload File
        </Button>
      </div>
      <SimpleTable data={data} columns={columns} x={800} />
    </div>
  );
};

export default Home;
