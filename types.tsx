import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Movies: undefined;
  Search: undefined;
  Details: {
    imdbID: string;
    title: string;
  };
};

export type MoviesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Movies"
>;

export type SearchScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Search"
>;

export type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Details"
>;
