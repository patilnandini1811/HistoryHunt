
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState,useContext } from "react";


import { UserContext } from "../../store/UserContext";

const GetAllUsers = (props) => {
  const userCtx = useContext(UserContext);

  const filteredUsers = userCtx.users.filter(
    (user) => user.id !== userCtx.currentUser.id
  );

  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const handleUserPress = (user) => {
    props.onUserSelect(user);

    setSelectedUserIds((prevIds) => {
      if (prevIds.includes(user.id)) {
        return prevIds.filter((id) => id !== user.id);
      } else {
        return [...prevIds, user.id];
      }
    });
  };

  return (
    <View style={styles.mainContainer}>
      {filteredUsers.length > 0 ? (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleUserPress(item)}>
              <View
                style={[
                  styles.container,
                  selectedUserIds.includes(item.id) && styles.selected,
                ]}>
                <Text style={styles.title}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns={3}
        />
      ) : (
        <Text>No Users found!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  container: {
    width: 100, 
    height: 100, 
    padding: 15,
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 25,
    color: "#333",
  },
  selected: {
    backgroundColor: "#2EFF00",
  },
});

export default GetAllUsers;