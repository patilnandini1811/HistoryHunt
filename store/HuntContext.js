// import { createContext, useReducer, useCallback, useState } from "react"
// import * as http from "./../util/http"

// export const HuntContext = createContext({
//   hunts: [],
//   addHunt: (hunt) => { },

// });

// const initialState = {
//   hunts: []
// };

// const huntReducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD_HUNT':
//       return { ...state, hunts: [action.payload, ...state.hunts] };
//     default:
//       return state;
//   }
// }
// const HuntContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(huntReducer, initialState);
//   const [hunts, setHunts] = useState([]);

//   const addHunt = async (hunt) => {
//     try {
//        await http.saveHunt(hunt);
//        setHunts(prevHunts => [...prevHunts, hunt]);
//     } catch (error) {
//        console.error("Failed to add the hunt", error);
//     }
//  };

//   return (
//     <HuntContext.Provider value={{ ...state, addHunt }}>
//       {children}
//     </HuntContext.Provider>
//   )
// };

// export default HuntContextProvider;

import { createContext, useReducer, useCallback } from 'react';
import * as http from './../util/http';

export const HuntContext = createContext({
  hunts: [],
  addHunt: (hunt) => {},
  completeHunt: (huntId, userId) => {},
});

const initialState = {
  hunts: [],
};

const huntReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_HUNT':
      return {
        ...state,
        hunts: [action.payload, ...state.hunts],
      };
    case 'COMPLETE_HUNT':
      return {
        ...state,
        hunts: state.hunts.map((hunt) => {
          if (hunt.id === action.payload.huntId) {
            // Deep copy and modify the hunt object here
            const newHunt = JSON.parse(JSON.stringify(hunt));
            if (newHunt.creator.id === action.payload.userId) {
              newHunt.creator.status = 'Medal';
            }
            newHunt.invitees = newHunt.invitees.map((invitee) => {
              if (invitee.id === action.payload.userId) {
                return { ...invitee, status: 'Medal' };
              }
              return invitee;
            });
            return newHunt;
          }
          return hunt;
        }),
      };
    default:
      return state;
  }
};

const HuntContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(huntReducer, initialState);

  const addHunt = async (hunt) => {
    try {
      await http.saveHunt(hunt);
      dispatch({ type: 'ADD_HUNT', payload: hunt });
    } catch (error) {
      console.error('Failed to add the hunt', error);
    }
  };

  const completeHunt = async (huntId, userId) => {
    try {
      await http.completeHunt(huntId, userId);
      dispatch({ type: 'COMPLETE_HUNT', payload: { huntId, userId } });
    } catch (error) {
      console.error('Failed to complete the hunt', error);

    }
  };

  return (
    <HuntContext.Provider value={{ ...state, addHunt, completeHunt }}>
      {children}
    </HuntContext.Provider>
  );
};

export default HuntContextProvider;
