import { Text, View, Button, ScrollView, Image, Pressable } from "react-native";
import { styles } from "../styles";
import { HomeScreenProps } from "../types";
import { useState } from "react";
import { useFindMoviesQuery } from "../apiSlice";
import { Searchbar } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

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
      {/* <Button title="consoleMoviePage" onPress={() => console.log(moviePage)} /> */}
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
      <View style={{ marginBottom: 20 }}>
        {searchQuery && isSuccess && +data.totalResults > 10 && (
          <Button title="next" onPress={() => setMoviePage(moviePage + 1)} />
        )}
        {moviePage > 1 && (
          <Button
            title="previous"
            onPress={() => setMoviePage(moviePage - 1)}
          />
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
};
