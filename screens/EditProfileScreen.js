import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Image from "../models/Image"
import ImagePicker from "../components/ScreensComp/ImagePicker";
import Button from "../components/ui/Button";
import { insertImageAsync } from "../util/database";

const EditProfileScreen = () => {
  const [image, setImage] = useState();
  const navigation = useNavigation();



  const imageHandler = (uri) => {
    setImage(uri);
  };
  const addImageHandler = async (imageUri) => {
    console.log('addImageHandler called with:', imageUri);
    try {
      await insertImageAsync({ imageUri: imageUri });
    
      navigation.navigate("Start");
    } catch (error) {
      console.error('Error inserting image:', error);
    }
  };

  const submitHandler = () => {
   
    addImageHandler(image);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ImagePicker imageHandler={imageHandler} />
      </View>
      <View style={styles.footer}>
        <Button onPress={submitHandler} > Save </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 9, 
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

});

export default EditProfileScreen;
