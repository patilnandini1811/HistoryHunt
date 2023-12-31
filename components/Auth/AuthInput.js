import { TextInput, StyleSheet } from 'react-native';



const AuthInput = ({
  value,
  placeholder,
  keyboardType,
  onUpdateValue
}) => {

  return (

    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      onChangeText={onUpdateValue}
      value={value}
      keyboardType={keyboardType}
    />
    
  );
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 18,
    borderWidth: 3,
    borderColor: 'gray',
    borderRadius: 55,
    padding: 10,
    margin: 6,
    width: 300
  }
});
export default AuthInput;