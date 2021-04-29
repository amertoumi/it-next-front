import React from 'react';
import Axios from '../../services/axiosServices';
import {API_HOST, API_SKILLS_PATH, API_PROFILS_BY_SKILLS} from '../../API';
import SkillsState from './SkillsState';

const SkillsReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_SKILLS' :
            return {...state, skills:action.payload};
        case 'FETCH_PROFIL_BY_SKILLS' :
            return {...state, profils:action.payload};
    }
}

// FETCH ALL SKILLS
const FETCH_SKILLS = dispatch => async () => {
    const url = API_HOST + API_SKILLS_PATH
    try {
        const response = await Axios.get(url) 
         dispatch({type: 'FETCH_SKILLS', payload: response.data["hydra:member"]})
         
    } catch (error) {
        console.log(error);
    }
}

// Get Profils by skills 
const FETCH_PROFIL_BY_SKILLS = dispatch => async (skillSearch)=> {
    const url = API_HOST + API_PROFILS_BY_SKILLS 
    var formdata = new FormData();
    formdata.append("listSkills", skillSearch);
    
    const response = await Axios.post(url, formdata)
    dispatch({type: 'FETCH_PROFIL_BY_SKILLS', payload:response.data})   
    
}

export const {Provider, Context} = SkillsState(
    SkillsReducer,
    {FETCH_SKILLS, FETCH_PROFIL_BY_SKILLS},
    {skills: null, profils: null},
);