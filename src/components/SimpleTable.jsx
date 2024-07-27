import React, { useState } from "react";
import "./table.css";
import { Table, Input, Select, Button } from "antd";
import { useDispatch } from "react-redux";

const SimpleTable = ({
  columns,
  data,
  size,
  x,
  pagination,
  page,
  dispatchFun,
  count,
}) => {
  const dispatch = useDispatch();

  return (
    <>
      {pagination ? (
        <Table
          columns={columns}
          dataSource={data}
          rowKey="_id"
          size={size}
          scroll={{ x: x ? x : 800 }}
          pagination={{
            total: count,
            pageSize: 10,
            current: page,
            onChange: (page) => {
              dispatch(dispatchFun(page));

            },
          }}
        />
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          rowKey="_id"
          size={size}
          scroll={{ x: x ? x : 1200 }}
        />
      )}
    </>
  );
};

export default SimpleTable;
