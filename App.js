
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import StartScreen from "./screens/StartScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import MapScreen from "./screens/MapScreen";
import CreateHuntScreen from "./screens/CreateHuntScreen";
import AuthContextProvider, { AuthContext } from "./store/AuthContext";
import UserContextProvider from "./store/UserContext";
import ConfirmHuntScreen from "./screens/ConfirmHuntScreen";
import LocationNavigatorScreen from "./screens/LocationNavigatorScreen";
import { initializeImagesDBAsync } from "./util/database";
import HuntContextProvider from "./store/HuntContext";
import { FriendsContextProvider } from "./store/FriendsContext";

const Stack = createNativeStackNavigator();


const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

const AuthenticatedStack = () => {
  useEffect(() => {
    const initDB = async () => {
      try {
        await initializeImagesDBAsync();
        
      } catch (error) {
        console.error("app", error);
      }
    };
    initDB();
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="CreateHunt" component={CreateHuntScreen} />
      <Stack.Screen name="ConfirmHunt" component={ConfirmHuntScreen} />
      <Stack.Screen name="LocationNavigator" component={LocationNavigatorScreen} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem("appToken");
      if (token) {
        authCtx.authenticate(token);
      }
    };
    fetchToken();
  }, [authCtx]);

  return (
    <NavigationContainer>
      {authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <UserContextProvider>
          <HuntContextProvider>
            <FriendsContextProvider>
              <Navigation />
            </FriendsContextProvider>
          </HuntContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </>
  );
}