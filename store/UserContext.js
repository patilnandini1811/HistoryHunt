import { createContext, useState, useEffect } from "react";
import * as http from "./../util/http"

export const UserContext = createContext({
  users: [],
  currentUser: { name: null, id: null },
  setCurrentUser: (name, id) => { },
  addUser: (displayName, localId) => { }
});

const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({ name: null, id: null });
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await http.getAllUsers();

        const fetchedUsers = Object.values(userData).map(user => ({
          name: user.name,
          id: user.id
        }));

        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching user collection data:", error);
      }
    };
    fetchUsers();
  }, [currentUser]);

  const addUser = (displayName, localId) => {
    setUsers(prevUsers => [...prevUsers, { name: displayName, id: localId }]);
  };


  const value = {
    users,
    currentUser,
    setCurrentUser,
    addUser
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
