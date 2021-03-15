import React,{useState} from 'react';
import {Modal, Button, Badge} from 'react-bootstrap';
import Header from "../header/Header";

const BookAppointmentModal=()=>{
  // console.log("props", handleClose)
  
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   
  
    return (
      <>
       <Header/>
        <Button variant="primary" onClick={handleShow}>
          Launch static backdrop modal
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Appointment with Dr.Induja</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <p>Consultation Fee Rs.1000</p>
           <p>Available Slots:</p>
           <Badge pill variant="secondary" style={{ fontSize: "15px" }}>
                                10AM - 11AM
                    </Badge>{' '}
                    <Badge pill variant="secondary" style={{ fontSize: "15px" }}>
                                10AM - 11AM
                    </Badge>{' '}
                    <Badge pill variant="secondary" style={{ fontSize: "15px" }}>
                                10AM - 11AM
                    </Badge>{' '}
                    <Badge pill variant="secondary" style={{ fontSize: "15px" }}>
                                10AM - 11AM
                    </Badge>{' '}
                    <Badge pill variant="secondary" style={{ fontSize: "15px" }}>
                                10AM - 11AM
                    </Badge>{' '}
                    <Badge pill variant="secondary" style={{ fontSize: "15px" }}>
                                10AM - 11AM
                    </Badge>{' '}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">
              Close
            </Button>
            <Button variant="primary">Confirm Booking</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default BookAppointmentModal;