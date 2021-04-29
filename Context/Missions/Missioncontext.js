import React from 'react';
import Axios from '../../services/axiosServices';
import {API_HOST, API_ALL_MISSIONS} from '../../API';
import MissionsState from './MissionState';

const MissionsReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_MISSIONS' :
            return {...state, missions:action.payload};     
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

export const {Provider, Context} = MissionsState(
    MissionsReducer,
    {FETCH_MISSIONS},
    {missions: null, profils: null},
);