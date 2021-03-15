import {LOGGED_IN_USER} from '../actions/actionTypes';


const initialState ={
    loggedInUser:null
}


const userReducer = (state = initialState, action={}) => {
    switch (action?.type) {

        case LOGGED_IN_USER:
            return {
                ...state,loggedInUser: action.payload
            }


        default: return state;
    }
}

export default userReducer;
