
import { getData } from "../../components-bootstrap/api/api";
import { FETCH_DOCTOR_APPOINTMENT_LIST_SUCCESS, FETCH_DOCTOR_APPOINTMENT_LIST_ERROR,SET_LOADER } from './actionTypes';

export const fetchDoctorAppointmentList = (loggedUser) => {
    return (async (dispatch) => {
        try {
            dispatch(setLoader(true))
            // let response = await getData('products');
            let response = await getData(`appointments?doctorname=${loggedUser}`);
            console.log("response",response.data);
            dispatch(fetchDoctorAppointmentListSuccess(response.data))

        } catch (error) {
            dispatch(fetchDoctorAppointmentListError(error.message))
        } finally {
            dispatch(setLoader(false))
        }

    })
}

export const fetchDoctorAppointmentListSuccess = (payload) => {
    return {
        type: FETCH_DOCTOR_APPOINTMENT_LIST_SUCCESS,
        payload
    }
}

export const fetchDoctorAppointmentListError = (payload) => {
    return {
        type: FETCH_DOCTOR_APPOINTMENT_LIST_ERROR,
        payload
    }
}

export const setLoader = (isLoading) => {
    return {
        type: SET_LOADER,
        isLoading
    }
}