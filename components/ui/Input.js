import { Text, View, TextInput, StyleSheet } from "react-native"



const Input = ({ label, onUpdateValue, placeholder }) => {
  return (
    <View>
      <Text>
        {label}
      </Text>
      <TextInput style={styles.textInput}
        onChangeText={onUpdateValue}
        placeholder={placeholder}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  textInput: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
    padding: 5,
    margin: 6,
    width: 200
  }
});

export default Input;
