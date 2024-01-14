import { Text, View, Button, ScrollView } from "react-native";
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
            <Text style={styles.textFont} key={movie.imdbID}>
              {movie.Title}
            </Text>
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
      <Button title="searchQuery" onPress={() => console.log(searchQuery)} />
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate("Details", {
            itemId: 86,
            description: "some text",
          })
        }
      />
      <ScrollView>{content}</ScrollView>

      <StatusBar style="auto" />
    </View>
  );
};
