import { Text, View, Button, Image } from "react-native";
import { styles } from "../styles";
import { DetailsScreenProps } from "../types";
import { useMovieDetailsQuery } from "../apiSlice";

export const DetailsScreen = ({ route, navigation }: DetailsScreenProps) => {
  const { imdbID } = route.params;

  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useMovieDetailsQuery(imdbID);

  let content;
  if (isFetching) {
    content = <Text style={styles.textFont}> "Loading..."</Text>;
  } else if (isSuccess) {
    content = (
      <>
        <Image
          style={{
            width: 300,
            height: 430,
            resizeMode: "stretch",
          }}
          source={{
            uri: data.Poster,
          }}
          alt={`image of ${data.Title}`}
        />
        <Text style={styles.textFont}> Title: {data.Title} </Text>
        <Text style={styles.textFont}> Year: {data.Year}</Text>
        <Text style={styles.textFont}> Rated: {data.Rated}</Text>
        <Text style={styles.textFont}> Released: {data.Released}</Text>
        <Text style={styles.textFont}> Plot: {data.Plot}</Text>
      </>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.textFont}>Details Screen</Text> */}
      {content}
    </View>
  );
};
