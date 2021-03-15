import {  FETCH_PATIENTS_APPOINTMENT_LIST_ERROR, FETCH_PATIENTS_APPOINTMENT_LIST_SUCCESS , SET_LOADER} from '../actions/actionTypes';

const initialState = {
    appointmentList: [ ],
    error: '',
    isLoading: false
}

const patientsHomeReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case FETCH_PATIENTS_APPOINTMENT_LIST_SUCCESS:
            return { ...state, appointmentList: action.payload };
        case FETCH_PATIENTS_APPOINTMENT_LIST_ERROR:
            return { ...state, error: action.payload };
        case SET_LOADER:
            return { ...state, isLoading: action.isLoading }; 
        default: return state
    }
}

export default patientsHomeReducer;