// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery(),
  endpoints: ({ mutation }) => ({
    postSmthng: mutation({
      query: (body) => {
        return {
          url: "https://httpbin.org/post",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { usePostSmthngMutation } = pokemonApi;
