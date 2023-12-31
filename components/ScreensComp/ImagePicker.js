import { View, Dimensions, StyleSheet, Text, Image, Button } from "react-native"
import { Camera, CameraType } from "expo-camera";
import { useRef, useState } from "react";
import IconButton from "../ui/IconButton";

const ImagePicker = ({imageHandler}) => {
  const cameraRef = useRef();
  const [photo, setPhoto] = useState();
  const [permission, reqPermission] = Camera.useCameraPermissions();

  if (!permission) {
    
    return <View />;
  }

  if (!permission.granted) {
    
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}> App need camera permission</Text>
        <Button onPress={reqPermission} title="grant permission" />
      </View>
    );
  }

  const takePicture = async () => {

    if (cameraRef.current) {

      const takenPhoto = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        exif: false,
      });
      setPhoto(takenPhoto);
      imageHandler(takenPhoto.uri);
    };

  };

  let previewContent = <Text style={styles.text}>No image taken yet</Text>

  if (photo) {
    previewContent = <Image source={{ uri: photo.uri }} style={styles.photo} />
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={cameraRef}
        type={CameraType.back}

      >
        <IconButton
          icon="camera-alt"
          size={32}
          color="orange"
          onPress={takePicture}
        />
      </Camera>
      <View style={styles.preview}>{previewContent}</View>
    </View>
  )
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    width: width,
    height: height / 2.5,
    alignItems: "center",
    justifyContent: "flex-end", 
    
  },
  preview: {
    width: width,
    height: height / 2,
    backgroundColor: "#FFF8B4",
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",

  },
  text: {
    color: "black",
  },
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 10, 
  }

});

export default ImagePicker;