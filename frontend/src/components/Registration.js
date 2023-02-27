import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

export default function Registration() {
    // eslint-disable-next-line no-unused-vars
    const [validated, setValidated] = useState(false);
    const [ errors, setErrors ] = useState({})
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [ form, setForm ] = useState({})

    const [companies, setCompanies] = useState({})
    const [userData, setUserData] = useState({
        "DODID": "",
        "SSN": "",
        "last_name": "",
        "first_name": "",
        "middle_initial": "",
        "rank": "",
        "company_id": 1,
        "registration_key": "",
        "mos": "",
        "DOB": "",
        "weight": "",
        "height": "",
        "hair_color": "",
        "eye_color": "",
        "blood_type": "",
        "phone_number": "",
        "address": "",
        "is_leader": false
    })

    const init = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
        credentials: 'include'
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = findFormErrors();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            fetch('http://localhost:8080/registration', init)
                .then(response => response.json())
                .then(data => {
                    console.log('Success!', data)
                })
            alert('Submitted!')
            window.location.href = '/'
        }
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

    const findFormErrors = () => {
        const {
            DODID,
            SSN,
            last_name,
            first_name,
            registration_key,
            mos,
            DOB,
            weight,
            height,
            blood_type,
            phone_number,
            address
        } = form;
        const newErrors = {};
        if (!DODID || DODID === '' || DODID.length !== 10 || typeof parseInt(DODID) !== 'number') newErrors.DODID = 'Please enter your 10 digit DODID'
        if (!SSN || SSN === '' || SSN.length !== 9 || typeof parseInt(SSN) !== 'number') newErrors.SSN = 'Please enter your 9 digit SSN'
        if (!last_name || last_name === '') newErrors.last_name = 'Please enter your last name'
        if (!first_name || first_name === '') newErrors.first_name = 'Please enter your first name'
        if (!registration_key || registration_key === '') newErrors.registration_key = `Enter your organization's unique Registration Key`
        if (!mos || mos === '') newErrors.mos = 'Please enter your MOS code'
        if (!DOB || DOB === '') newErrors.DOB = 'Please select your date of birth'
        if (!weight || weight === 0 || typeof parseInt(weight) !== 'number') newErrors.weight = 'Please enter your weight in lbs'
        if (!height || height === 0 || typeof parseInt(height) !== 'number') newErrors.height = 'Please enter your height in centimeters'
        if (!blood_type || blood_type === 0) newErrors.blood_type = 'Please enter your blood type'
        if (!phone_number || phone_number === 0 || phone_number.length !== 10 || typeof parseInt(phone_number) !== 'number') newErrors.phone_number = 'Please enter your phone number ex. 0000000000'
        if (!address || address === 0) newErrors.address = 'Please enter your current home or barracks address'

        return newErrors
    }

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        if ( !!errors[field] ) setErrors({
            ...errors,
            [field]: null
        })
    }


   return (
        <>
        <Container fluid="md">
            <Row>
                <Col><h1>Registration</h1></Col>
            </Row>
            <br />
            <br />
            <Row>
                <Col md={{ span: 4, offset: 4 }}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control required type="text" placeholder="Last Name" name="lastName" isInvalid={ !!errors.last_name} value={userData.last_name} onChange={(e) => [setUserData(userData => ({...userData, "last_name": e.target.value})), setField("last_name", e.target.value)]} />
                    <Form.Control.Feedback type='invalid'>{errors.last_name}</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control required type="text" placeholder="First Name" name="firstName" isInvalid={!!errors.first_name} value={userData.first_name} onChange={(e) => [setUserData(userData => ({...userData, "first_name": e.target.value})), setField("first_name", e.target.value)]} />
                    <Form.Control.Feedback>Looks Good!</Form.Control.Feedback> 
                    <Form.Control.Feedback type='invalid'>{errors.first_name}</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Middle Initial</Form.Label>
                    <Form.Control type="text" placeholder="Middle Initial" name="middleInitial" value={userData.middle_initial} onChange={(e) => setUserData(userData => ({...userData, "middle_initial": e.target.value}))} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>SSN</Form.Label>
                    <Form.Control required type="text" placeholder="Social Security Number" name="ssn" isInvalid={!!errors.SSN} value={userData.SSN} onChange={(e) => [setUserData(userData => ({...userData, "SSN": e.target.value})), setField("SSN", e.target.value)]} />
                    <Form.Control.Feedback type='invalid'>{errors.SSN}</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>DOD ID</Form.Label>
                    <Form.Control required type="text" placeholder="DOD ID" name="DODID" isInvalid={!!errors.DODID} value={userData.DODID} onChange={(e) => [setUserData(userData => ({...userData, "DODID": e.target.value})), setField("DODID", e.target.value)]} />
                    <Form.Control.Feedback type='invalid'>{errors.DODID}</Form.Control.Feedback> 
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
                                    <option key={i + 1} value={i + 1}>{`${n.company_name}`}</option>
                                )
                            })}
                        </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Registration Key</Form.Label>
                    <Form.Control required type="text" placeholder="Registration Key" name="registration_key" isInvalid={!!errors.registration_key} value={userData.registration_key} onChange={(e) => [setUserData(userData => ({...userData, "registration_key": e.target.value})), setField("registration_key", e.target.value)]} />
                    <Form.Control.Feedback type='invalid'>{errors.registration_key}</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Platoon</Form.Label>
                    <Form.Control type="text" placeholder="Platoon" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>PMOS</Form.Label>
                    <Form.Control required type="text" placeholder="Primary MOS" name="mos" value={userData.mos} isInvalid={!!errors.mos} onChange={(e) => [setUserData(userData => ({...userData, "mos": e.target.value})), setField("mos", e.target.value)]} />
                    <Form.Control.Feedback type='invalid'>{errors.mos}</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control required type="date" placeholder="Date of Birth" name="dob" value={userData.DOB} isInvalid={!!errors.DOB} onChange={(e) => [setUserData(userData => ({...userData, "DOB": e.target.value})), setField("DOB", e.target.value)]} />
                    <Form.Control.Feedback type='invalid'>{errors.DOB}</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control required type="text" placeholder="Age" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Weight</Form.Label>
                    <Form.Control required type="text" placeholder="Weight" name="weight" value={userData.weight} isInvalid={!!errors.weight} onChange={(e) => [setUserData(userData => ({...userData, "weight": e.target.value})), setField("weight", e.target.value)]} />
                    <Form.Control.Feedback type='invalid'>{errors.weight}</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Height</Form.Label>
                    <Form.Control required type="text" placeholder="Height in Inches" name="height" value={userData.height} isInvalid={!!errors.height} onChange={(e) => [setUserData(userData => ({...userData, "height": e.target.value})), setField("height", e.target.value)]} />
                    <Form.Control.Feedback type='invalid'>{errors.height}</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Blood Type</Form.Label>
                    <Form.Control required type="text" placeholder="Blood Type" name="bloodtype" value={userData.blood_type} isInvalid={!!errors.blood_type} onChange={(e) => [setUserData(userData => ({...userData, "blood_type": e.target.value})), setField("blood_type", e.target.value)]} />
                    <Form.Control.Feedback type='invalid'>{errors.blood_type}</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control required type="text" placeholder="Phone number" name="phonenumber" value={userData.phone_number} isInvalid={!!errors.phone_number} onChange={(e) => [setUserData(userData => ({...userData, "phone_number": e.target.value})), setField("phone_number", e.target.value)]} />
                    <Form.Control.Feedback type='invalid'>{errors.phone_number}</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control required type="text" placeholder="Address" name="address" value={userData.address} isInvalid={!!errors.address} onChange={(e) => [setUserData(userData => ({...userData, "address": e.target.value})), setField("address", e.target.value)]} />
                    <Form.Control.Feedback type='invalid'>{errors.address}</Form.Control.Feedback> 
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
