import React from 'react';
import axios from "axios";
import jwtDecode from 'jwt-decode';
import {
    API_HOST,
    API_AUTH_PATH
  } from "../API";
import Router from 'next/router';

function authenticate(credentials) {
    var URL = API_HOST + API_AUTH_PATH;

    return axios
      .post(URL, credentials)
      .then((response) => response.data.token)
      .then(token => {

        // stockage de token dans localStorage
        window.localStorage.setItem("authToken", token);
        // Prévient axios qu'on a un header par défault sur toutes les futures requettes http
        setAxiosToken(token);
        
        //Router.push('/admin/dashboard');
        
      })     
      
  }

//Logout

function logout() {
    //remove Token from localStorage
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
    Router.push('/home');
  }

//Pass token to axios
function setAxiosToken(token){
    axios.defaults.headers["Authorization"] = "Bearer  " + token;
}

function setup(){
    // 1. verif is token exist or not
    const token = window.localStorage.getItem("authToken");
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
    
    //3. give token to axios
}

function isAutheticated() {
    const token = window.localStorage.getItem("authToken");
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


  export default {
    authenticate,
    logout,
    setup,
    isAutheticated
  }