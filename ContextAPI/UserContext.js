import { createContext, useState, useContext } from 'react';
import {API_HOST, API_WORK_BY_PROFIL_PATH} from '../API';
import axios from 'axios';
import jwtDecode from "jwt-decode";
const UserContext = createContext();

export function AppWrapper({ children, token}) {
    const [data, setData] = useState([]);

    const { id: id_Current_User } = jwtDecode(token);
    let url = API_HOST+API_WORK_BY_PROFIL_PATH+id_Current_User
    
     axios.get(url)
    .then((result)=> setData(result.data));

    let sharedState = data

    return (
        <UserContext.Provider value={sharedState}>
        {children}
        </UserContext.Provider>
    );
}

export async function getServerSideProps() {

    const rtoken = window.localStorage.getItem("authToken"); 
    return { props: {token}}
}


export function useWorkExpContext() {
  return useContext(UserContext);
}