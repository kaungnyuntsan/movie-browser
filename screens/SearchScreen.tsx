import { Text, View, Button, FlatList, Image, Pressable } from "react-native";
import { styles } from "../styles";
import { SearchScreenProps } from "../types";
import { useState } from "react";
import { useFindMoviesQuery } from "../apiSlice";
import { Searchbar } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Movie } from "../Movie";
import type { movieType } from "../apiSlice";

export const SearchScreen = ({ navigation }: SearchScreenProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [moviePage, setMoviePage] = useState(1);
  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useFindMoviesQuery({ movieName: searchQuery, page: moviePage });

  const renderItem = ({ item }: { item: movieType }) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("Details", {
            imdbID: item.imdbID,
            title: item.Title,
          })
        }
      >
        <Movie item={item} />
      </Pressable>
    );
  };

  let content;
  if (isLoading) {
  } else if (isFetching) {
    content = <Text style={styles.textFont}> "Loading..."</Text>;
  } else if (isSuccess) {
    const isFound = data.Response === "True";

    const DATA = data.Search;

    content = isFound ? (
      <FlatList data={DATA} renderItem={renderItem} numColumns={2} />
    ) : (
      searchQuery !== "" && <Text style={styles.textFont}>{data.Error}</Text>
    );
  } else if (isError) {
    content = <Text style={styles.textFont}>{error.toString()}</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Searchbar
        placeholder="Search Movies"
        onChangeText={(searchQuery) => {
          setSearchQuery(searchQuery);
          setMoviePage(1);
        }}
        value={searchQuery}
        onClearIconPress={() => setMoviePage(1)}
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={true}
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

      <View
        style={{
          flex: 1,
        }}
      >
        {content}
      </View>

      <StatusBar style="auto" />
    </View>
  );
};
