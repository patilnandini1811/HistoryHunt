import { View, StyleSheet } from "react-native";
import {
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";

import Title from "../components/ui/Title";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import LocationPicker from "../components/places/LocationPicker";
import { FriendsContext } from "../store/FriendsContext";
import { HuntContext } from "../store/HuntContext";
import { UserContext } from "../store/UserContext";


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

  

  return (
    <View style={styles.mainContainer}>
      
      <View style={styles.container}>
        
        
        <Title title={"Personalize"} />

        <Input
          placeholder="5 hours? 2days? you pick"
          value={enteredHuntTime}
          onUpdateValue={(value) =>
            updateCreateInputValueHandler("hunt-time", value)
          }
          label="How much time are you allotting?"
        />
        <Input
          placeholder="Name"
          value={enteredHuntName}
          onUpdateValue={(value) =>
            updateCreateInputValueHandler("hunt-name", value)
          }
          label="What's the name of your hunt?"
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
    
    backgroundColor:'#f8d7fd',
  },
  container: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "skyblue",
    borderColor: 'blue',
    borderWidth: 2,
   marginLeft:20,
    shadowColor: "black", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 4,
    elevation: 5, 
    marginTop: 20,
    width: 280,
    height:320
    
    
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
    marginTop:40,
  },
  successMessageContainer: {
    position: 'absolute', 
    top: '50%', 
    left: '50%', 
    transform: [{translateX: '-50%'}, {translateY: '-50%'}], 
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
