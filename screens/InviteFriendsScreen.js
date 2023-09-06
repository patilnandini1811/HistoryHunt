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
  //console.log("Selected Friends  ", selectedFriends);

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
    flexDirection: "row", // This will align children (friend names) horizontally.
    flexWrap: "wrap", // This will wrap to the next line if there's no space left.
    alignItems: "center", // Vertically centers the items.
    justifyContent: "center", // Horizontally centers the items.
    padding: 20,
    marginBottom: 12,
  },
  friendContainer: {
    margin: 5, // Gives space around each name.
  },
  text: {
    color: "#2EFF00",
    fontSize: 30,
  },

  btnContainer: {
    padding: 190,
    alignItems: "center",
  },
});

export default InviteFriendsScreen;
