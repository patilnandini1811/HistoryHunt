import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { uploadImageToFirebase } from "../util/firebaseStorage";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => { },
  logout: () => { }
})

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const isAuthenticated = !!token;
  const authenticate = (token) => {
    setToken(token);
    AsyncStorage.setItem("appToken", token)
  };

  const logout = () => {
    setToken(null);
    AsyncStorage.removeItem("appToken")
  };

  const value = {
    token,
    isAuthenticated,
    authenticate,
    logout,

  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

}

export default AuthContextProvider;


// import { createContext, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { uploadImageToFirebase } from "../util/firebaseStorage";

// export const AuthContext = createContext({
//   token: "",
//   isAuthenticated: false,
//   authenticate: (token) => {},
//   logout: (imageUri) => {} // Note that logout now expects an imageUri parameter
// });

// const AuthContextProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const isAuthenticated = !!token;

//   const authenticate = (token) => {
//     setToken(token);
//     AsyncStorage.setItem("appToken", token);
//   };

//   const logout = async (imageUri) => {
//     try {
//       // If imageUri is provided, upload the image to Firebase
//       if (imageUri) {
//         await uploadImageToFirebase(imageUri);
//       }

//       // Proceed with the original logout logic
//       setToken(null);
//       await AsyncStorage.removeItem("appToken");
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   const value = {
//     token,
//     isAuthenticated,
//     authenticate,
//     logout,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export default AuthContextProvider;
