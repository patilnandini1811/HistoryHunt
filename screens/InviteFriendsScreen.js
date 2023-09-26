import { Text, View, StyleSheet } from "react-native";
import { useState, useContext } from "react";

import Title from "../components/ui/Title";
import GetAllUsers from "../components/ScreensComp/GetAllUsers";
import Button from "../components/ui/Button";
import { FriendsContext } from "../store/FriendsContext";

const InviteFriendsScreen = ({ navigation }) => {
  const { selectedFriends, addFriend, removeFriend } =
    useContext(FriendsContext);
 

  const handleUserSelect = (selectedUser) => {
    if (selectedFriends.some((friend) => friend.id === selectedUser.id)) {
      removeFriend(selectedUser.id);
    } else {
      addFriend(selectedUser);
    }
  };
  

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Title title={"Invite Friends"} />
      </View>
      <View style={styles.selectedFriends}>
        {selectedFriends.map((friend, index) => (
          <View key={index} style={styles.friendContainer}>
            <Text style={styles.text}>{friend.name}</Text>
          </View>
        ))}
      </View>

      <View>
        <GetAllUsers onUserSelect={handleUserSelect} />
      </View>
      <View style={styles.btnContainer}>
        <Button onPress={() => navigation.navigate("CreateHunt")}>
          Invite
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyConten: "space-between",
  },
  container: {
    alignItems: "center",
    padding: 20,
  },
  selectedFriends: {
    flexDirection: "row", 
    flexWrap: "wrap", 
    alignItems: "center", 
    justifyContent: "center", 
    padding: 20,
    marginBottom: 12,
  },
  friendContainer: {
    margin: 5, 
  },
  text: {
    color: "#73f83a",
    fontSize: 30,
  },

  btnContainer: {
    padding: 20,
    alignItems: "center",
},

});

export default InviteFriendsScreen;
