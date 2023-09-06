import { FlatList, View, Text } from "react-native";

import PlaceItem from "./PlaceItem";

const PlacesList = ({ places }) => {
  if (!places || places.length < 1) {
    return (
      <View>
        <Text>No places added yet!</Text>
      </View>
    )
  }
  /* 
    console.log("Places:", places); */

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} />}
    />
  )
};

export default PlacesList;