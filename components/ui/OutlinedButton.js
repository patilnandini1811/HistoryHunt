import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const OutlinedButton = ({ pressHandler, icon, children }) => {
  return (
    <Pressable onPress={pressHandler} style={styles.buttonContainer}>
      <Ionicons name={icon} size={18} color="blue" />
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",     
    alignItems: 'center',     
    padding: 10,
    
    borderWidth: 1,   
    borderColor: "blue",         
  },
  buttonText: {
    marginLeft: 10,    
    color:'black'
  }
});

export default OutlinedButton;
