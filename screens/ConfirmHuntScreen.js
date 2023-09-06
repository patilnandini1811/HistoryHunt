import { Text, View } from "react-native";
import Button from "../components/ui/Button";

const ConfirmHuntScreen = ({ route }) => {
  const { details } = route.params;

  //TODO

  //Adding Real map here
  //Real Address should added for userlocation
  //Real Address should added for hunt
  //Adding function or navigation to button
  //Design

  return (
    <View>
      <Text>Confirm Hunt</Text>
      <Text>You picked:</Text>
      <Text>{details.name}</Text>
      <Text>Here is the route you will be taking</Text>
      <Text>Map here</Text>
      <Text>User location address</Text>
      <Text>Hunt address</Text>

      <Text>You should take approximately</Text>
      <Text>{details.estimatedTime}</Text>
      <Button>Confirm</Button>
    </View>
  );
};

export default ConfirmHuntScreen;
