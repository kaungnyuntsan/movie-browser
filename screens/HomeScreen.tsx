import { Text, View, Button, ScrollView, Image, Pressable } from "react-native";
import { styles } from "../styles";
import { HomeScreenProps } from "../types";
import { useState } from "react";
import { useFindMoviesQuery } from "../apiSlice";
import { Searchbar } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useFindMoviesQuery(searchQuery);

  let content;
  if (isLoading) {
  } else if (isFetching) {
    content = <Text style={styles.textFont}> "Loading..."</Text>;
  } else if (isSuccess) {
    // console.log(data);
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
    <View style={{}}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      {/* <Button title="searchQuery" onPress={() => console.log(searchQuery)} />
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate("Details", {
            itemId: 86,
            description: "some text",
          })
        }
      /> */}
      {/* <ScrollView style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}> */}
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
            justifyContent: "center",
          }}
        >
          {content}
        </View>
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
};
