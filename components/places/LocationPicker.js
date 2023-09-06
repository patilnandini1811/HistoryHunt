import { View, Text, Button, Image, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import OutlinedButton from "../ui/OutlinedButton";
import { createLocationUrl, getReadableAddress } from "../../util/location";


const LocationPicker = ({ locationHandler }) => {
  const [pickedLocation, setPickedLocation] = useState();
  const [permission, reqPermission] = Location.useForegroundPermissions();
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.params) {
      setPickedLocation({
        lat: route.params.latitude,
        lng: route.params.longitude
      });
    }
  }, [route]);

  useEffect(() => {
    const getLocationDetails = async () => {
      if (pickedLocation) {
        const address = await getReadableAddress(pickedLocation);
        locationHandler({ ...pickedLocation, address });
      };
    };
    getLocationDetails();
  }, [pickedLocation, locationHandler]);


  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View >
        <Text >We need your permission to locate your location</Text>
        <Button onPress={reqPermission} title="grant permission" />
      </View>
    );
  }

  const getLocationHandler = async () => {
    const location = await Location.getCurrentPositionAsync();
    //console.log("LocationPicker", location);
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    })
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  let previewContent = <Text style={styles.text} >No picked location yet</Text>
  if (pickedLocation) {
    previewContent = <Image style={styles.map} source={{ uri: createLocationUrl(pickedLocation) }} />
  }

  return (
    <View style={styles.container}>
      <View style={styles.preview}>{previewContent}</View>
      <View style={styles.buttonContainer}>
        <OutlinedButton icon="location" pressHandler={getLocationHandler}>
          Locate user
        </OutlinedButton>
        <OutlinedButton icon="map" pressHandler={pickOnMapHandler}>
          Pick on map
        </OutlinedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  preview: {
    width: "100%",
    height: 250,
  },
  map: {
    /* Detta krävs för att kartan ska synas */
    width: "100%",
    height: "100%",
  },
  text: {
  textAlign: "center"
  }

});

export default LocationPicker;