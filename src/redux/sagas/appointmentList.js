import { takeEvery, call, put } from 'redux-saga/effects';
import { FETCH_PATIENTS_APPOINTMENT_LIST } from '../actions/actionTypes';
import { getData } from '../../components-bootstrap/api/api';
import { fetchPatientAppointmentListSuccess, fetchPatientAppointmentListError } from '../actions/pateintsHomeActions';

//worker saga

export function* appointmentsWorkerSaga(action) {
    console.log("actions",action);
    try {
        let response = yield call(getData, action.filterKey);
        console.log("fetched appoinments list from sagas", response);
        if (response?.data.length) {
            yield put(fetchPatientAppointmentListSuccess(response.data));
        } else {
            yield put(fetchPatientAppointmentListSuccess([]));
        }
    } catch (err) {
        yield put(fetchPatientAppointmentListError("error", err.message))
    } finally {
        console.log("fetched appointmenst list");
    }
}

//watcher saga

export function* appointmentWatcherSaga() {
    yield takeEvery(FETCH_PATIENTS_APPOINTMENT_LIST, appointmentsWorkerSaga)


}