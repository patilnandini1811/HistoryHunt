import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import { UserContext } from "../../store/UserContext";
import { HuntContext } from "../../store/HuntContext";
import { Colors } from "../../constants/Colors";

const GetHunt = () => {
  const [activeHunts, setActiveHunts] = useState([]);
  const [plannedHunts, setPlannedHunts] = useState([]);
  const [medalHunts, setMedalHunts] = useState([]);
  const navigation = useNavigation();
  const userCtx = useContext(UserContext);
  const huntCtx = useContext(HuntContext);

  const currentUser = userCtx.currentUser.id;

  const navigateToConfirmScreen = (huntDetails) => {
    navigation.navigate("ConfirmHunt", { details: huntDetails });
  };

  useEffect(() => {
    if (huntCtx.hunts && huntCtx.hunts.length > 0) {
      const active = huntCtx.hunts.filter(
        (hunt) =>
          hunt.creator?.id === currentUser && hunt.creator?.status === "Active"
      );

      const planned = huntCtx.hunts.filter(
        (hunt) =>
          hunt.creator?.id !== currentUser &&
          hunt.invitees?.some(
            (invitee) =>
              invitee.id === currentUser && invitee.status === "Planned"
          )
      );
      const medal = huntCtx.hunts.filter(
        (hunt) =>
          (hunt.creator?.id === currentUser &&
            hunt.creator?.status === "Medal") ||
          hunt.invitees?.some(
            (invitee) =>
              invitee.id === currentUser && invitee.status === "Medal"
          )
      );
      setActiveHunts(active);
      setPlannedHunts(planned);
      setMedalHunts(medal);
    }
  }, [huntCtx.hunts]);

  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigateToConfirmScreen(item)}>
      <View style={styles.container}>
        <Text style={styles.Text}>{item.name}</Text>
      </View>
    </Pressable>
  );
  const renderMedal = ({ item }) => (
    <Pressable onPress={() => navigateToConfirmScreen(item)}>
      <View style={styles.medalContainer}>
        <Text style={styles.medalText}>{item.name}</Text>
        <Text style={styles.complete}>Completed</Text>
      </View>
    </Pressable>
  );
  return (
    <View>
      <View>
        <Text style={styles.title}>Active Hunts</Text>
        <FlatList
          data={activeHunts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
      <View>
        <Text style={styles.title}>Planned Hunts</Text>
        <FlatList
          data={plannedHunts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
      <View>
        <Text style={styles.title}>Medal</Text>
        <FlatList
          data={medalHunts}
          keyExtractor={(item) => item.id}
          renderItem={renderMedal}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    color: 'blue',
    padding: 10,
  },
  Text: {
    fontSize: 18,
    padding: 5,
    fontWeight: "bold",
  },
  medalContainer: {
    flexDirection: "row",
  },
  medalText: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 5,
  },
  complete: {
    color: Colors.green,
    fontWeight: "bold",
  },
});

export default GetHunt;