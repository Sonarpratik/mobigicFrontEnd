import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Expand, getUser, userLogin } from "./authfunctions/userLogin";


const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken', 'role')
    : null;



const initialState = {
    loading: true,
    user: JSON.parse(localStorage.getItem("user")),
    userToken: localStorage.getItem("userToken"),
    isAuthenticated: false,
    expand:true

};


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state, action) => {
            localStorage.removeItem("userToken");
            localStorage.removeItem("user");
            return {
                ...state,
                userToken: "",
                user: "",
                loading: false,
                isAuthenticated: false,
                expand:true
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(userLogin.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.isAuthenticated = true;
                // state.user = payload;
                state.userToken = payload.userToken;
            })
            .addCase(userLogin.rejected, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.userToken = null;
                state.user = null;
            })

            //   get user
            .addCase(getUser.pending, (state) => {
                state.loading = true;
            })
          
            .addCase(Expand.fulfilled, (state, action) => {
                state.expand = action.payload;
              })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
         

                // state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.userToken = null;
            });
    },
});

export const { logout } = userSlice.actions;

// export default userSlice.reducer;
export default userSlice.reducer;