import { Pressable, StyleSheet, Text, View } from "react-native";

const FlatButton = ({ children, onPress }) => {
  return (
    <Pressable
    onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}> {children} </Text>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  /* Add more styling to the button text */
  buttonText: {
    color: "blue"
  }


});


export default FlatButton;
