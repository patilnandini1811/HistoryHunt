import { createContext, useReducer, useCallback, useState } from "react"
import * as http from "./../util/http"

export const HuntContext = createContext({
  hunts: [],
  addHunt: (hunt) => { },

});

const initialState = {
  hunts: []
};

const huntReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_HUNT':
      return { ...state, hunts: [action.payload, ...state.hunts] };
    default:
      return state;
  }
}
const HuntContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(huntReducer, initialState);
  const [hunts, setHunts] = useState([]);

  const addHunt = async (hunt) => {
    try {
       await http.saveHunt(hunt);
       setHunts(prevHunts => [...prevHunts, hunt]);
    } catch (error) {
       console.error("Failed to add the hunt", error);
    }
 };

  return (
    <HuntContext.Provider value={{ ...state, addHunt }}>
      {children}
    </HuntContext.Provider>
  )
};

export default HuntContextProvider;
