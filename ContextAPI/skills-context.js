import React, { useState, useReducer, createContext } from "react";
import { API_HOST, API_SKILLS_PATH } from "../api";
//import Api from "../pages/api";

export const SkillsContext = createContext();

let URL = API_HOST + API_SKILLS_PATH;

/* const data = () =>{
    const [skills, setSkills] = useState([]);
    sk = useEffect(() => {  
        axios
          .get(URL)
          .then((response) => response.data["hydra:member"])
          .then((data) => setSkills(data))
          .catch((error) => console.log(error.response));
      }, []),
  loading= false,
  error= null
}; */
const initialState = {
    skills: [
      {
        id: "1",
        name: "Reactjs",
        type: "Frontend"
      },
      {
        id: "2",
        name: "Vuejs",
        type: "Frontend"
      },
      {
        id: "3",
        name: "Python",
        type: "Backend"
      }
    ],
    loading: false,
    error: null
  };

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_SKILL":
      return {
        skills: [...state.skills, action.payload]
      };
    case "DEL_SKILL":
      return {
        skills: state.skills.filter(
          contact => contact.id !== action.payload
        )
      };
    case "START":
      return {
        loading: true
      };
    case "COMPLETE":
      return {
        loading: false
      };
    default:
      throw new Error();
  }
};

export const SkillsContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SkillsContext.Provider value={[state, dispatch]}>
      {props.children}
    </SkillsContext.Provider>
  );
};