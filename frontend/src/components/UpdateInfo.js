import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import LogoutButton from './LogoutButton';
import { useNavigate } from 'react-router-dom';



export default function UpdateInfo() {
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [validated, setValidated] = useState(false);
    const [ errors, setErrors ] = useState({})
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
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
        "address": ""
    }])
    const [newUserData, setNewUserData] = useState({})
   
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const init = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUserData),
            credentials: 'include'
        };
        const newErrors = findFormErrors();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            fetch('http://localhost:8080/update', init)
                .then(response => response.json())
                .then(data => {
                    console.log('Success!', data)
                })
            alert('Submitted!')
            window.location.href = '/'
        }
    }

    useEffect(() => {
        fetch('http://localhost:8080/units', { credentials: 'include' })
            .then(response => response.json())
            .then(data => setCompanies(data))
        fetch(`http://localhost:8080/soldier-record`, { credentials: 'include' })
            .then(response => response.json())
            .then(jsonData =>  {
                let data = jsonData[0];
                setNewUserData(newUserData => ({ ...newUserData, "company_id": data.company_id }))
                setNewUserData(newUserData => ({...newUserData, "rank": data.rank}))
                setUserData(jsonData)
                return
            })
    }, [])
    let arrOfCompanies = []
    for (const c in companies) {
        arrOfCompanies.push(companies[c])
    }

    const findFormErrors = () => {
        const {
            phone_number
        } = form;
        const newErrors = {};
        if (phone_number && phone_number.length !== 10) newErrors.phone_number = 'Enter your phone number'

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
            <Container fluid>    
            <Col>
                <Button id="alertRosterButton" variant="dark" type="submit" onClick={() => navigate('/alertroster')}>
                    Alert Roster
                </Button>
                <LogoutButton />
            </Col>
            <Row>   
                <Col>
                    <h1>Update Information</h1>
                </Col>
            </Row>
            <br />
            <br />
            <Row>
                <Col md={{ span: 4, offset: 4 }}>
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
                    <Form.Control disabled type="text" placeholder={userData[0].DODID} name="DODID" value={userData[0].DODID} />
                    <Form.Control.Feedback type='invalid'>{errors.DODID}</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Rank</Form.Label>
                        <Form.Select required value={newUserData.rank} onChange={(e) => setNewUserData(newUserData => ({ ...newUserData, "rank": e.target.value}))}>
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
                        <Form.Select required name="company" value={newUserData.company_id} onChange={(e) => setNewUserData(newUserData => ({ ...newUserData, "company_id": e.target.value}))}>
                            {arrOfCompanies.map((n, i) => {
                                return (
                                    <option key={i+1} value={i+1}>{`${n.company_name}`}</option>
                                )
                            })}
                        </Form.Select>
                </Form.Group>
                {/* <Form.Group className="mb-3">
                    <Form.Label>Platoon</Form.Label>
                    <Form.Control type="text" placeholder="Platoon" />
                </Form.Group> */}
                <Form.Group className="mb-3">
                    <Form.Label>PMOS</Form.Label>
                               <Form.Control type="text" placeholder={userData[0].mos} name="mos" value={newUserData.mos} isInvalid={!!errors.mos} onChange={(e) => [setNewUserData(newUserData => ({ ...newUserData, "mos": e.target.value})), setField("mos", e.target.value)]} />
                    <Form.Control.Feedback type='invalid'>{errors.mos}</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                               <Form.Control disabled type="text" placeholder={userData[0].DOB.toString()} name="dob" value={newUserData.DOB} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Weight</Form.Label>
                               <Form.Control type="text" placeholder={userData[0].weight} name="weight" value={newUserData.weight} isInvalid={!!errors.weight} onChange={(e) => [setNewUserData(newUserData => ({ ...newUserData, "weight": e.target.value})), setField("weight", e.target.value)]} />
                    <Form.Control.Feedback type='invalid'>{errors.weight}</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Height</Form.Label>
                               <Form.Control type="text" placeholder={userData[0].height} name="height" value={newUserData.height} isInvalid={!!errors.height} onChange={(e) => [setNewUserData(newUserData => ({ ...newUserData, "height": e.target.value})), setField("height", e.target.value)]} />
                    <Form.Control.Feedback type='invalid'>{errors.height}</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Blood Type</Form.Label>
                               <Form.Control disabled type="text" placeholder={userData[0].blood_type} name="bloodtype" value={newUserData.blood_type} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                               <Form.Control type="text" placeholder={userData[0].phone_number} name="phonenumber" value={newUserData.phone_number} isInvalid={!!errors.phone_number} onChange={(e) => [setNewUserData(newUserData => ({ ...newUserData, "phone_number": e.target.value})), setField("phone_number", e.target.value)]} />
                    <Form.Control.Feedback type='invalid'>{errors.phone_number}</Form.Control.Feedback> 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                               <Form.Control type="text" placeholder={userData[0].address} name="address" value={newUserData.address} isInvalid={!!errors.address} onChange={(e) => [setNewUserData(newUserData => ({ ...newUserData, "address": e.target.value})), setField("address", e.target.value)]} />
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
                
            <br />
            <br />
            </Container>
        </>
   )
}
