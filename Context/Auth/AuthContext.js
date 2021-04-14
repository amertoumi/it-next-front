import AuthState from './AuthState';

import {API_HOST, API_AUTH_PATH} from "../../API";
import axios from "axios";
import ls from 'local-storage';
import jwtDecode from "jwt-decode";
import Router from 'next/router';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    case 'signup':
      return {...state, errorMessage: '', token: action.payload.token};
    case 'signin':
      return {...state, errorMessage: '', token: action.payload};
    case 'clear_error_message':
      return {...state, errorMessage: ''};
    case 'signout':
      return {token: null, errorMessage: '', currentUser:0};
    case 'user':
        return {...state, currentUser:action.payload}
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  const token = await ls.get('token');
  if (token) {
    dispatch({type: 'signin', payload: token});
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({type: 'clear_error_message'});
};


const signin = dispatch => async (data) => {
    const URL= API_HOST + API_AUTH_PATH
  try {
    const response = await axios.post(
      URL,
      data,
    );
    await ls.set('token', response.data.token);
    const token = await ls.get('token');
    const { id: xx} = await jwtDecode(token)
    ls.set('currentUser', xx)
    dispatch({type: 'signin', payload: response.data.token})
    const {roles: role} = jwtDecode(token)
      
       if(role[0] === "ROLE_ADMIN"){
        Router.push('/admin/dashboard');
      }else if (role[0]=== "ROLE_RECRUITER"){
        Router.push('/recruiter/profil');
      }
      else Router.push('/user/viewcv')
     
      return true;

  } catch (error) {
      console.log('failed');
    dispatch({
      type: 'add_error',
      payload: "adresse e-mail ou mot de passe n'est pas valide",
    });
  }
  
};

const signout = dispatch => async () => {
  await
   ls.remove('token');
   ls.remove('currentUser');
   delete axios.defaults.headers["Authorization"];
   dispatch({type: 'signout'});
   Router.push('/home');
};

const getCurrentUser = dispatch => async ()=>{
    const token = await ls.get('token');

const { id: xx} = await jwtDecode(token);
dispatch({type:'user', payload: xx})
console.log('+++ current userrr :: ', xx)


}

export const {Provider, Context} = AuthState(
  authReducer,
  {signin, signout, clearErrorMessage, tryLocalSignin,getCurrentUser},
  {token: null, errorMessage: '', currentUser: null},
);
