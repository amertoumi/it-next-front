import UserState from './UserState';
import {API_HOST, API_DETAILS_USER} from '../../API';
import Axios from '../../services/axiosServices';
import ls from 'local-storage';


const userReducer = (state, action) => {
    switch (action.type) {
        case 'CURRENT_USER':
            return {...state, CurrentUser: action.payload};
    default :
    return state;
    }
};

const FetchCurrentUser = dispatch => async () => {
    const id_Current_User = ls.get("currentUser");
    var URL = API_HOST + API_DETAILS_USER + id_Current_User;

    try {
        const response = await Axios.get(URL)
        dispatch ({type: 'CURRENT_USER', payload: response.data["details"]})
    } catch (error) {
        console.log(error);
    }
      
}

export const { Provider, Context } = UserState(
    userReducer,
    {FetchCurrentUser},
    {CurrentUser:null}

);


