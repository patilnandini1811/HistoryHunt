import { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import AuthForm from './AuthForm';
import FlatButton from '../ui/FlatButton';
import Title from '../ui/Title';

const AuthContent = ({ isLogin, onAuthenticate }) => {
  const navigation = useNavigation();
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    displayName: false,
    password: false,
  });

  const switchAuthModeHandler = () => {
    if (isLogin) {
      navigation.navigate("Signup");
    } else {
      navigation.navigate("Login");
    }
  };

  const submitHandler = (credentials) => {
    let { email, displayName, password } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const displayNameIsValid = displayName.length > 0

    if (
      !emailIsValid ||
      !passwordIsValid
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,

      });
      return;
    }
    onAuthenticate({ email, password, displayName });
  };


  return (
    <View style={styles.page}>
      <Image source={require('../../assets/logo.jpg')} style={styles.logo} />
      <Title title={isLogin ? "LogIn" : "SignIn"} />
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View>
        <Text style={styles.centeredText}> Create Account</Text>
        <FlatButton  onPress={switchAuthModeHandler}>
          {isLogin ? "Sign Up here" : "Go to login"}
        </FlatButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#f8d7fd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    color:'black'
  },
  centeredText: {
    alignItems: 'center', 
    marginTop: 10,
    marginLeft:-9,
  },
  logo: {
    width: 150, 
    height: 150,
    borderColor: '#7124d5',
    borderWidth: 3,
    borderRadius:10,
  },
  

});

export default AuthContent;