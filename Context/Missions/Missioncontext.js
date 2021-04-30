import React from 'react';
import Axios from '../../services/axiosServices';
import {API_HOST, API_ALL_MISSIONS, AFFECT_PROFIL_MISSION} from '../../API';
import MissionsState from './MissionState';

const MissionsReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_MISSIONS' :
            return {...state, missions:action.payload};  
        case 'AFFECT_PROFIL_MISSION' :
            return {...state, affect:action.payload};  
    }
}

// Fetch ALL Missions By Recruiter
const FETCH_MISSIONS = dispatch => async () => {
    const url = API_HOST + API_ALL_MISSIONS
    try {
        const response = await Axios.get(url) 
         dispatch({type: 'FETCH_MISSIONS', payload: response.data.data})
         console.log(response);
    } catch (error) {
        console.log(error);
    }
}

//Affect Profil to Mission
const AFFECT_PROFIL = dispatch => async (mid, idProfil) => {
    const url = API_HOST + AFFECT_PROFIL_MISSION + mid
    var formdata = new FormData();
    formdata.append("idProfile", idProfil);

    try {
        const response = Axios.post(url, formdata)
        .then((res)=>{console.log(res)})
        dispatch({type:'AFFECT_PROFIL_MISSION', payload:response.data})
    } catch (error) {
        console.log(error);
    }
}

export const {Provider, Context} = MissionsState(
    MissionsReducer,
    {FETCH_MISSIONS, AFFECT_PROFIL},
    {missions: null, profils: null, affect: null},
);