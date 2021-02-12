import axios from 'axios';

//Login
function  auth_api(data) {
    return axios
            .post("http://localhost:8000/api/login", data)
            .then(response => response.data.token)
            .then(token => {
                // stockage de token dans localStorage
                window.localStorage.setItem("authToken", token);
                // Prévient axios qu'on a un header par défault sur toutes les futures requettes http
                axios.defaults.headers["Authorization"] = "Bearer  " + token;
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

    var data = skillFields
    axios('http://localhost:8000/api/skills', 
    {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json;charset=UTF-8'
      },
      data: data
  }).then(()=> console.log('data inserted to db'));
  return true;
  }

export default {
    auth_api,
    logout,
    CreateSkills
}