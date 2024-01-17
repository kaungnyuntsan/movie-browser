import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "./store";
import { RootStackParamList } from "./types";
import { DetailsScreen } from "./screens/DetailsScreen";
import { HomeScreen } from "./screens/HomeScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={({ route }) => ({ title: route.params.title })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
