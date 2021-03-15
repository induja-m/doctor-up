//login component for user and doctor login

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./login.css";
import { getData } from '../../components-bootstrap/api/api';
import Header from '../header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser } from "../../redux/actions/userActions";

const Login = (props) => {
    // localStorage.removeItem("user");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isDoctor, setIsDoctor] = useState(false);

    const dispatcher = useDispatch();

    const validateForm = () => {
        return userName.length > 0 && password.length > 0;
    }


    //submit login and check 
    const handleSubmit = async (event) => {
        event.preventDefault();
        let result = await getDataLogin();
        if (result?.data?.length === 1) {
            let usersPath = isDoctor ? "doctors" : "patients";
            props.history.push(`/${usersPath}/home`);
        } else {
            alert("Invalid credentials");
        }
    }

    //getData from db after login and dispatch the response to reducer to save the object
    const getDataLogin = async () => {
        let users = isDoctor ? "doctors" : "patients";
        let response = await getData(`${users}?username=${userName}&password=${password}`);
        dispatcher(saveUser(response.data[0]));
        // localStorage.setItem("user", JSON.stringify(response.data[0]));
        return response;
    }


    return (
        <>
            {/* using header component to display navbar  */}
            <Header />
            {/* form for login starts here */}
            <div className="Login">

                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="userName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="checkBox">
                        <Form.Check
                        className="custom-checkbox"
                            type="checkbox"
                            label="Login as Doctor"
                            onChange={(e) => setIsDoctor(e.target.checked)}
                            
                        />
                    </Form.Group>
                    <Button block size="lg" type="submit" disabled={!validateForm()}>
                        Login
        </Button>
                </Form>
            </div>
            {/* form for login ends here */}
        </>
    );
}

export default Login;

