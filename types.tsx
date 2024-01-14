import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Details: {
    itemId: number;
    description: string;
  };
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;

export type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Details"
>;
