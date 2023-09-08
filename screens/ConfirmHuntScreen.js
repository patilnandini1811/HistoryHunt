// import { Text, View, Image } from "react-native";

// import { createLocationUrl } from "../util/location";
// import Button from "../components/ui/Button";

// const ConfirmHuntScreen = ({ route, navigation }) => {
//   const { details } = route.params;
//   const huntLocationUrl = createLocationUrl(details.location);

  

  
// const continueHandler = async () => {
//     navigation.navigate("LocationNavigator");
// };
//   return (
//     <View>
//       <Text>Confirm Hunt</Text>
//       <Text> You picked:</Text>
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
//======================================================================================================
// import { Text, View, Image } from "react-native";

// import { createLocationUrl } from "../util/location";
// import Button from "../components/ui/Button";
// // import { useEffect, useState } from "react";

// const ConfirmHuntScreen = ({ route, navigation }) => {
//   const { details } = route.params;
//   const huntLocationUrl = createLocationUrl(details.location);

//   const continueHandler = async () => {
//     navigation.navigate("LocationNavigator", { details: details });
//   };

//   return (
//     <View>
//       <Text>Confirm Hunt</Text>
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
//==========================================New Style======================================================
import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

import { createLocationUrl } from "../util/location";
import Button from "../components/ui/Button";

const ConfirmHuntScreen = ({ route, navigation }) => {
  const { details } = route.params;
  const huntLocationUrl = createLocationUrl(details.location);

  const continueHandler = async () => {
    navigation.navigate("LocationNavigator", { details: details });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Hunt</Text>
      <Text style={styles.label}>You picked:</Text>
      <Text style={styles.info}>{details.name}</Text>
      <Text style={styles.label}>Here is the route you will be taking</Text>
      <Image
        style={styles.image}
        source={{ uri: huntLocationUrl }}
      />

      <Text style={styles.label}>{details.location.address}</Text>

      <Text style={styles.label}>You should take approximately</Text>
      <Text style={styles.info}>{details.estimatedTime}</Text>
      <Button onPress={continueHandler} style={styles.button}>Confirm</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  info: {
    fontSize: 16,
    marginVertical: 8,
  },
  image: {
    width: 400,
    height: 200,
    marginVertical: 8,
  },
  button: {
    marginTop: 16,
    backgroundColor: "purple",
    borderRadius: 10,
  },
});

export default ConfirmHuntScreen;
