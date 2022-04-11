import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/user",
  }),
  tagTypes: ["user"],
  requestId: "userApi",
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => {
        return {
          url: "/login",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useLoginMutation } = userApi;
