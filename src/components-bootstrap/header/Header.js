import { Navbar, Nav, NavDropdown } from "react-bootstrap"
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Header = ({ children }) => {
    const [userName, setUserName] = useState();
    const loggedUser = useSelector(state => state.user.loggedInUser);

    useEffect(() => {
        //loacalStorage implementation
        // let userString = localStorage.getItem('user');
        // let userObj = JSON.parse(userString);
        // let uName = userObj != undefined ? userObj.name : null
        // setUserName(uName);

        //redux implementation
        if(loggedUser !== null){
            setUserName(loggedUser.name);
        }
    }, [])

    return (

        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Consult Doctor</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" >
                {userName === null ? null :
                    <Nav className="ml-auto">
                        <NavDropdown title={userName} id="basic-nav-dropdown" alignRight>
                            {children}
                            <NavDropdown.Item href="/login">Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                }
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;
