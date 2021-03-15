import {  FETCH_DOCTOR_APPOINTMENT_LIST_ERROR, FETCH_DOCTOR_APPOINTMENT_LIST_SUCCESS , SET_LOADER} from "../actions/actionTypes";

const initialState = {
    appointmentList: [ ],
    error: '',
    isLoading: false
}

const doctorsHomePageReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case FETCH_DOCTOR_APPOINTMENT_LIST_SUCCESS:
            return { ...state, appointmentList: action.payload };
        case FETCH_DOCTOR_APPOINTMENT_LIST_ERROR:
            return { ...state, error: action.payload };
        case SET_LOADER:
            return { ...state, isLoading: action.isLoading }; 
        default: return state
    }
}

export default doctorsHomePageReducer;