import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import IconButton from "../components/ui/IconButton";
import { AuthContext } from "../store/AuthContext";
import {
  getAllPlacesAsync,
  deleteAllPlacesAsync,
  getImageUriFromDatabase,
  deleteAllImagesAsync,
} from "../util/database";
import AuthProfile from "../components/Auth/AuthName";
import ProfileImage from "../components/ScreensComp/ProfileImage";
import AuthName from "../components/Auth/AuthName";
import GetHunt from "../components/ScreensComp/GetHunt";

const StartScreen = ({ navigation }) => {
  const [places, setPlaces] = useState([]);
  const [images, setImages] = useState(null);

  const authCtx = useContext(AuthContext);
  const isFocused = useIsFocused();

  /*  console.log("images at start", images) */

  const handleResetData = async () => {
    Alert.alert("Confirm Reset", "Are you sure you want to delete all data?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteAllPlacesAsync();
          await deleteAllImagesAsync();

          // Reload places
          const allPlaces = await getAllPlacesAsync();
          setPlaces(allPlaces);

          /* KAn lägg refresh for image här om vill */
        },
      },
    ]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon="delete-outline"
          size={30}
          onPress={handleResetData}
          style={styles.headerLeftIcon}
        />
      ),
      headerRight: () => (
        <IconButton icon="logout" size={30} onPress={authCtx.logout} />
      ),
    });
  }, [authCtx, navigation]);

  useEffect(() => {
    const loadPlaces = async () => {
      const allPlaces = await getAllPlacesAsync();
      setPlaces(allPlaces);
    };
    loadPlaces();
  }, [isFocused]);

  useEffect(() => {
    const fetchImageUri = async () => {
      try {
        const uri = await getImageUriFromDatabase();
        setImages(uri);
        /* console.log('Image URI fetched:', uri); */
      } catch (error) {
        console.error("Error fetching image URI:", error);
      }
    };

    fetchImageUri();
  }, [isFocused]);

  return (
    <View style={styles.rootContainer}>
      <ProfileImage images={images} />
      <AuthName />
      <GetHunt />
      <View>
        <Pressable onPress={() => navigation.navigate("CreateHunt")}>
          <Text style={styles.createHunt}>Create Hunt</Text>
        </Pressable>

        {/*  <Pressable onPress={() => navigation.navigate('AddPlace')}  >
          <Text style={styles.createHunt}>Create Hunt</Text>
        </Pressable> */}
      </View>
      <View>
        <Text style={styles.medals}>MEDALS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 30,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 30,
    color: "pink",
  },
  createHunt: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 20,
    textAlign: "center",
  },
  medals: {
    textAlign: "center",
    fontSize: 20,
    color: "blue",
  },
});

export default StartScreen;