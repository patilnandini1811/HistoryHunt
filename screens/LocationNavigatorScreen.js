

import React, { useEffect, useState, useContext } from "react";
import { View, Button, Alert } from "react-native";
import * as http from "./../util/http";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";



import { HuntContext } from "../store/HuntContext";
import { UserContext } from "../store/UserContext";
import { fetchRouteDirections } from "../util/location";

import Popup from "../components/ui/Popup";
import MapView, { Marker, Polyline } from "react-native-maps";

const LocalNavigatorScreen = ({ route }) => {
  const navigation = useNavigation();
  const { details } = route.params;
  const [userLocation, setUserLocation] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [ popupStage, setPopupStage ] = useState(1);
  const [isCameraVisible, setIsCameraVisible] = useState(false);

  const { completeHunt } = useContext(HuntContext);

  const { currentUser } = useContext(UserContext);

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

  const toRad = (value) => {
    return (value * Math.PI) / 180;
  };

  const isUserNearDestination = (
    userLocation,
    destinationLocation,
    thresholdInMeters = 5000
  ) => {
    const R = 6371000;
    const dLat = toRad(destinationLocation.latitude - userLocation.latitude);
    const dLon = toRad(destinationLocation.longitude - userLocation.longitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(userLocation.latitude)) *
        Math.cos(toRad(destinationLocation.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return distance <= thresholdInMeters;
  };

  const handleDestinationClick = async () => {
    try {
      const coordinates = await fetchRouteDirections(
        userLocation,
        destination.coordinate
      );

      setSelectedDestination(destination);
      setRouteCoordinates(coordinates);

      if (isUserNearDestination(userLocation, destination.coordinate)) {
        setPopupStage(1);
        setPopupVisible(true);
      }
    } catch (error) {
      console.error("Failed to fetch route:", error);
    }
  };

  const handleConfirm = async () => {
    if (popupStage === 1) {
      setPopupStage(2);
      setIsCameraVisible(true);
    } else {
      setPopupVisible(false);
      setPopupStage(1);

      const huntId = details.id;
      const userId = currentUser.id;

      await http.completeHunt(huntId, userId);

      navigation.navigate("Start");
    }
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
        <Marker
          coordinate={userLocation}
          title="You are here"
          pinColor="blue"
        />
        <Marker
          coordinate={destination.coordinate}
          title={destination.name}
          onPress={handleDestinationClick}
        />
        {routeCoordinates.length > 1 && (
          <Polyline coordinates={routeCoordinates} />
        )}
      </MapView>
      <Popup
        isVisible={isPopupVisible}
        header={popupStage === 1 ? "Take a Photo" : "Final Step"}
        text={
          popupStage === 1
            ? "Walk to the area where the hunt was described."
            : "Nice! Have you been taking the photo?"
        }
        answer={popupStage === 1 ? "Ok, I'm here" : "Yes"}
        onClose={() => {
          setPopupVisible(false);
          setPopupStage(1);
        }}
        onConfirm={handleConfirm}
      />
    </View>
  );
};

export default LocalNavigatorScreen;