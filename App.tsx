import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, "Details">;

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20 }}>
        Open up App.tsx to start working on your app!!!
      </Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const DetailsScreen = ({ navigation }: DetailsScreenProps) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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
