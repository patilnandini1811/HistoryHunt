import { Pressable, Text, StyleSheet } from 'react-native';

const Button = ({ children, onPress }) => {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#9435EB',
    padding: 10,
    borderRadius: 20,
    borderColor: '#000',
    alignItems: 'center',
    width: 140,
    marginLeft:90,
    
  },
  text: {
    color: '#fff',
  }
});

export default Button;