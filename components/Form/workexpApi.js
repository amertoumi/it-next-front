import React, {useEffect, useState} from 'react';
import axios from 'axios';
import jwtDecode from "jwt-decode";
import {
    API_HOST,
    API_WORK_BY_PROFIL_PATH,
    API_REMOVE_WORK_EXP_PATH,
    API_UPDATE_WORk_PATH
  } from "../../API";

function WorkExpApi(){
    
    const [work, setWork] = useState([]);
    const token = window.localStorage.getItem("authToken");
    const { id: id_Current_User } = jwtDecode(token);
 
    var URL = API_HOST + API_WORK_BY_PROFIL_PATH + id_Current_User
    axios.get(URL)
    .then((response)=> setWork(response.data));
  
    return(work);
}

export default {
    WorkExpApi
}