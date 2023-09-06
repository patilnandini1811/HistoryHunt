import { Pressable, StyleSheet } from "react-native";
// import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const IconButton = ({ icon, color, size, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <MaterialIcons name={icon} color={color} size={size} />
      {/* <AntDesign name={icon} size={size} color={color}/> */}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20
    },
  pressed: {
    opacity: 0.7,
  },
});

export default IconButton;
