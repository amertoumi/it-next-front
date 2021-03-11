import axios from "axios";
import {
  API_HOST,
  API_AUTH_PATH,
  API_SKILLS_PATH,
  API_TYPE_SKILLS_PATH,
  API_USERS_PATH,
  API_PROFILS_PATH,
  API_ENTREPRISES_PATH,
  API_ACTIVATE_USER_PATH
} from "../API";
import Router from 'next/router';

//Login
function auth_api(data) {
  var URL = API_HOST + API_AUTH_PATH;
  return axios
    .post(URL, data)
    .then((response) => response.data.token)
    .then((token) => {
      // stockage de token dans localStorage
      window.localStorage.setItem("authToken", token);
      // Prévient axios qu'on a un header par défault sur toutes les futures requettes http
      axios.defaults.headers["Authorization"] = "Bearer  " + token;
      Router.push('/admin/dashboard');
      return true;
    });
}

//Logout

function logout() {
  //remove Token from localStorage
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
}

// Create New skill

function CreateSkills(skillFields) {
  var URL = API_HOST + API_SKILLS_PATH;
  var data = skillFields;
  axios(URL, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: data,
  }).then(() => console.log("new skill created with success"));
  return true;
}

// Create New skill Type

function CreateSkillType(skillTypeField) {
  var URL = API_HOST + API_TYPE_SKILLS_PATH;
  var data = skillTypeField;
  axios(URL, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: data,
  }).then(() => console.log("New skill Type inserted to db"));
  return true;
}

//Delete Skill by ID

function DeleteSkill(id) {
  var URL = API_HOST + API_SKILLS_PATH +'/';
  axios(URL + id, {
    method: "DELETE",
    headers: {},
  }).then(() => console.log("skill is deleted"));
  return true;
}

//Create new user from profil form

function CreateNewUser(dataUser) {
  var URL = API_HOST + API_USERS_PATH;
  var data = dataUser;
  axios(URL, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: data,
  })
  .then(console.log("New User is created from Profil form"));
  return true;
}

//Create new inspirnaute user
function CreateNewProfil(dataProfil) {
  var URL = API_HOST + API_PROFILS_PATH;
  var data = dataProfil;
  axios(URL, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: data,
  })
  .then(console.log("Profil is created"));
  return true;
}

//Create new Entreprise 
function CreateNewEntreprise(dataEntreprise) {
  var URL = API_HOST + API_ENTREPRISES_PATH;
  var data = dataEntreprise;
  axios(URL, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: data,
  })
  .then(console.log("Entreprise is created"));
  return true;
}

// Get Freelancer By ID
function GetFreelancerById(id) {
  var URL = API_HOST + API_PROFILS_PATH +'/'+id
  axios(URL)
  .then((response) => response.data);
  
}
function ActivateUser(id) {
  var URL = API_HOST + API_ACTIVATE_USER_PATH +'/'+id
  var config = {
    method: 'get',
    url: URL,
    headers: { }
  };
  axios(config)
  .then((response)=> response);
}

let URL = API_HOST + API_SKILLS_PATH;
      axios
      .get(URL)
      .then((response) => response.data["hydra:member"])
      .then((data) => setSkills(data))
      .catch((error) => error.response);

export default {
  auth_api,
  logout,
  CreateSkills,
  CreateSkillType,
  DeleteSkill,
  CreateNewProfil,
  CreateNewUser,
  CreateNewEntreprise,
  GetFreelancerById,
  ActivateUser
};