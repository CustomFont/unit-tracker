
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';

export default function UpdateInfo() {
    const [validated, setValidated] = useState(false);
    const [ errors, setErrors ] = useState({})
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ form, setForm ] = useState({})

    const [companies, setCompanies] = useState({})
    const [userData, setUserData] = useState([{
        "DODID": "",
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
    }])

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
            fetch('http://localhost:8080/register', init)
                .then(response => response.json())
                .then(data => {
                    console.log('Success!', data)
                })
            alert('Submitted!')
            window.location.href = '/'
        }
    }


    const queryString = window.location.href;
    const dod = queryString.substring(queryString.indexOf('?')+30)


    useEffect(() => {
        fetch('http://localhost:8080/units', { credentials: 'include' })
            .then(response => response.json())
            .then(data => setCompanies(data))
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8080/users/${dod}`, { credentials: 'include' })
            .then(response => response.json())
            .then(data => setUserData(data))
    }, [])
    
    let arrOfCompanies = []

    for (const c in companies) {
        arrOfCompanies.push(companies[c])
    }


    const findFormErrors = () => {
        const {
            DODID,
            last_name,
            first_name,
            middle_initial,
            rank,
            company_id,
            registration_key,
            mos,
            DOB,
            weight,
            height,
            hair_color,
            eye_color,
            blood_type,
            phone_number,
            address,
            is_leader
        } = form;
        const newErrors = {};
        if (!DODID || DODID === '' || DODID.length !== 10) newErrors.DODID = 'Please enter your DODID'
        if (!last_name || last_name === '') newErrors.last_name = 'Please enter your last name'
        if (!first_name || first_name === '') newErrors.first_name = 'Please enter your first name'
        if (!registration_key || registration_key === '') newErrors.registration_key = 'Enter a correct Registration Key'
        if (!mos || mos === '') newErrors.mos = 'Enter your MOS'
        if (!DOB || DOB === '') newErrors.DOB = 'Enter your date of birth'
        if (!weight || weight === 0) newErrors.weight = 'Enter your weight'
        if (!height || height === 0) newErrors.height = 'Enter your height'
        if (!blood_type || blood_type === 0) newErrors.blood_type = 'Enter your blood type'
        if (!phone_number || phone_number === 0 || phone_number.length !== 10) newErrors.phone_number = 'Enter your phone number'
        if (!address || address === 0) newErrors.address = 'Enter your home address'

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
                    <Form.Control disabled type="text" placeholder={userData[0].last_name} name="lastName"  />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control disabled type="text" placeholder={userData[0].first_name} name="firstName"  value={userData.first_name} />
                    <Form.Control.Feedback>Looks Good!</Form.Control.Feedback> 
                    <Form.Control.Feedback type='invalid'>{errors.first_name}</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Middle Initial</Form.Label>
                    <Form.Control disabled type="text" placeholder={userData[0].middle_initial} name="middleInitial" value={userData[0].middle_initial} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>DOD ID</Form.Label>
                    <Form.Control disabled type="text" placeholder={userData[0].DODID} name="DODID" value={userData.DODID} />
                    <Form.Control.Feedback type='invalid'>{errors.DODID}</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Rank</Form.Label>
                        <Form.Select value={userData[0].rank} onChange={(e) => setUserData(userData => ({...userData, "rank": e.target.value}))}>
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
                        <Form.Select name="company" value={userData[0].company_id} onChange={(e) => setUserData(userData => ({...userData, "company_id": e.target.value}))}>
                            {arrOfCompanies.map((n, i) => {
                                return (
                                    <option key={i}>{`${n.company_name}`}</option>
                                )
                            })}
                        </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Platoon</Form.Label>
                    <Form.Control type="text" placeholder="Platoon" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>PMOS</Form.Label>
                    <Form.Control required type="text" placeholder="Primary MOS" name="mos" value={userData[0].mos} isInvalid={!!errors.mos} onChange={(e) => [setUserData(userData => ({...userData, "mos": e.target.value})), setField("mos", e.target.value)]} />
                    <Form.Control.Feedback type='invalid'>{errors.mos}</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control disabled type="text" placeholder={userData[0].DOB} name="dob" value={userData[0].DOB} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Weight</Form.Label>
                    <Form.Control required type="text" placeholder={userData[0].weight} name="weight" value={userData[0].weight} isInvalid={!!errors.weight} onChange={(e) => [setUserData(userData => ({...userData, "weight": e.target.value})), setField("weight", e.target.value)]} />
                    <Form.Control.Feedback type='invalid'>{errors.weight}</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Height</Form.Label>
                    <Form.Control required type="text" placeholder={userData[0].height} name="height" value={userData[0].height} isInvalid={!!errors.height} onChange={(e) => [setUserData(userData => ({...userData, "height": e.target.value})), setField("height", e.target.value)]} />
                    <Form.Control.Feedback type='invalid'>{errors.height}</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Blood Type</Form.Label>
                    <Form.Control disabled type="text" placeholder={userData[0].blood_type} name="bloodtype" value={userData[0].blood_type} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control required type="text" placeholder={userData[0].phone_number} name="phonenumber" value={userData[0].phone_number} isInvalid={!!errors.phone_number} onChange={(e) => [setUserData(userData => ({...userData, "phone_number": e.target.value})), setField("phone_number", e.target.value)]} />
                    <Form.Control.Feedback type='invalid'>{errors.phone_number}</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control required type="text" placeholder={userData[0].address} name="address" value={userData[0].address} isInvalid={!!errors.address} onChange={(e) => [setUserData(userData => ({...userData, "address": e.target.value})), setField("address", e.target.value)]} />
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