
import { useEffect, useContext } from "react";
import { View, Text ,StyleSheet} from "react-native";

import { UserContext } from "../../store/UserContext";
import { AuthContext } from "../../store/AuthContext";
import * as http from "../../util/http";

const AuthName = () => {
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);

  //console.log(userCtx)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resp = await http.getUser(authCtx.token);
        if (Array.isArray(resp) && resp.length > 0) {
          const displayName = resp[0].displayName;
          const localId = resp[0].localId;
          userCtx.setCurrentUser({ name: displayName, id: localId });
        }
      } catch (error) {
        console.error("AuthName", error.response.data);
      }
    };
    fetchUser();
  }, [authCtx, userCtx.currentUser.name]);

  return (
    <View>
      <Text style={styles.title}>{userCtx.currentUser.name || "No name"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    padding: 10,
    textAlign: "center",
    color: 'blue',
  },
});

export default AuthName;