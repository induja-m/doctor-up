import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';
import Header from '../header/Header';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


const ModifySlot = () => {
    // const [slot, setSlot] 
    const loggedUser = useSelector(state => state.user.loggedInUser);

    useEffect(() => {
        //loacalStorage implementation
        // let userString = localStorage.getItem('user');
        // let userObj = userString != undefined ? JSON.parse(userString) : null;
        // if (userObj === null) {
        //     history.push('/login');
        // } else {
        //     setUser(userObj);
        // }

        //redux implementation
        // // when reloaded how to persist user - ask Radha
        // if (loggedUser === null) {
        //     history.push('/login');
        // } else {
        //     setUser(loggedUser);
        // }

    }, [])
    return (
        <>
            <Header />
            <Row style={{ marginTop: "20px" }}>
                <Col md="2"></Col>
                <Col md='3'><h4>Modify Slot</h4></Col>
            </Row>
            <Row style={{ marginTop: "20px" }}> <Col md="2"></Col>
                <Col md='3'><h5>2nd March</h5></Col></Row>
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
            </Row>
            <Row style={{ marginTop: "20px" }}> <Col md="2"></Col>
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
            </Row>

        </>
    )
}

export default ModifySlot;