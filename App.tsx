import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useFindMoviesQuery } from "./apiSlice";
import { Provider } from "react-redux";
import store from "./store";
import { Searchbar } from "react-native-paper";

type RootStackParamList = {
  Home: undefined;
  Details: {
    itemId: number;
    description: string;
  };
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, "Details">;

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeScreen = ({ navigation }: HomeScreenProps) => {
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

const DetailsScreen = ({ route, navigation }: DetailsScreenProps) => {
  const { itemId, description } = route.params;

  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Text>itemId : {JSON.stringify(itemId)}</Text>
      <Text>description : {JSON.stringify(description)}</Text>
      <Text>Details Screen</Text>

      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textFont: {
    fontSize: 20,
  },
});

export default App;
