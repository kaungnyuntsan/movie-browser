import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Button,
  FlatList,
} from "react-native";
import { MoviesScreenProps } from "../types";
import { randomMovies } from "../movies";
import { useFindMoviesQuery } from "../apiSlice";
import { styles } from "../styles";
import { Input, InputField } from "@gluestack-ui/themed";
import { Searchbar } from "react-native-paper";

const [movie1, movie2, movie3] = randomMovies();

type movieType = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export const MoviesScreen = ({ navigation }: MoviesScreenProps) => {
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

  const Movie = ({ item }: { item: movieType }) => {
    return (
      <View
        key={item.imdbID}
        style={{
          margin: 5,
          padding: 5,
          width: 160,
        }}
      >
        <Pressable
          onPress={() =>
            navigation.navigate("Details", {
              imdbID: item.imdbID,
              title: item.Title,
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
              uri: item.Poster,
            }}
            alt={`image of ${item.Title}`}
          />
          <Text style={{ fontSize: 15 }}>{item.Title}</Text>
        </Pressable>
      </View>
    );
  };

  const renderItem = ({ item }: { item: movieType }) => <Movie item={item} />;

  let content;
  let contentTitle;
  if (isFetching) {
    content = <Text style={styles.textFont}> "Loading..."</Text>;
  } else if (isSuccess) {
    contentTitle = `"${movie1}" movies`;
    const isFound = data.Response === "True";

    const DATA = data.Search;

    content = isFound ? (
      <FlatList horizontal data={DATA} renderItem={renderItem} />
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

    const DATA2 = data2.Search;

    content2 = isFound ? (
      <FlatList horizontal data={DATA2} renderItem={renderItem} />
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

    const DATA3 = data3.Search;

    content3 = isFound ? (
      <FlatList horizontal data={DATA3} renderItem={renderItem} />
    ) : (
      <Text style={styles.textFont}>{data3.Error}</Text>
    );
  } else if (isError3) {
    content3 = <Text style={styles.textFont}>{error3.toString()}</Text>;
  }

  // const DATA = [{
  //   movie1: () => {
  //     return (
  //       <Text style={styles.textFont}> {contentTitle} </Text>

  //     )
  //   }
  // }]

  return (
    <View style={{ flex: 1 }}>
      <Pressable onPress={() => navigation.navigate("Home")}>
        <Input
          variant="rounded"
          size="sm"
          isReadOnly={true}
          style={{ margin: 5 }}
          backgroundColor="white"
        >
          <InputField
            placeholder="Search Movies"
            onPressIn={() => navigation.navigate("Home")}
          />
        </Input>
      </Pressable>

      <ScrollView style={{ flex: 1 }}>
        <Text style={styles.textFont}> {contentTitle}</Text>
        {content}

        <Text style={styles.textFont}>{contentTitle2}</Text>
        {content2}
        <Text style={styles.textFont}> {contentTitle3}</Text>
        {content3}
      </ScrollView>
    </View>
  );
};
