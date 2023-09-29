
import { useState } from 'react';
import Button from '../ui/Button';
import AuthInput from './AuthInput';
import { View, StyleSheet} from 'react-native';

const AuthForm = ({ credentialsInvalid, isLogin, onSubmit }) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const {
    email: emailIsInvalid,
    password: passwordIsInvalid,
    displayName: displayNameIsInvalid,
  } = credentialsInvalid;
  const updateInputValuHandler = (inputType, enteredValue) =>
  {
    switch (inputType)
    {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'name':
        setEnteredName(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break
    }
  };
   const submitHandler = () => {
    onSubmit({
      email: enteredEmail,
      displayName: enteredName,
      password: enteredPassword,
    });
  };


  return (
    <View style={styles.container} >
      <AuthInput
        placeholder="Email"
        value={enteredEmail}
        onUpdateValue={setEnteredEmail}
        keyboardType={'email-address'}
        isInvalid={emailIsInvalid}
      />
      {!isLogin && (
        <AuthInput
          placeholder="Name"
          value={enteredName}
          isInvalid={displayNameIsInvalid}
          onUpdateValue={setEnteredName}
          keyboardType={'default'}
        />
      )}
      <AuthInput
        placeholder="Password"
        value={enteredPassword}
        onUpdateValue={setEnteredPassword}
        keyboardType={'default'}
        isInvalid={passwordIsInvalid}
      />

      <View style={styles.btnContainer} >
        <Button onPress={submitHandler}>
          {isLogin ? "Log In" : "Sign Up"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
  alignContent: 'center',
  display: "flex",
},
  btnContainer: {
    padding: 20,
  }

});

export default AuthForm;

