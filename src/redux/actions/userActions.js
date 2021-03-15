import { LOGGED_IN_USER } from './actionTypes';

export const saveUser = (payload)=>{
    return{
        type: LOGGED_IN_USER,
        payload
    }
}


