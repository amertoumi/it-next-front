import Axios from '../services/axiosServices';
import {
  API_HOST,
  API_SKILLS_PATH,
  API_TYPE_SKILLS_PATH,
  API_USERS_PATH,
  API_PROFILS_PATH,
  API_ENTREPRISES_PATH,
  API_ACTIVATE_USER_PATH,
  API_DETAILS_USER
} from "../API";

// Create New skill

function CreateSkills(skillFields) {
  var URL = API_HOST + API_SKILLS_PATH;
  var data = skillFields;
    Axios.post(URL, data)
    .then(() => console.log("new skill created with success"));
  return true;
}

// Create New skill Type

function CreateSkillType(skillTypeField) {
  var URL = API_HOST + API_TYPE_SKILLS_PATH;
  var data = skillTypeField;
    Axios(URL, data)
    .then(() => console.log("New skill Type inserted to db"));
  return true;
}

//Delete Skill by ID

function DeleteSkill(id) {
  var URL = API_HOST + API_SKILLS_PATH +'/'+ id;
  Axios.delete(URL).then(() => console.log("skill is deleted"));
  return true;
}

//Create new user from profil form

function CreateNewUser(dataUser) {
  var URL = API_HOST + API_USERS_PATH;
  var data = dataUser;
    Axios.post(URL,data)
    .then(console.log("New User is created from Profil form"));
  return true;
}

//Create new inspirnaute user
function CreateNewProfil(dataProfil) {
  var URL = API_HOST + API_PROFILS_PATH;
  var data = dataProfil;
    Axios.post(URL, data)
    .then(console.log("Profil is created"));
  return true;
}

//Create new Entreprise 
function CreateNewEntreprise(dataEntreprise) {
  var URL = API_HOST + API_ENTREPRISES_PATH;
  var data = dataEntreprise;
  Axios.post(URL,data)
  .then(console.log("Entreprise is created"));
  return true;
}

// Get Freelancer By ID
function GetFreelancerById(id) {
  var URL = API_HOST + API_PROFILS_PATH +'/'+id
  Axios.get(URL)
  .then((response) => response.data);
  
}
function ActivateUser(id) {
  var URL = API_HOST + API_ACTIVATE_USER_PATH +'/'+id
    Axios.get(URL)
    .then((response)=> response);
}

//Get user details when is connected
function DetailsCurrentUser(id) {
  var URL = API_HOST + API_DETAILS_USER +'/'+id
    Axios.get(URL)
    .then((response)=> console.log(response.data));
}

export default {
  CreateSkills,
  CreateSkillType,
  DeleteSkill,
  CreateNewProfil,
  CreateNewUser,
  CreateNewEntreprise,
  GetFreelancerById,
  ActivateUser,
  DetailsCurrentUser
};