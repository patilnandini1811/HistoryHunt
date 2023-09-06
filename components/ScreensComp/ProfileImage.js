import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import IconButton from '../ui/IconButton';
import defaultImage from "../../assets/profile.png"

const ProfileImage = ({ images }) => {
  const navigation = useNavigation();
/*   console.log("images at profileimage",images) */
  return (
    <View style={styles.container}>
      <Image
        source={images ? { uri: images } : defaultImage}
        defaultSource={defaultImage}
        style={styles.profileImage}
      />
      <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
        <IconButton
          icon="edit"
          size={30}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 200,
    borderRadius: 50, // This will make the image circular
  },


});

export default ProfileImage