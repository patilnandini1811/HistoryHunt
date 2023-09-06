import { Text, View, StyleSheet } from "react-native";

const Title = ({ title }) => {
  return (
    <View>
      <Text style={styles.title}> {title} </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    paddingBottom: 25,
  }
})

export default Title;