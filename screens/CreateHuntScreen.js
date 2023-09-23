import { View, StyleSheet, Text } from "react-native";
import {
  useState,
  useContext,
  useCallback,
  useLayoutEffect,
  useEffect,
} from "react";

import Title from "../components/ui/Title";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import LocationPicker from "../components/places/LocationPicker";
import { FriendsContext } from "../store/FriendsContext";
import { HuntContext } from "../store/HuntContext";
import { UserContext } from "../store/UserContext";
import IconButton from "../components/ui/IconButton";

const CreateHuntScreen = ({ navigation }) => {
  const [enteredHuntTime, setEnteredHuntTime] = useState("");
  const [enteredHuntName, setEnteredHuntName] = useState("");
  const [creator, setCreator] = useState("");
  const [location, setLocation] = useState();
  const { addHunt } = useContext(HuntContext);
  const { selectedFriends } = useContext(FriendsContext);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    setCreator(userCtx.currentUser);
  }, [userCtx]);

  const locationHandler = useCallback((locationInfo) => {
    setLocation(locationInfo);
  }, []);

  const updateCreateInputValueHandler = (inputType, enteredValue) => {
    switch (inputType) {
      case "hunt-time":
        setEnteredHuntTime(enteredValue);
        break;
      case "hunt-name":
        setEnteredHuntName(enteredValue);
        break;
    }
  };

  const submitHandler = async () => {
    try {
      const updatedCreator = { ...creator, status: "Active" };

      const updatedSelectedFriends = selectedFriends.map((friend) => ({
        ...friend,
        status: "Planned",
      }));

      const newHunt = {
        name: enteredHuntName,
        estimatedTime: enteredHuntTime,
        location: location,
        invitees: updatedSelectedFriends,
        creator: updatedCreator,
      };

      addHunt(newHunt);
      setEnteredHuntTime("");
      setEnteredHuntName("");
      navigation.navigate("Start");
    } catch (error) {
      console.error("Failed to create the hunt", error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="person-add"
          size={40}
          onPress={() => navigation.navigate("InviteFriends")}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Title title={"Customize"} />

        <Input
          placeholder="1 hours? 3days? you pick"
          value={enteredHuntTime}
          onUpdateValue={(value) =>
            updateCreateInputValueHandler("hunt-time", value)
          }
          label="How long should it be?"
        />
        <Input
          placeholder="Name"
          value={enteredHuntName}
          onUpdateValue={(value) =>
            updateCreateInputValueHandler("hunt-name", value)
          }
          label="What do you want to call hunt?"
        />
      </View>
      <LocationPicker locationHandler={locationHandler} />
      <View style={styles.btnContainer}>
        <Button onPress={submitHandler}> Create Hunt </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyConten: "space-between",
    backgroundColor:'white'
  },
  container: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "skyblue",
    borderColor: 'blue',
    borderWidth: 3,
    borderRadius: 40, 
    shadowColor: "black", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 4,
    elevation: 5, 
    marginTop: 20,
    
    
  },
  selectedFriends: {
    flexDirection: "row", 
    flexWrap: "wrap", 
    alignItems: "center", 
    justifyContent: "center", 
    padding: 10,
  },
  friendContainer: {
    margin: 5, 
  },
  text: {
    color: "#9c21df",
    fontSize: 30,
    fontWeight: "bold",
  },
  btnContainer: {
    alignItems: "center",
    marginBottom: 50,
    marginRight: 70,
    marginTop:30,
  },
  successMessage: {
  backgroundColor:  "#9c21df", 
  color: "white", 
  fontSize: 20,
  fontWeight: "bold",
  textAlign: "center",
  padding: 10, 
  borderRadius: 8, 
  marginTop: 20, 
},
  
});

export default CreateHuntScreen;
