import { combineReducers } from "redux";
import doctorsHomePageReducer from "./doctorHomePageReducer";
import patientsHomeReducer from "./patientsHomeReducer";
import userReducer from './userReducer';



const rootReducer = combineReducers({
    user : userReducer,
    doctorAppointmentList : doctorsHomePageReducer,
    patientAppointmentList : patientsHomeReducer
})

export default rootReducer;