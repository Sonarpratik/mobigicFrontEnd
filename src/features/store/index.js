import { configureStore } from "@reduxjs/toolkit";
import { allApi } from "../allApi"; 
import userReducer from "../userSlice";

const store = configureStore({
    reducer: {
      user: userReducer,
      [allApi.reducerPath]: allApi.reducer,
    },
    
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(allApi.middleware);
    },
  });
  
  export default store;

export {
   //All Api
   useFetchFileQuery,
 
  useCreateUserMutation,
  useDeleteFileMutation,

} from "../allApi";