import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Form, Button, Toast } from 'react-bootstrap';
import Header from '../header/Header';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { putData } from '../../components-bootstrap/api/api';


const ModifySlot = () => {
    const [user, setUser] = useState();
    const [slots, setSlots] = useState([]);
    const [calenderSlotdate, setCalenderSlotDate] = useState();
    const history = useHistory();
    const loggedUser = useSelector(state => state.user.loggedInUser);

    useEffect(() => {
        //loacalStorage implementation
        if (loggedUser === null) {
            history.push('/login');
        } else {
            setUser(loggedUser);
            setSlots(loggedUser.slots);
        }
        console.log("modifyLogged", loggedUser);
    }, [])



    const handleSlotChange = async (slotTime, slotDay, avail) => {
        // slotValue.available = false;
        slots.map((slot) => {
            if (slot.slotDay === slotDay) {
                slot.values.map((sv) => {
                    if (sv.slotTime === slotTime) {
                        // sv.available = avail;
                        sv.available = sv.available? false : true
                    }
                })
            }
        })
        console.log("user", user);
        let updateDoctorSlots = await putData(`doctors/${user.id}`, user);
        console.log("updateDoctorSlots", updateDoctorSlots);
        setUser(user);
        setSlots(slots);
    }




    const addDateButton = async () => {
        let date = new Date(calenderSlotdate);
        let slotValueArr = [];
        const slotTimeArr = ["10am-11am", "11am-12pm", "12pm-1am", "16pm-17pm", "17pm-18pm", "18pm-19pm"]
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        let monthText = monthNames[date.getMonth()];
        let dayText = dayNames[date.getDay()];
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        let day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        let modifiedDate = day + '-' + monthText + '-' + year;
        
        slotTimeArr.map((slotTimeLbl) => {
            let slotTimelblFirstTwoDigit = slotTimeLbl.split("-")[0].replace(/\D/g, "")
            let updatedSlotTime = `${dayText.substring(0, 3)} ${monthText.substring(0, 3)} ${day} ${year} ${slotTimelblFirstTwoDigit}:00:00 GMT+0530 (India Standard Time)`;
            let obj = {
                slotTimeLabel: slotTimeLbl,
                slotTime: updatedSlotTime,
                available: false
            }
          
            slotValueArr.push(obj);
        })

        console.log("slotValueArr",slotValueArr)
        let slotObj = {
            slotDayLabel: modifiedDate,
            values: slotValueArr
        };

        // slots.push(slotObj);
        // console.log("useraterpush", user);
        // setUser(user);
        setSlots([...slots, slotObj]);
        user?.slots.push(slotObj);
        let updateDoctorSlots = await putData(`doctors/${user.id}`, user);

    }

    const removeDate = async (slotDayLbl) => {
        let slotsArrayAfterRemoval = [];
        slotsArrayAfterRemoval = slots.filter(slot => slot.slotDayLabel !== slotDayLbl)
        setSlots(slots => slots.filter(slot => slot.slotDayLabel !== slotDayLbl));
        user.slots = slotsArrayAfterRemoval;
        let removeDoctorSlots = await putData(`doctors/${user.id}`, user);
        alert("You removed a slot succesfully");
    }



    return (
        <>
            <Header />
            {/* <Toast style={{width:"0px"}}>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">10am-11pm</strong>
                    
                </Toast.Header>
            </Toast> */}
            <Row>
                <Col md="1"></Col>
                <Col md='3'>


                    <Form>
                        <Form.Group controlId="dob">
                            <Form.Label>Select Date</Form.Label>
                            <Form.Control type="date" name="dob" placeholder="Date of Birth" onChange={(e) => {
                                setCalenderSlotDate(e.target.value);
                            }} />
                        </Form.Group>
                    </Form>

                </Col>
                <Col md='2'>
                    <div style={{ marginTop: "33px", marginLeft: "30px" }}>
                        <Button onClick={() => addDateButton()}>Add Date</Button>
                    </div>

                </Col>
            </Row>

            <Row style={{ marginTop: "20px" }}>
                <Col md="2"></Col>
                <Col md='3'><h4>Slots</h4></Col>
            </Row>

            {slots.map((slot) => {
                return (
                    <>
                     
                        <Row>
                            <Col md="2"></Col>
                            <Col md='4'>
                                <Toast style={{ width: "150px" }} onClose={() => removeDate(slot.slotDayLabel)}>
                                    <Toast.Header >
                                        <div style={{ width: "200px" }}><strong className="mr-auto" >{slot.slotDayLabel}</strong></div>

                                    </Toast.Header>
                                </Toast>
                               
                            </Col>
                        </Row>
                        <Row>
                            <Col md="2"></Col>
                            <Col md='8'>
                                <Form>
                                    <div className="mb-3">
                                        {slot.values.map((slotValue) => {
                                            return (
                                                <>


                                                    {slotValue.available ?

                                                        <Form.Check
                                                            inline
                                                            type="checkbox"
                                                            checked
                                                            label={slotValue.slotTimeLabel}
                                                            onChange={() => handleSlotChange(slotValue.slotTime, slot.slotDay, false)}
                                                        />

                                                        :

                                                        <Form.Check
                                                            inline
                                                            type="checkbox"
                                                            label={slotValue.slotTimeLabel}
                                                            onChange={() => handleSlotChange(slotValue.slotTime, slot.slotDay, true)}
                                                        />

                                                    }


                                                </>
                                            )
                                        })}

                                    </div>

                                </Form>
                            </Col>
                        </Row>


                    </>
                )
            })}


            {/* <Row style={{ marginTop: "20px" }}> <Col md="2"></Col>
                <Col md='3'><h5>3rd March</h5></Col></Row>
            <Row>
                <Col md="2"></Col>
                <Col md='3'>
                    <Form>
                        <div className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="10AM - 11AM"
                            // onChange={(e) => setIsDoctor(e.target.checked)}
                            />
                            <Form.Check
                                type="checkbox"
                                label="11AM - 12PM"
                            // onChange={(e) => setIsDoctor(e.target.checked)}
                            />
                            <Form.Check
                                type="checkbox"
                                label="12PM - 1PM"
                            // onChange={(e) => setIsDoctor(e.target.checked)}
                            />
                            <Form.Check
                                type="checkbox"
                                label="4PM - 5PM"
                            // onChange={(e) => setIsDoctor(e.target.checked)}
                            />
                            <Form.Check
                                type="checkbox"
                                label="5PM - 6PM"
                            // onChange={(e) => setIsDoctor(e.target.checked)}
                            />
                            <Form.Check
                                type="checkbox"
                                label="6PM - 7PM"
                            // onChange={(e) => setIsDoctor(e.target.checked)}
                            />
                        </div>
                    </Form>
                </Col>
            </Row> */}

        </>
    )
}

export default ModifySlot;