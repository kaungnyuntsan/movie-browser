import { Text, View, Button, Image, FlatList } from "react-native";
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
    const DATA = [data];

    content = (
      <FlatList
        data={DATA}
        renderItem={({ item }) => {
          return (content = (
            <View style={{ flex: 1 }}>
              <View style={{ alignItems: "center" }}>
                <Image
                  style={{
                    width: 300,
                    height: 430,
                    resizeMode: "stretch",
                  }}
                  source={{
                    uri: item.Poster,
                  }}
                  alt={`image of ${item.Title}`}
                />
                <Text style={styles.detailFormat}> {item.Title} </Text>
              </View>
              <Text style={styles.detailFormat}> Year: {item.Year}</Text>
              <Text style={styles.detailFormat}> Rated: {item.Rated}</Text>
              <Text style={styles.detailFormat}>
                {" "}
                Released: {item.Released}
              </Text>
              <Text style={styles.detailFormat}> Runtime: {item.Runtime}</Text>
              <Text style={styles.detailFormat}> Genre: {item.Genre}</Text>
              <Text style={styles.detailFormat}>
                {" "}
                Director: {item.Director}
              </Text>
              <Text style={styles.detailFormat}> Plot: {item.Plot}</Text>
              <Text style={styles.detailFormat}>
                {" "}
                Language: {item.Language}
              </Text>
              <Text style={styles.detailFormat}> Writer: {item.Writer}</Text>
              <Text style={styles.detailFormat}> Actors: {item.Actors}</Text>
              <Text style={styles.detailFormat}> Country: {item.Country}</Text>
              <Text style={styles.detailFormat}> Awards: {item.Awards}</Text>
              <Text style={styles.detailFormat}>
                {" "}
                Metascore : {item.Metascore}
              </Text>
              <Text style={styles.detailFormat}>
                {" "}
                imdbRating : {item.imdbRating}
              </Text>
              <Text style={styles.detailFormat}>
                {" "}
                imdbVotes : {item.imdbVotes}
              </Text>
              <Text style={styles.detailFormat}> imdbID : {item.imdbID}</Text>
              <Text style={styles.detailFormat}> Type : {item.Type}</Text>
              <Text style={styles.detailFormat}> DVD : {item.DVD}</Text>
              <Text style={styles.detailFormat}>
                {" "}
                BoxOffice : {item.BoxOffice}
              </Text>
            </View>
          ));
        }}
      />
    );
  }

  return <View style={styles.container}>{content}</View>;
};
