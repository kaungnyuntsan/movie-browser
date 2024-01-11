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
  const { data, isFetching, isSuccess, isError, error } =
    useFindMoviesQuery("superman");

  let content;
  if (isFetching) {
    content = <Text style={styles.textFont}> "fetching..."</Text>;
  } else if (isSuccess) {
    console.log(data);
    content = data.Search.map((movie) => {
      return (
        <Text style={styles.textFont} key={movie.imdbID}>
          {movie.Title}
        </Text>
      );
    });
  } else if (isError) {
    content = <Text style={styles.textFont}>{error.toString()}</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView>{content}</ScrollView>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate("Details", {
            itemId: 86,
            description: "some text",
          })
        }
      />
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
