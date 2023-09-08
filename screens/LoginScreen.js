import { useContext, useState } from "react";

import { AuthContext } from "../store/AuthContext";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import AuthContent from "../components/Auth/AuthContent";
import * as http from "../util/http";



const LoginScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext)

  const authenticationHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
     
      const token = await http.signinUser(email, password);
      authCtx.authenticate(token);
      console.log(http.signinUser);
   
    } catch (error) {
      console.log(JSON.stringify(error))
      alert("Wrong email or password")
      
   
    }
   
    setIsAuthenticating(false);
  }
  if (isAuthenticating) {
    return <LoadingOverlay message={"Logging in..."} />;
  }

  return <AuthContent isLogin onAuthenticate={authenticationHandler} />
      
  
};


export default LoginScreen;