// import storage from '@react-native-firebase/storage';

// export const uploadImageToFirebase = async (uri) => {
//   if (!uri) return null;

//   const filename = uri.split('/').pop();
//   const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

//   const storageRef = storage().ref(`user_images/${filename}`);

//   const task = storageRef.putFile(uploadUri);
  
//   try {
//     await task;
//     const url = await storageRef.getDownloadURL();
//     return url;
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     return null;
//   }
// };

