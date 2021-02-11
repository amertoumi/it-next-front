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

export default {
    auth_api,
    logout
}