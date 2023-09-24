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
  
  buttonText: {
    color: "blue"
  }


});


export default FlatButton;
