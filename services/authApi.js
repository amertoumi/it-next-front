import React from 'react';
import axios from "axios";
import jwtDecode from 'jwt-decode';
import {
  API_HOST,
  API_AUTH_PATH,
  } from "../API";
import Router from 'next/router';
import ls from 'local-storage';

function authenticate(data) {
    var URL = API_HOST + API_AUTH_PATH;

    return axios
      .post(URL, data)
      .then((response) => response.data.token)
      .then(token => {

        // stockage de token dans localStorage
        ls.set("authToken", token);
        // Prévient axios qu'on a un header par défault sur toutes les futures requettes http
        setAxiosToken(token);
        
        const {roles: role} = jwtDecode(token)
      
       if(role[0] === "ROLE_ADMIN"){
        Router.push('/admin/dashboard');
      }else if (role[0]=== "ROLE_RECRUITER"){
        Router.push('/recruiter/profil');
      }
      else Router.push('/user/profil')
         
      //console.log(jwtDecode(token))
      return true;
      })     
      
  }

//Logout

function logout() {
    //remove Token from localStorage
    //window.localStorage.removeItem("authToken");
    ls.remove("authToken");
    delete axios.defaults.headers["Authorization"];
    Router.push('/home');
  }

//Pass token to axios
function setAxiosToken(token){
    axios.defaults.headers["Authorization"] = "Bearer  " + token;
}

function setup(){
    // 1. verif is token exist or not
    const token = ls.get("authToken");
    //2. if token valide
    
    if(token) {
        const {exp: expiration} = jwtDecode(token)
        const {roles: role} = jwtDecode(token)

        if (expiration * 1000 > new Date().getTime()){
            setAxiosToken(token);
           
        } else {
            logout();
        }
    } else {
        logout();
    }
    
}

function isAutheticated() {
    const token = ls.get("authToken");
    //2. if token valide
    if(token) {
        const {exp: expiration} = jwtDecode(token)
        if (expiration * 1000 > new Date().getTime()){
            setAxiosToken(token);
           return true
        } 
        return false;
    }  
    return false;
}

const token = ls.get('token')
export const Axios =  axios.create({
    //timeout: 1000,
    headers: {'Authorization': 'Bearer '+ token}
  });

  export default {
    authenticate,
    logout,
    setup,
    isAutheticated,
    setAxiosToken,
    
  }