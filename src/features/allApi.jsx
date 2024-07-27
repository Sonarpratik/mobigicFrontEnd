import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "./url";

const allApi = createApi({
  reducerPath: "allapis",
  baseQuery: fetchBaseQuery({ baseUrl: `${url}` }),
  refetchOnMountOrArgChange: true,
  tagTypes: ["File","User"],
  endpoints(build) {
    return {
      fetchFile: build.query({
        query: () => {
          return {
            url: `/api/upload`,
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
              "Content-Type": "application/json",
            },
          };
        },
        providesTags: (result = [], error, arg) =>
          result?.length
            ? [
                ...result?.map(({ _id }) => ({ type: "File", _id })),
                "File",
              ]
            : ["File"],
      }),
      createUser: build.mutation({
        query: (createJobcardData) => {
          return {
            url: `/auth/register`,
            method: "POST",
            body: createJobcardData,
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
              "Content-Type": "application/json",
            },
          };
        },
        invalidatesTags: (result, error, arg) => [
          { type: "User", _id: arg._id },
        ],
      }),
      deleteFile: build.mutation({
        query: (file) => {
          return {
            url: `/api/upload/${file?._id}`,
            method: "DELETE",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
              "Content-Type": "application/json",
            },
          };
        },
        invalidatesTags: (result, error, arg) => [
          { type: "File", _id: arg._id },
        ],
      }),
     
    };
  },
});

export const {
  useFetchFileQuery,
  useCreateUserMutation,
  useDeleteFileMutation,
} = allApi;
export { allApi };
