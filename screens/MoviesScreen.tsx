import { View, Text, ScrollView, Image, Pressable, Button } from "react-native";
import { MoviesScreenProps } from "../types";
import { randomMovies } from "../movies";
import { useFindMoviesQuery } from "../apiSlice";
import { styles } from "../styles";
import { Input, InputField } from "@gluestack-ui/themed";
import { Searchbar } from "react-native-paper";

export const MoviesScreen = ({ navigation }: MoviesScreenProps) => {
  const [movie1, movie2, movie3] = randomMovies();

  const { data, isFetching, isSuccess, isError, error } = useFindMoviesQuery({
    movieName: movie1,
    page: 1,
  });

  const {
    data: data2,
    isFetching: isFetching2,
    isSuccess: isSuccess2,
    isError: isError2,
    error: error2,
  } = useFindMoviesQuery({
    movieName: movie2,
    page: 1,
  });

  const {
    data: data3,
    isFetching: isFetching3,
    isSuccess: isSuccess3,
    isError: isError3,
    error: error3,
  } = useFindMoviesQuery({
    movieName: movie3,
    page: 1,
  });

  let content;
  let contentTitle;
  if (isFetching) {
    content = <Text style={styles.textFont}> "Loading..."</Text>;
  } else if (isSuccess) {
    contentTitle = `"${movie1}" movies`;
    const isFound = data.Response === "True";

    content = isFound ? (
      data.Search.map((movie) => {
        return (
          <View
            key={movie.imdbID}
            style={{
              margin: 5,
              padding: 5,
              width: 160,
              // flex: 1,
            }}
          >
            <Pressable
              onPress={() =>
                navigation.navigate("Details", {
                  imdbID: movie.imdbID,
                  title: movie.Title,
                })
              }
            >
              <Image
                style={{
                  width: 160,
                  height: 200,
                  resizeMode: "stretch",
                }}
                source={{
                  uri: movie.Poster,
                }}
                alt={`image of ${movie.Title}`}
              />
              <Text style={{ fontSize: 15 }}>{movie.Title}</Text>
            </Pressable>
            {/*<Text style={{ fontSize: 20 }}>{movie.imdbID}</Text> */}
          </View>
        );
      })
    ) : (
      <Text style={styles.textFont}>{data.Error}</Text>
    );
  } else if (isError) {
    content = <Text style={styles.textFont}>{error.toString()}</Text>;
  }

  let content2;
  let contentTitle2;
  if (isFetching2) {
    content2 = <Text style={styles.textFont}> "Loading..."</Text>;
  } else if (isSuccess2) {
    contentTitle2 = `"${movie2}" movies`;

    const isFound = data2.Response === "True";

    content2 = isFound ? (
      data2.Search.map((movie) => {
        return (
          <View
            key={movie.imdbID}
            style={{
              margin: 5,
              padding: 5,
              width: 160,
              // flex: 1,
            }}
          >
            <Pressable
              onPress={() =>
                navigation.navigate("Details", {
                  imdbID: movie.imdbID,
                  title: movie.Title,
                })
              }
            >
              <Image
                style={{
                  width: 160,
                  height: 200,
                  resizeMode: "stretch",
                }}
                source={{
                  uri: movie.Poster,
                }}
                alt={`image of ${movie.Title}`}
              />
              <Text style={{ fontSize: 15 }}>{movie.Title}</Text>
            </Pressable>
            {/*<Text style={{ fontSize: 20 }}>{movie.imdbID}</Text> */}
          </View>
        );
      })
    ) : (
      <Text style={styles.textFont}>{data2.Error}</Text>
    );
  } else if (isError2) {
    content2 = <Text style={styles.textFont}>{error2.toString()}</Text>;
  }

  let content3;
  let contentTitle3;

  if (isFetching3) {
    content3 = <Text style={styles.textFont}> "Loading..."</Text>;
  } else if (isSuccess3) {
    contentTitle3 = `"${movie3}" movies`;

    const isFound = data3.Response === "True";

    content3 = isFound ? (
      data3.Search.map((movie) => {
        return (
          <View
            key={movie.imdbID}
            style={{
              margin: 5,
              padding: 5,
              width: 160,
              // flex: 1,
            }}
          >
            <Pressable
              onPress={() =>
                navigation.navigate("Details", {
                  imdbID: movie.imdbID,
                  title: movie.Title,
                })
              }
            >
              <Image
                style={{
                  width: 160,
                  height: 200,
                  resizeMode: "stretch",
                }}
                source={{
                  uri: movie.Poster,
                }}
                alt={`image of ${movie.Title}`}
              />
              <Text style={{ fontSize: 15 }}>{movie.Title}</Text>
            </Pressable>
            {/*<Text style={{ fontSize: 20 }}>{movie.imdbID}</Text> */}
          </View>
        );
      })
    ) : (
      <Text style={styles.textFont}>{data3.Error}</Text>
    );
  } else if (isError3) {
    content3 = <Text style={styles.textFont}>{error3.toString()}</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Pressable onPress={() => navigation.navigate("Home")}>
        <Input
          variant="rounded"
          size="sm"
          isReadOnly={true}
          style={{ margin: 5 }}
        >
          <InputField
            placeholder="Search Movies"
            onPressIn={() => navigation.navigate("Home")}
          />
        </Input>
      </Pressable>

      <ScrollView style={{ flex: 1 }}>
        <Text style={styles.textFont}> {contentTitle}</Text>
        <ScrollView horizontal>{content}</ScrollView>

        <Text style={styles.textFont}>{contentTitle2}</Text>
        <ScrollView horizontal>{content2}</ScrollView>
        <Text style={styles.textFont}> {contentTitle3}</Text>
        <ScrollView horizontal>{content3}</ScrollView>
      </ScrollView>
    </View>
  );
};
