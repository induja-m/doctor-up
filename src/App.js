// import Login from "./components/login/Login";
import Login from './components-bootstrap/login/Login'
import { BrowserRouter, Route, Link, Switch, HashRouter } from "react-router-dom";
import Header from './components-bootstrap/header/Header';
import React, { Component ,Suspense} from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

// import PatientsHome from './components-bootstrap/patient/patientsHome'
// import DoctorsHome from './components-bootstrap/doctorsHome/doctorsHome'

// import BookAppointment from './components-bootstrap/patient/bookAppointment'
// import MyAppointments from './components-bootstrap/patient/myAppointments'
// import ModifySlot from './components-bootstrap/doctorsHome/modifySlot1';

const PatientsHome = React.lazy(()=>import('./components-bootstrap/patient/patientsHome'))
const DoctorsHome = React.lazy(()=>import('./components-bootstrap/doctorsHome/doctorsHome'))
const BookAppointment = React.lazy(()=>import('./components-bootstrap/patient/bookAppointment'))
const MyAppointments = React.lazy(()=>import('./components-bootstrap/patient/myAppointments'))
const ModifySlot = React.lazy(()=>import('./components-bootstrap/doctorsHome/modifySlot1'))

function App() {
//routing
  return (
    <div >
      {/* <Header/> */}
      <Suspense fallback={<>Loading....</>}>
      <BrowserRouter>
        
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/login" component={Login} />
          <Route path="/patients/myappointment" component={MyAppointments} exact/>
          <Route path="/patients/home" component={PatientsHome} exact/>
          <Route path="/doctors/home" component={DoctorsHome} exact/>
          <Route path="/patients/bookappointment" component={BookAppointment} exact/>
          <Route path="/doctors/slotmodification" component={ModifySlot} exact/>
          <Route path="**" render={() => <h1>Page not found</h1>} />
        </Switch>
      </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
