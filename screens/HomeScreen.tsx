import { Text, View, Button, ScrollView, Image, Pressable } from "react-native";
import { styles } from "../styles";
import { HomeScreenProps } from "../types";
import { useState } from "react";
import { useFindMoviesQuery } from "../apiSlice";
import { Searchbar } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { randomMovies } from "../movies";

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [moviePage, setMoviePage] = useState(1);
  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useFindMoviesQuery({ movieName: searchQuery, page: moviePage });

  let content;
  if (isLoading) {
  } else if (isFetching) {
    content = <Text style={styles.textFont}> "Loading..."</Text>;
  } else if (isSuccess) {
    // console.log(data.totalResults);
    const isFound = data.Response === "True";

    content = isFound
      ? data.Search.map((movie) => {
          return (
            <View
              key={movie.imdbID}
              style={{
                margin: 10,
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
      : searchQuery !== "" && <Text style={styles.textFont}>{data.Error}</Text>;
  } else if (isError) {
    content = <Text style={styles.textFont}>{error.toString()}</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Searchbar
        placeholder="Search"
        onChangeText={(searchQuery) => {
          setSearchQuery(searchQuery);
          setMoviePage(1);
        }}
        value={searchQuery}
        onClearIconPress={() => setMoviePage(1)}
      />
      <View
        style={{
          paddingLeft: 5,
          paddingRight: 5,
          flexDirection: "row-reverse",
          justifyContent: "space-between",
        }}
      >
        {searchQuery && isSuccess && +data.totalResults > 10 && (
          <>
            <Button
              title="next"
              onPress={() => setMoviePage(moviePage + 1)}
              disabled={+data.totalResults - moviePage * 10 < 0}
            />

            <Button
              title="previous"
              onPress={() => setMoviePage(moviePage - 1)}
              disabled={moviePage <= 1}
            />
          </>
        )}
      </View>
      {/* <Button title="totalMoviePage" onPress={() => console.log(totalMoviePages)} /> */}
      <ScrollView
        style={
          {
            // flex: 1,
            // flexDirection: "row",
            // flexWrap: "wrap",
          }
        }
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {content}
        </View>
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
};
