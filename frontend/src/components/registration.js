import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';

export default function Registration() {
      const [validated, setValidated] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [companies, setCompanies] = useState({})
    const [userData, setUserData] = useState({
        "DODID": 0,
        "SSN": "",
        "last_name": "",
        "first_name": "",
        "middle_initial": "",
        "rank": "",
        "company_id": 1,
        "registration_key": "",
        "mos": "",
        "DOB": "",
        "weight": 0,
        "height": 0,
        "hair_color": "",
        "eye_color": "",
        "blood_type": "",
        "phone_number": 0,
        "address": "",
        "is_leader": false
    })

    const init = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    };

    const handleSubmit = (e) => {
        // e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            handleShow()
        }
        setValidated(true);
        fetch('http://localhost:8080/register', init)
            .then(response => response.json())
            .then(data => {
                console.log('Success!', data)
            })
    }

    useEffect(() => {
        fetch('http://localhost:8080/units')
            .then(response => response.json())
            .then(data => setCompanies(data))
    }, [])
    
    let arrOfCompanies = []

    for (const c in companies) {
        arrOfCompanies.push(companies[c])
    }

    // console.log(arrOfCompanies)

    // function handleChange(event) {
    //     const value = event.target.value;
    //     setUserData({
    //         ...userData,
    //         [event.target.name]: value
    //     })
    // }



   return (
        <>
        <Container>
            <Row>
                <Col><h1>Registration</h1></Col>
            </Row>
            <br />
            <br />
            <Row>
                <Col xs={5} md={{ span: 4, offset: 4 }}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control required type="text" placeholder="Last Name" name="lastName" value={userData.last_name} onChange={(e) => setUserData(userData => ({...userData, "last_name": e.target.value}))} />
                    <Form.Control.Feedback>Looks Good!</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control required type="text" placeholder="First Name" name="firstName" value={userData.first_name} onChange={(e) => setUserData(userData => ({...userData, "first_name": e.target.value}))} />
                    <Form.Control.Feedback>Looks Good!</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Middle Initial</Form.Label>
                    <Form.Control type="text" placeholder="Middle Initial" name="middleInitial" value={userData.middle_initial} onChange={(e) => setUserData(userData => ({...userData, "middle_initial": e.target.value}))} />
                    <Form.Control.Feedback>Looks Good!</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>SSN</Form.Label>
                    <Form.Control required type="text" placeholder="Social Security Number" name="ssn" value={userData.SSN} onChange={(e) => setUserData(userData => ({...userData, "SSN": e.target.value}))} />
                    <Form.Control.Feedback>Looks Good!</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>DOD ID</Form.Label>
                    <Form.Control required type="text" placeholder="DOD ID" name="DODID" value={userData.DODID} onChange={(e) => setUserData(userData => ({...userData, "DODID": e.target.value}))} />
                    <Form.Control.Feedback>Looks Good!</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Rank</Form.Label>
                        <Form.Select value={userData.rank} onChange={(e) => setUserData(userData => ({...userData, "rank": e.target.value}))}>
                            <option>PV1</option>
                            <option>PV2</option>
                            <option>PFC</option>
                            <option>SPC</option>
                            <option>CPL</option>
                            <option>SGT</option>
                            <option>SSG</option>
                            <option>SFC</option>
                        </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Organization</Form.Label>
                        <Form.Select name="company" value={userData.company_id} onChange={(e) => setUserData(userData => ({...userData, "company_id": e.target.value}))}>
                            {arrOfCompanies.map((n, i) => {
                                return (
                                    <option key={i}>{`${n.company_name}`}</option>
                                )
                            })}
                        </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Registration Key</Form.Label>
                    <Form.Control required type="text" placeholder="Registration Key" name="registration_key" value={userData.registration_key} onChange={(e) => setUserData(userData => ({...userData, "registration_key": e.target.value}))} />
                    <Form.Control.Feedback>Looks Good!</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Platoon</Form.Label>
                    <Form.Control required type="text" placeholder="Platoon" />
                    <Form.Control.Feedback>Looks Good!</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>PMOS</Form.Label>
                    <Form.Control required type="text" placeholder="Primary MOS" name="mos" value={userData.mos} onChange={(e) => setUserData(userData => ({...userData, "mos": e.target.value}))} />
                    <Form.Control.Feedback>Looks Good!</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control required type="date" placeholder="Date of Birth" name="dob" value={userData.DOB} onChange={(e) => setUserData(userData => ({...userData, "DOB": e.target.value}))} />
                    <Form.Control.Feedback>Looks Good!</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control required type="text" placeholder="Age" />
                    <Form.Control.Feedback>Looks Good!</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Weight</Form.Label>
                    <Form.Control required type="text" placeholder="Weight" name="weight" value={userData.weight} onChange={(e) => setUserData(userData => ({...userData, "weight": e.target.value}))} />
                    <Form.Control.Feedback>Looks Good!</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Height</Form.Label>
                    <Form.Control required type="text" placeholder="Height in Centimeters" name="height" value={userData.height} onChange={(e) => setUserData(userData => ({...userData, "height": e.target.value}))} />
                    <Form.Control.Feedback>Looks Good!</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Blood Type</Form.Label>
                    <Form.Control required type="text" placeholder="Blood Type" name="bloodtype" value={userData.blood_type} onChange={(e) => setUserData(userData => ({...userData, "blood_type": e.target.value}))} />
                    <Form.Control.Feedback>Looks Good!</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control required type="text" placeholder="Phone number" name="phonenumber" value={userData.phone_number} onChange={(e) => setUserData(userData => ({...userData, "phone_number": e.target.value}))} />
                    <Form.Control.Feedback>Looks Good!</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control required type="text" placeholder="Address" name="address" value={userData.address} onChange={(e) => setUserData(userData => ({...userData, "address": e.target.value}))} />
                    <Form.Control.Feedback>Looks Good!</Form.Control.Feedback> 
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Successfully Registered! Click close to return to the login screen.</Modal.Body>
                    <Modal.Footer>
                        <LinkContainer to='/'>
                            <Button variant="secondary" type="button">
                                Close
                            </Button>
                        </LinkContainer>
                    </Modal.Footer>
                </Modal>
            </Form>
                </Col>
            </Row>
        </Container>
        </>
   ) 
}