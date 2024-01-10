import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

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

// type GreetProps = {
//   name: string;
// };

interface GreetProps {
  name: string;
  age: number;
  haveMoney: boolean;
}

const Greet = ({ name, age, haveMoney }: GreetProps) => {
  return (
    <View>
      <Text style={{ fontSize: 20 }}> Hello {name}!</Text>
      <Text style={{ fontSize: 20 }}> Age {age + 1}</Text>
      <Text style={{ fontSize: 20 }}>
        {" "}
        {haveMoney ? "I've money!" : "I'm broke!"}
      </Text>
    </View>
  );
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20 }}>
        Open up App.tsx to start working on your app!!!
      </Text>
      <Greet name="jim" age={3} haveMoney={true} />
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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
