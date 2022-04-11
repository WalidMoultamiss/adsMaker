import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const livraisonApi = createApi({
  reducerPath: "livraisonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/livraison",
  }),
  tagTypes: ["livraison"],
  requestId: "livraisonApi",
  endpoints: (builder) => ({
    getAllLivraison: builder.mutation({
      query: (body) => {
        return {
          url: "/",
          method: "GET",
          body,
        };
      },
    }),
  }),
});

export const { getAllLivraison } = livraisonApi;
