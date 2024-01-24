import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Movies: undefined;
  Home: undefined;
  Details: {
    imdbID: string;
    title: string;
  };
};

export type MoviesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Movies"
>;

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;

export type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Details"
>;
