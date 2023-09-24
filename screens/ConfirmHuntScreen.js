
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
      <View style={styles.wrapper}>
        <Text style={styles.text}>You picked:</Text>
        <Text style={styles.smallText}>{details.name}</Text>
      </View>
      <Text style={styles.label}>Here is the route you will be taking</Text>
      <Image
        style={styles.image}
        source={{ uri: huntLocationUrl }}
      />

      <Text style={styles.label}>{details.location.address}</Text>
<View style={styles.wrapperBottom}>
        <Text style={styles.text}>You should take approximately:</Text>
        <Text style={styles.smallText}>{details.estimatedTime}</Text>
      </View>
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
    backgroundColor:"#d4a6ed"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white",
    borderStyle: "solid",
    borderColor:"black",
    
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
    color:"white"
  },
  info: {
    fontSize: 16,
    marginVertical: 8,
    color:"white"
  },
  wrapper: {
    flexDirection: "row",
    padding: 10,
  },
  wrapperBottom: {
    flexDirection: "row",
    padding: 10,
    paddingBottom: 40,
  },
  image: {
    width: 400,
    height: 300,
    marginVertical: 8,
  },
  button: {
    marginRight: 40, 
    marginLeft: 10,
    backgroundColor: "purple",
    borderRadius: 10,
  },
  
});

export default ConfirmHuntScreen;
