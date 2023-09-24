import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";



const NotificationPopup = ({ isVisible, header, onClose, onConfirm, text, answer }) => {
  if (!isVisible) return null;

  return (
    <View style={styles.notificationpopupContainer}>
      <View style={styles.popupContainer}>
        <Text style={styles.popupHeader}>{header}</Text>
        <Text>{text}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onConfirm} style={styles.button}>
            <Text style={styles.text}>{answer}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.text}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationpopupContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  popupHeader: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: 15,
  },
  popupContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor:'purple',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});

export default NotificationPopup;
