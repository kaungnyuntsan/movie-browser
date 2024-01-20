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
    findMovies: builder.query<Movies, { movieName: string; page: number }>({
      query: ({ movieName, page }) =>
        `?apikey=${APIKEY}&s=${movieName}&page=${page}`,
    }),
    movieDetails: builder.query({
      query: (imdbID) => `?apikey=${APIKEY}&i=${imdbID}`,
    }),
  }),
});

export const { useFindMoviesQuery, useMovieDetailsQuery } = apiSlice;
