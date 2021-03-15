//appoinment list page for patient
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { getData, deleteData } from '../api/api';
import Header from '../header/Header';
import { useSelector } from 'react-redux';
import { NavDropdown } from "react-bootstrap";


const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [user, setUser] = useState();
    let history = useHistory();
    //get data from redux using useSelector
    const loggedUser = useSelector(state => state.user.loggedInUser);

    async function getMyAppointments() {
        //localstorage implementation
        // let userString = localStorage.getItem('user');
        // let userObj = userString != undefined ? JSON.parse(userString) : null;

        // if (userObj === null) {
        //     history.push('/login');
        // } else {
        //     setUser(userObj);
        // }

        //redux implementation 
        // if user is logged in set state else push to login
        if (loggedUser === null) {
            history.push('/login');
        } else {
            let response = await getData(`appointments?patientname=${loggedUser.name}`);
            let appointmentsList = response.data;
            setAppointments(appointmentsList);
            setUser(loggedUser);
        }
    }

    useEffect(() => {
        getMyAppointments();
    }, [])

    const parseISOString = (s) => {
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    }

    //function for cancel booking. pass particular user id and delete from appoinments in db
    const cancelBooking = async (id, appointmentFullDate) => {
        // console.log("appointmentFullDate",appointmentFullDate);
        // let parsedDate =  parseISOString(appointmentFullDate)
        // let apptDate = new Date(parsedDate);
        // console.log("apptDate",apptDate);
        // let now = new Date();
        // console.log("now",now);
        // let diffInMS = appointmentFullDate - now;

        // let msInHour = Math.floor(diffInMS / 1000 / 60);
        // if (msInHour < 120) {
        //     // alert(" within two hours of booking");
        // } else {
        //     let cancelBookingResponse = await deleteData(`appointments/${id}`);
        //     console.log("cancelBookingResponse", cancelBookingResponse);
        //     getMyAppointments();
        //     // alert('not within 2 hrs');
        // }


        let cancelBookingResponse = await deleteData(`appointments/${id}`);
        getMyAppointments();
    }


    return (
        <>
            {/* using composition modifying header */}
            <Header>
                <NavDropdown.Item onClick={() => history.push('/patients/home')}>Book Appointment</NavDropdown.Item>
            </Header>
            {/* code to get show list of appoinments */}
            {appointments?.length > 0 ?
                appointments.map((appointment) => {

                    const { doctorname, specialization, patientsymptoms, appointmentTime, id, appointmentDate, appointmentFullDate } = appointment;

                    return <div>
                        <Row style={{ marginTop: "20px" }}>
                            <Col md="2"></Col>
                            <Col md='8'>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Appointment with Dr.{doctorname}</Card.Title>
                                        <Card.Text>
                                            <i>{specialization}</i>
                                            <p> {patientsymptoms}</p>
                                            <strong>{appointmentDate}</strong>
                                            <span> <Badge pill variant="secondary" style={{ fontSize: "15px" }}>
                                                {appointmentTime}
                                            </Badge>{' '}
                                                <Button variant="primary" style={{ float: "right" }} onClick={() => cancelBooking(id, appointmentFullDate)}>Cancel Appointment</Button></span>
                                        </Card.Text>

                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                })
                :

                "No appoinments"

            }
        </>
    )
}

export default MyAppointments;
