import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const APIKEY = "1b76f802";

type Movies = {
  Search: {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }[];
  totalResults: string;
  Response: string;
  Error?: string;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://omdbapi.com/",
  }),
  endpoints: (builder) => ({
    findMovies: builder.query<Movies, string>({
      query: (movieName) => `?apikey=${APIKEY}&s=${movieName}`,
    }),
  }),
});

export const { useFindMoviesQuery } = apiSlice;
