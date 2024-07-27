import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";
import { url } from "../url";
export const userLogin = createAsyncThunk(
    "user/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${accessToken}`,
                },
            };
            const { data } = await axios.post(
                `${url}/auth/login/`,
                { email, password },
                config
            );
            const user = data;
            const { dispatch } = thunkAPI;
            localStorage.setItem("userToken", data?.userToken);
            dispatch(getUser())
            message.success("Login Successfull");
            return user;
        } catch (err) {
            console.log(err);
            message.error("Invalid Credentials");
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);


export const getUser = createAsyncThunk(
    "api/account/me",
    async (_, thunkAPI) => {
        console.log("kion");
        const access = localStorage.getItem("userToken");
        if (!access) {
            localStorage.removeItem("userToken");
            localStorage.removeItem("user");
            return thunkAPI.rejectWithValue("No token")};
        try {
            const res = await fetch(`${url}/auth/verify`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            });
            const data = await res.json();

            localStorage.setItem("user", JSON.stringify(data));
            if (res.status === 200) {
                return { ...data };
            } else {
             
                localStorage.removeItem("userToken");
                localStorage.removeItem("user");

                return thunkAPI.rejectWithValue(data);
            }
        } catch (err) {
            localStorage.removeItem("userToken");
            localStorage.removeItem("user");
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);


export const Expand = createAsyncThunk(
    "expand",
    async (username, thunkAPI) => {
      try {
        // configure header's Content-Type as JSON
  console.log(username)
        console.log("expand", username);
        return username;
      } catch (err) {
        return thunkAPI.rejectWithValue(err);
      }
    }
  );