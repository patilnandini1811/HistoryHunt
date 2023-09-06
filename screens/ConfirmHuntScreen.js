import { Text, View } from "react-native";
import Button from "../components/ui/Button";

const ConfirmHuntScreen = ({ route }) => {
  const { details } = route.params;

  

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
// import { Text, View, Image } from "react-native"; changes 06/09

// import { createLocationUrl } from "../util/location";
// import Button from "../components/ui/Button";

// const ConfirmHuntScreen = ({ route, navigation }) => {
//   const { details } = route.params;
//   const huntLocationUrl = createLocationUrl(details.location);

//   const continueHandler = async () => {
//     navigation.navigate("LocalPosition");
//   };

//   
//  const ConfirmHuntScreen = ({ route }) => {
//       <Text>You picked:</Text>
//       <Text>{details.name}</Text>
//       <Text>Here is the route you will be taking</Text>
//       <Image
//         style={{ width: 400, height: 200 }}
//         source={{ uri: huntLocationUrl }}
//       />

//       <Text>{details.location.address}</Text>

//       <Text>You should take approximately</Text>
//       <Text>{details.estimatedTime}</Text>
//       <Button onPress={continueHandler}>Confirm</Button>
//     </View>
//   );
// };
// export default ConfirmHuntScreen;