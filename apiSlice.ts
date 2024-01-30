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

export type Movie = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

export type movieType = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
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
    movieDetails: builder.query<Movie, string>({
      query: (imdbID) => `?apikey=${APIKEY}&i=${imdbID}`,
    }),
  }),
});

export const { useFindMoviesQuery, useMovieDetailsQuery } = apiSlice;
