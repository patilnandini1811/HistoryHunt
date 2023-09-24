

import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import defaultImage from '../../assets/profile.png';
import IconButton from '../ui/IconButton';
import AuthName from "./../Auth/AuthName";

const ProfileImage = ({ images }) => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
           source={images ? { uri: images } : defaultImage}
          // source={defaultImage}

          defaultSource={defaultImage}
          style={styles.profileImage}
        />

        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
          <IconButton icon="edit" size={40} />
        </TouchableOpacity>
      </View>
      <AuthName />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
    paddingLeft: 50,
  },
  profileImage: {
    width: 250,
    height: 250,
    borderRadius: 100,
  },
});

export default ProfileImage;