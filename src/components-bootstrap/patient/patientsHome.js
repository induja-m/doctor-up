//component for patiet home. filter to select the specialization and list of doctors available
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Button, Row, Col, Badge, Accordion, Form, ButtonGroup } from 'react-bootstrap';
import { getData, postData } from '../../components-bootstrap/api/api';
import Header from '../header/Header';
import { NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import * as fetchFromSaga from '../../redux/actions/pateintsHomeActions';
import Rating from '../tools/rating';

const PatientsHome = () => {
    const [doctors, setDoctors] = useState([]);
    const [user, setUser] = useState();
    const [specFilter, setSpecFilter] = useState("all");
    const [appointmentTime, setAppointmentTime] = useState();
    const [appointmentDate, setAppointmentDate] = useState();
    const [appointmentFullDate, setAppointmentFullDate] = useState();
    const [symptoms, setSymptoms] = useState();
    const history = useHistory();
    //get data from redux using useSelector
    const { appointmentList, isLoading } = useSelector(state => state.patientAppointmentList);
    const loggedUser = useSelector(state => state.user.loggedInUser);
    const dispatcher = useDispatch();


    useEffect(() => {
        //redux implementation

        // if user is logged in set state else push to login
        (loggedUser === null ? history.push('/login') : setUser(loggedUser))

        //check for the right filter and getdatat from db
        async function getDoctorsList() {
            let filterKey = "doctors";
            // if (specFilter === "cardiologist") {
            //     filterKey = "doctors?specialization=Cardiologist"
            // } else if (specFilter === "neurologist") {
            //     filterKey = "doctors?specialization=Neurologist"
            // }
            // let response = await getData(filterKey);
            // dispatcher(fetchPatientAppointmentsList(filterKey));
            dispatcher(fetchFromSaga.fetchPatientAppointmentsList(filterKey));

            // console.log("appointmentList",appointmentList)
            // let doctorsList = response.data
            // setDoctors(doctorsList);
        }
        getDoctorsList();

    }, [])



    useEffect(() => {
        setDoctors(appointmentList);
        // console.log("specFilter",specFilter);
        // if(specFilter === "cardiologist"){
        //     console.log("inside cardio");
        //     setDoctors(doctors => doctors.filter(doctor => doctor.specialization !== "Cardiologist"));
        // }else if (specFilter === "neurologist"){
        //     console.log("inside neuro");
        //     setDoctors(doctors => doctors.filter(doctor => doctor.specialization !== "Neurologist"));
        // }else{
        //     console.log("inside neuro");
        //     setDoctors(appointmentList);
        // }
    }, [appointmentList.length])


    //get params db(slots) and set state to send to confirm booking 
    const setAppointmentDateTime = (timeValue, dateValue, fullDateValue) => {
        setAppointmentTime(timeValue);
        setAppointmentDate(dateValue);
        setAppointmentFullDate(fullDateValue);
    }

    //confirm booking function saves the object into the db
    const confirmBooking = async (doctor) => {
        // const {name, age, gender, contact} = user;
        
        let postObj = {
            doctorname: doctor.name,
            patientname: user.name,
            patientage: user.age,
            patientgender: user.gender,
            appointmentTime: appointmentTime,
            patientsymptoms: symptoms,
            patientcontact: user.contact,
            specialization: doctor.specialization,
            appointmentDate: appointmentDate,
            appointmentFullDate: appointmentFullDate
        }
        let response = await postData('/appointments', postObj);
        console.log("response", response.data);
        alert(`Appointment with Dr. ${doctor.name} between ${appointmentTime} booked successfully!`);
    }



    return (
        <>
            {/* using composition modifying header */}
            <Header>
                <NavDropdown.Item onClick={() => history.push('/patients/myappointment')}>My Appointments</NavDropdown.Item>
            </Header>
            <Row style={{ marginTop: "20px" }}>
                <Col md="2"></Col>
                <Col md='3'>
                    {/* form for specialization filter starts here */}
                    <Form>
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Label>Choose Specialization</Form.Label>
                            <Form.Control as="select" custom onChange={(e) => setSpecFilter(e.target.value)}>
                            {/* <Form.Control as="select" custom> */}
                                <option value="all">All</option>
                                <option value="cardioLogist">CardioLogist</option>
                                <option value="neurologist">Neurologist</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    {/* form for specialization filter ends here */}
                </Col>
            </Row>

            <Row style={{ marginTop: "20px" }}>
                <Col md="2"></Col>
                <Col md='8'>
                    {/* code to display list of doctors starts here */}
                    {doctors?.length > 0 ?
                        doctors.map((doctor) => {
                            const { specialization, education, description, name, id, slots, experience, rating } = doctor;
                            return (
                                <Card key={id} style={{ marginTop: "20px" }}>
                                    <Card.Header>{specialization}</Card.Header>
                                    <Card.Body>
                                        <Card.Title><span>Dr. {name}</span><span style={{ float: "right" }}><Rating rating={rating} /></span></Card.Title>
                                        <Card.Text>
                                            <i>{education}</i>
                                            <strong><p style={{ color: "#606060" }}>{experience}</p></strong>
                                            <p> {description}</p>
                                        </Card.Text>

                                        <Accordion defaultActiveKey="0">
                                            {/* bookappoinment code starts here . */}
                                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                Book Appointment
                                            </Accordion.Toggle>

                                            <Accordion.Collapse eventKey="1" >
                                                <Card.Body>
                                                    <Card.Text>
                                                        <p>Consultation Fee Rs.1000</p>
                                                        <p>Available Slots:</p>
                                                        {/* get slot avaliable details  */}
                                                        {slots.map((slot) => {
                                                            return (
                                                                <>
                                                                    <h5>{slot.slotDayLabel}</h5>
                                                                    {slot.values.map((slotValue) => {
                                                                        return (
                                                                            <>
                                                                                {/* todod- keep looping */}
                                                                                <ButtonGroup aria-label="Basic example" onClick={(e) => setAppointmentDateTime(e.target.value, slot.slotDayLabel, slotValue.slotTime)} >
                                                                                    {slotValue.available ?
                                                                                        <Button variant="primary" value={slotValue.slotTimeLabel} style={{ marginRight: "10px" }}>{slotValue.slotTimeLabel}</Button>
                                                                                        :
                                                                                        <Button disabled variant="primary" value={slotValue.slotTimeLabel} style={{ marginRight: "10px" }}>{slotValue.slotTimeLabel}</Button>
                                                                                    }
                                                                                </ButtonGroup>

                                                                            </>
                                                                        )
                                                                    })
                                                                    }
                                                                </>
                                                            )
                                                        })}
                                                    </Card.Text>
                                                    {/* {console.log("button", appointmentTime)} */}
                                                    <Form>
                                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                                            <Form.Label>Comments/Symptoms</Form.Label>
                                                            <Form.Control as="textarea" rows={3} onChange={(e) => setSymptoms(e.target.value)} />
                                                        </Form.Group>
                                                    </Form>

                                                    <Button variant="primary" style={{ float: "right" }} onClick={() => confirmBooking(doctor)}>
                                                        Confirm Booking
                                                    </Button>
                                                </Card.Body>


                                            </Accordion.Collapse>
                                            {/* bookappoinment code ends here . */}
                                        </Accordion>
                                    </Card.Body>
                                </Card>
                            )
                        })

                        : <h3>No Products available</h3>
                    }

                    {/* code to display list of doctors ends here */}
                </Col>
            </Row>

        </>
    )
}

export default PatientsHome;
