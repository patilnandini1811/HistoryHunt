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

import { createContext, useReducer, useEffect } from "react";
import * as http from "./../util/http";

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
    case "SET_HUNTS":
      return {
        ...state,
        hunts: action.payload,
      };
    case "ADD_HUNT":
      return {
        ...state,
        hunts: [action.payload, ...state.hunts],
      };
    case "COMPLETE_HUNT":
      return {
        ...state,
        hunts: state.hunts.map((hunt) => {
          if (hunt.id === action.payload.huntId) {
            const newHunt = JSON.parse(JSON.stringify(hunt));
            if (newHunt.creator.id === action.payload.userId) {
              newHunt.creator.status = "Medal";
            }
            newHunt.invitees = newHunt.invitees.map((invitee) => {
              if (invitee.id === action.payload.userId) {
                return { ...invitee, status: "Medal" };
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

  useEffect(() => {
    const fetchHunts = async () => {
      try {
        const data = await http.getHunts();
        const dataArray = Object.keys(data || {}).map((key) => {
          return {
            id: key,
            ...data[key],
          };
        });
        dispatch({ type: "SET_HUNTS", payload: dataArray });
      } catch (err) {
        console.error("Fetching hunts error", err.message);
      }
    };
    fetchHunts();
  }, [state]);

  const addHunt = async (hunt) => {
    try {
      await http.saveHunt(hunt);
      dispatch({ type: "ADD_HUNT", payload: hunt });
    } catch (error) {
      console.error("Failed to add the hunt", error);
    }
  };

  const completeHunt = async (huntId, userId) => {
    try {
      await http.completeHunt(huntId, userId);
      dispatch({ type: "COMPLETE_HUNT", payload: { huntId, userId } });
    } catch (error) {
      console.error("Failed to complete the hunt", error);
    }
  };

  return (
    <HuntContext.Provider value={{ ...state, addHunt, completeHunt }}>
      {children}
    </HuntContext.Provider>
  );
};

export default HuntContextProvider;