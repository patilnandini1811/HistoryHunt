// import axios from "axios";
// import { useEffect, useState, useContext } from "react";
// import { View, Text } from "react-native";

// import { UserContext } from "../../store/UserContext";
// import { AuthContext } from "../../store/AuthContext";
// import * as http from "../../util/http";

// const AuthName = () => {
//   const authCtx = useContext(AuthContext);
//   const userCtx = useContext(UserContext);

//   //console.log(userCtx)
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const resp = await http.getUser(authCtx.token);
//         if (Array.isArray(resp) && resp.length > 0) {
          

//           const displayName = resp[0].displayName;
//           const localId = resp[0].localId;
          

//           userCtx.setCurrentUser({ name: displayName, id: localId });
          
//         }
//       } catch (error) {
//         console.error("AuthName", error.response.data);
//       }
//     };
//     fetchUser();
//   }, [authCtx, userCtx.currentUser.name]);

//   return (
//     <View>
//       <Text>{userCtx.currentUser.name || "No name"}</Text>
//     </View>
//   );
// };

// export default AuthName;
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { View, Text } from "react-native";

import { UserContext } from "../../store/UserContext";
import { AuthContext } from "../../store/AuthContext";
import * as http from "../../util/http";

const AuthName = () => {
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);

  //console.log(userCtx)
  useEffect(() =>
  {
   
    const fetchUser = async () =>
    {
      
      try {
        const resp = await http.getUser(authCtx.token);
        if (Array.isArray(resp) && resp.length > 0) {
          //console.log("resp", resp)

          const displayName = resp[0].displayName;
          const localId = resp[0].localId;
          //console.log("display", displayName)

          userCtx.setCurrentUser({ name: displayName, id: localId });
          //console.log('userctx', userCtx.CurrentUser.name)
        }
      } catch (error) {
        console.error('AuthName Error:', error.response ? error.response.data : error);
      }
    };
    fetchUser();
  }, [authCtx, userCtx.currentUser.name]);

  return (
    <View>
      <Text>{userCtx.currentUser.name || "No name"}</Text>
    </View>
  );
};

export default AuthName;