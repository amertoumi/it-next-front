import { createContext, useState, useContext } from 'react';
import {API_HOST, API_WORK_BY_PROFIL_PATH} from '../API';
import axios from 'axios';
import jwtDecode from "jwt-decode";
const workExpContext = createContext();

export function WorkWrapper({ children }) {
    const [data, setData] = useState([]);
    //const token = window.localStorage.getItem("authToken");
    //const { id: id_Current_User } = jwtDecode(token);
    let url = API_HOST+API_WORK_BY_PROFIL_PATH+id_Current_User
    
     axios.get(url)
    .then((result)=> setData(result.data));

  let sharedState = data

  return (
    <workExpContext.Provider value={sharedState}>
      {children}
    </workExpContext.Provider>
  );
}

export function useWorkExpContext() {
  return useContext(workExpContext);
}