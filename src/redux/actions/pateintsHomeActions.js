
import { getData } from "../../components-bootstrap/api/api";
import { FETCH_PATIENTS_APPOINTMENT_LIST_ERROR, FETCH_PATIENTS_APPOINTMENT_LIST_SUCCESS,SET_LOADER,FETCH_PATIENTS_APPOINTMENT_LIST } from './actionTypes';

export const fetchPatientAppointmentsList = (filterKey) => {
    // return (async (dispatch) => {
    //     try {
    //         dispatch(setLoader(true))
    //         // let response = await getData('products');
    //         let response = await getData(filterKey);
    //         dispatch(fetchPatientAppointmentListSuccess(response.data))

    //     } catch (error) {
    //         dispatch(fetchPatientAppointmentListError(error.message))
    //     } finally {
    //         dispatch(setLoader(false))
    //     }

    // })
    console.log("filterkey from actions page",filterKey);
    return {
        type: FETCH_PATIENTS_APPOINTMENT_LIST,
        filterKey
    }
  
}

export const fetchPatientAppointmentListSuccess = (payload) => {
    return {
        type: FETCH_PATIENTS_APPOINTMENT_LIST_SUCCESS,
        payload
    }
}

export const fetchPatientAppointmentListError = (payload) => {
    return {
        type: FETCH_PATIENTS_APPOINTMENT_LIST_ERROR,
        payload
    }
}

export const setLoader = (isLoading) => {
    return {
        type: SET_LOADER,
        isLoading
    }
}