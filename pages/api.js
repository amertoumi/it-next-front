import axios from "axios";
import {
  API_HOST,
  API_AUTH_PATH,
  API_SKILLS_PATH,
  API_TYPE_SKILLS_PATH,
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
  }).then(() => console.log("data inserted to db"));
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
  var URL = API_HOST + API_SKILLS_PATH;
  axios(URL + id, {
    method: "DELETE",
    headers: {},
  }).then(() => console.log("skill is deleted"));
  return true;
}

//Sent Selected skills on Checkbox Form
// Create New skill Type

function SentSelectedSkills(data) {
  var URL = API_HOST + API_ProfilS_PATH;
  var data = data;
  axios(URL, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: data,
  }).then(() => console.log("Profils skills updated"));
  return true;
}
export default {
  auth_api,
  logout,
  CreateSkills,
  CreateSkillType,
  DeleteSkill,
  SentSelectedSkills
};