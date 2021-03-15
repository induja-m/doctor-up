//component for doctor home . appoinments list and slot booking
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { getData } from '../api/api';
import Header from '../header/Header';
import { useSelector,useDispatch } from 'react-redux';
import {NavDropdown } from "react-bootstrap";
import { fetchDoctorAppointmentList } from '../../redux/actions/doctorHomePageActions';


const DoctorsHome = () => {
    const [appointments, setAppointments] = useState([]);
    const [user, setUser] = useState();
    let history = useHistory();
    //get data from redux using useSelector
    const {appointmentList} = useSelector(state=>state.doctorAppointmentList);
    const loggedUser = useSelector(state => state.user.loggedInUser);
    const dispatcher = useDispatch();

    useEffect(() => {       
        //// if user is logged in set state else push to login
        if (loggedUser === null) {
            history.push('/login');
        } else {
            getMyAppointments();
            setUser(loggedUser);
        }
    
        async function getMyAppointments() {
            // let response = await getData(`appointments?doctorname=${loggedUser.name}`);
            dispatcher(fetchDoctorAppointmentList(loggedUser.name));
            // let appointmentsList = response.data
        }
       
    }, [])

    useEffect(()=>{
        setAppointments(appointmentList);
    },[appointmentList.length])

    return (
        <>
        {/* using composition modifying header */}
            <Header>
                <NavDropdown.Item onClick={()=>history.push('/doctors/slotmodification')}>Slot Modification</NavDropdown.Item>
            </Header>
            {/* code for listing list of appoinments for doctor starts here */}
            {/* {console.log("appointmentList%%%%%%%%%%%%%%%%%%%%%%%",appointments)} */}
            <Row  style={{ marginTop: "20px" }}>
            <Col md="2"></Col>
            <Col md='3'><h4>Appointments</h4></Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
                <Col md="2"></Col>
                {appointmentList?.length > 0 ?
                    appointmentList.map((appointment) => {
                        const {patientname,patientage,patientgender,patientcontact,patientsymptoms,appointmentDate,appointmentTime}=appointment;
                        return <div>
{/* todo- another component */}
                            <Col md='3'>
                                <Card style={{ width: '18rem' }}>

                                    <Card.Body>
                                        <Card.Title>{patientname}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{patientage}, {patientgender}</Card.Subtitle>
                                        <Card.Subtitle className="mb-2 text-muted">{patientcontact}</Card.Subtitle>
                                        <Card.Text>
                                            {patientsymptoms}
                                        </Card.Text>
                                        <i>{appointmentDate}</i>
                                        <Badge pill variant="info" style={{ fontSize: "15px" }}>
                                            {appointmentTime}
                                        </Badge>{' '}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </div>
                    })
                    :
                    <h4>"No Appointments"</h4>
                }

            </Row>
            {/* code for listing list of appoinments for doctor starts here */}

        </>
    )
}

export default DoctorsHome;
