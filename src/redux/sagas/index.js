import {all} from 'redux-saga/effects';
import {appointmentWatcherSaga} from './appointmentList';

export function* rootSaga(){
    yield all([
        appointmentWatcherSaga()
    ])
}