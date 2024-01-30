import { View, Image, Text } from "react-native";
import { movieType } from "./apiSlice";

export const Movie = ({ item }: { item: movieType }) => {
  return (
    <View
      key={item.imdbID}
      style={{
        margin: 5,
        padding: 5,
        width: 160,
      }}
    >
      <Image
        style={{
          width: 160,
          height: 200,
          resizeMode: "stretch",
        }}
        source={{
          uri: item.Poster,
        }}
        alt={`image of ${item.Title}`}
      />
      <Text style={{ fontSize: 15 }}>{item.Title}</Text>
    </View>
  );
};
