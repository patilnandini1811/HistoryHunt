import React, { useEffect, useState,useContext } from "react";
import { View, Button, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { fetchRouteDirections } from "../util/location";
import { useNavigation } from "@react-navigation/native";
import * as http from "./../util/http"
import { HuntContext } from "../store/HuntContext";
import { UserContext } from "../store/UserContext";
import NotificationPopup from "../components/ui/NotificationPopup";

const LocationNavigatorScreen = ({ route }) =>
{
  const navigation = useNavigation();
  const { details } = route.params;
  // console.log("check", details);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [ routeCoordinates, setRouteCoordinates ] = useState([]);
  const [ isNotificationPopupVisible, setNotificationPopupVisible ] = useState(false);
  const [ notificationPopupStage, setnotificationPopupStage ] = useState(1);

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
  
  const toRad = (value) =>
  {
    return (value * Math.PI) / 180;
  };

  const isUserNearDestination = (
    userLocation,
    destinationLocation,
    thresholdInMeters = 50
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
      // console.log("see", coordinates);

      setSelectedDestination(destination);
      setRouteCoordinates(coordinates);

      if (isUserNearDestination(userLocation, destination.coordinate)) {
        setnotificationPopupStage(1);
        setNotificationPopupVisible(true);
      }

    } catch (error) {
      console.error("Failed to fetch route:", error);
    }
  };
  const handleConfirm = async () =>
  {
    if (notificationPopupStage === 1)
    {
      setnotificationPopupStage(2);
    }
    else
    {
      setNotificationPopupVisible(false);
      setnotificationPopupStage(1);
      const huntId = details.id;
      const userId = currentUser.id;
      await http.completeHunt(huntId, userId);
      navigation.navigate('start');
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
        <Marker coordinate={userLocation} title="You are here"
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
      <NotificationPopup
        isVisible={isNotificationPopupVisible}
        header={notificationPopupStage === 1 ? "Take a Photo" : "Final Step"}
        text={
          notificationPopupStage === 1
            ? "Walk to the area where the hunt was described."
            : "Nice! Have you been taking the photo?"
        }
        answer={notificationPopupStage === 1 ? "Ok, I'm here" : "Yes"}
        onClose={() => {
          setNotificationPopupVisible(false);
          setnotificationPopupStage(1);
        }}
        onConfirm={handleConfirm}
      />
    </View>
  );
};

export default LocationNavigatorScreen;

