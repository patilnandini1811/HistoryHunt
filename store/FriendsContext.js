import React, { createContext, useState, useContext } from "react";

export const FriendsContext = createContext();

export const FriendsContextProvider = ({ children }) => {
  const [selectedFriends, setSelectedFriends] = useState([]);

  const addFriend = (friend) => {
    setSelectedFriends((prevFriends) => [...prevFriends, friend]);
  };

  const removeFriend = (friendId) => {
    setSelectedFriends((prevFriends) =>
      prevFriends.filter((friend) => friend.id !== friendId)
    );
  };

  return (
    <FriendsContext.Provider
      value={{ selectedFriends, addFriend, removeFriend }}
    >
      {children}
    </FriendsContext.Provider>
  );
};
