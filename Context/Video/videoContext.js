import VideoState from './videoState';
import {API_HOST, API_LAST_FILE, API_delete_VIDEO} from "../../API";
import {Axios} from "../../services/authApi";
import ls from 'local-storage';
import jwtDecode from "jwt-decode";
import Router from 'next/router';
import { RepeatOneSharp } from '@material-ui/icons';

const videoReducer = (state, action) => {
    switch (action.type) {
        case 'GET_VIDEO':
            return { ...state, video: action.payload };
        case 'upload_video':
            return { errorMessage: '', video: action.payload };
            case 'live_video':
            return { errorMessage: '', video: action.payload };
        case 'REMOVE_VIDEO':
            return { errorMessage: '', video: null};
            default:
      return state;
    }
}

const fetch_video = dispatch => async () => {
    const id = ls.get('currentUser')
    const url = API_HOST + API_LAST_FILE + "video/" + id
    try {
        const response = await Axios
        .get(url)
        
            dispatch({type: 'GET_VIDEO', payload:response.data[0]})
            //console.log('+++++++++');
            //console.log(response.data[0])
        
    } catch (error) {
        console.log(error);
    }
}

/* const remove_video = async (id) => {
    
    const url = API_HOST + API_delete_VIDEO + id
    try {
        Axios.delete(url)
        .then((response) =>console.log(response.data));
        console.log('video removed');
    } catch (error) {
        console.log(error);
        console.log('video not removed');
    }
} */

export const {Provider, Context} = VideoState(
    videoReducer,
    {fetch_video},
    {video: null, errorMessage: ''},
);