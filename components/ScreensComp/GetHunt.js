import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import * as http from "../../util/http";
import { UserContext } from "../../store/UserContext";

const GetHunt = () => {
  const [hunts, setHunts] = useState([]);
  const [activeHunts, setActiveHunts] = useState([]);
  const [plannedHunts, setPlannedHunts] = useState([]);
  const navigation = useNavigation();
  const userCtx = useContext(UserContext);
  const currentUser = userCtx.currentUser.id;

  const navigateToConfirmScreen = (huntDetails) => {
    navigation.navigate("ConfirmHunt", { details: huntDetails });
  };

  useEffect(() => {
    const fetchHunts = async () => {
      try {
        const data = await http.getHunts();

        const dataArray = Object.keys(data || {}).map((key) => {
          return {
            id: key,
            ...data[key],
          };
        });

        setHunts(dataArray);
      } catch (err) {
        console.error("Gethunt error", err.message);
      }
    };

    fetchHunts();
  }, []);

  useEffect(() => {
    if (hunts && hunts.length > 0) {
      const active = hunts.filter((hunt) => hunt.creator?.id === currentUser);
      const planned = hunts.filter(
        (hunt) =>
          hunt.creator?.id !== currentUser &&
          hunt.invitees?.some((invitee) => invitee.id === currentUser)
      );
      setActiveHunts(active);
      setPlannedHunts(planned);
    }
  }, [hunts]);

  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigateToConfirmScreen(item)}>
      <View style={styles.container}>
        <Text style={styles.Text}>{item.name}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: "#FF0075",
  },
});

export default GetHunt;
