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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);


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
      console.log("Before setting showSuccessMessage to true");
      setShowSuccessMessage(true);
      console.log("After setting showSuccessMessage to true");
      setTimeout(() =>
      {
        setShowSuccessMessage(false);
      }, 5000);
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
        {showSuccessMessage && (
          <View style={styles.successMessageContainer}>
            <Text style={styles.successMessage}>Hunt created!</Text>
          </View>)}
        
        <Title title={"Customize"} />

        <Input
          placeholder="3 hours? 2days? you pick"
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
          label="What do you want to call your hunt?"
        />
        
      </View>
      <LocationPicker locationHandler={locationHandler} />
      <View style={styles.btnContainer}>
        {showSuccessMessage ? (
          <Text style={styles.successMessage}>Hunt created!</Text>
        ) : (
          <Button onPress={submitHandler}> Create Hunt </Button>
        )}
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
  successMessageContainer: {
    position: 'absolute', 
    top: '50%', 
    left: '50%', 
    transform: [{translateX: '-50%'}, {translateY: '-50%'}], // Add this
    zIndex: 10, 
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 10,
    borderRadius: 8,
},

  successMessage: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  
  
});

export default CreateHuntScreen;
