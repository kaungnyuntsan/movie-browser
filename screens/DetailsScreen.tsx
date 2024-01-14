import { Text, View, Button } from "react-native";
import { styles } from "../styles";
import { DetailsScreenProps } from "../types";

export const DetailsScreen = ({ route, navigation }: DetailsScreenProps) => {
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
