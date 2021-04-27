import React from 'react';
import RecruiterState from './RecruiterState';
import {API_HOST, API_MISSIONS_BY_RECRUITER, API_DELETE_MISSION_PATH, API_MISSION_BY_ID} from "../../API";
import Axios from '../../services/axiosServices';
import ls from 'local-storage';
import jwtDecode from "jwt-decode";
import { useRouter } from 'next/router';

const RecruiterReducer = (state, action) => {
    switch (action.type) {
        case 'GET_ALL_MISSIONS_BY_RECRUITER':
            return {...state, missions : action.payload};
        case 'GET_DETAILS_MISSION_BY_ID':
            return {...state, mission : action.payload};
            case 'GET_MISSION_BY_ID':
            return {...state, mission : action.payload};
        case 'REMOVE_MISSION':
            return { ...state, mission : action.payload};
        default:
            return state;
    }
}

const FETCH_MISSIONS = dispatch => async () => {
    const id_CurrentUser = ls.get('currentUser');
    const url = API_HOST + API_MISSIONS_BY_RECRUITER + id_CurrentUser

    try {
        const response = await Axios.get(url) 
         dispatch({type: 'GET_ALL_MISSIONS_BY_RECRUITER', payload: response.data})
         
    } catch (error) {
        console.log(error);
    }
}

const DELETE_MISSION = dispatch => async (id) => {
    const url =API_HOST+ API_DELETE_MISSION_PATH + id
    Axios.delete(url)
    .then(console.log('missions deleted'));
    dispatch(({type: 'REMOVE_MISSION'}))
} 



const FETCH_MISSION_BY_ID  = dispatch => async () =>{
    const router = useRouter();
    const { mid } = router.query;
    const url = API_HOST + API_MISSION_BY_ID + mid;
    
    try {
        const response = await Axios.get(url)
        dispatch({type: 'GET_MISSION_BY_ID', payload: response.data})
        console.log(response)
    } catch (error) {
        console.log(error);
    }
      
};

export const {Provider, Context} = RecruiterState(
    RecruiterReducer,
    {FETCH_MISSIONS, DELETE_MISSION , FETCH_MISSION_BY_ID},
    {missions: null},
);