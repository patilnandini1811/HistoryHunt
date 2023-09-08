import React, { useEffect, useState } from "react";
import { View, Button, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";

const LocationNavigatorScreen = ({ route }) => {
  const { details } = route.params;
  console.log("check", details);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  const destination = {
    name: details.name,
    coordinate: {
      latitude: details.location.lat,
      longitude: details.location.lng,
    },
  };

  useEffect(() => {
    const getUserLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Permission to access location was denied."
        );
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      setUserLocation({ latitude, longitude });
    };

    getUserLocation();
  }, []);

  const handleDestinationClick = () => {
    setSelectedDestination(destination);
    setRouteCoordinates([
      { latitude: userLocation.latitude, longitude: userLocation.longitude },
      {
        latitude: destination.coordinate.latitude,
        longitude: destination.coordinate.longitude,
      },
    ]);
  };

  if (!userLocation) {
    return (
      <View>
        <Button title="Loading..." />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={userLocation} title="You are here" />
        <Marker
          coordinate={destination.coordinate}
          title={destination.name}
          onPress={handleDestinationClick}
        />
        {routeCoordinates.length > 1 && (
          <Polyline coordinates={routeCoordinates} />
        )}
      </MapView>
    </View>
  );
};

export default LocationNavigatorScreen;