import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react';

export default function Registration() {

    const [companies, setCompanies] = useState({})
    const [userData, setUserData] = useState({
        "DODID": 0,
        "SSN": "",
        "last_name": "",
        "first_name": "",
        "middle_initial": "",
        "rank": "",
        "company_id": 1,
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
        e.preventDefault();
        fetch('http://localhost:8080/register', init)
            .then(response => response.json())
            .then(data => {
                console.log('Success!', data)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
        console.log(JSON.stringify(userData))
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
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" name="lastName" value={userData.last_name} onChange={(e) => setUserData(userData => ({...userData, "last_name": e.target.value}))} />
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" name="firstName" value={userData.first_name} onChange={(e) => setUserData(userData => ({...userData, "first_name": e.target.value}))} />
                    <Form.Label>Middle Initial</Form.Label>
                    <Form.Control type="text" placeholder="Middle Initial" name="middleInitial" value={userData.middle_initial} onChange={(e) => setUserData(userData => ({...userData, "middle_initial": e.target.value}))} />
                    <Form.Label>SSN</Form.Label>
                    <Form.Control type="text" placeholder="Social Security Number" name="ssn" value={userData.SSN} onChange={(e) => setUserData(userData => ({...userData, "SSN": e.target.value}))} />
                    <Form.Label>DOD ID</Form.Label>
                    <Form.Control type="text" placeholder="DOD ID" name="DODID" value={userData.DODID} onChange={(e) => setUserData(userData => ({...userData, "DODID": e.target.value}))} />
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
                    <Form.Label>Organization</Form.Label>
                        <Form.Select name="company" value={userData.company_id} onChange={(e) => setUserData(userData => ({...userData, "company_id": e.target.value}))}>
                            {arrOfCompanies.map((n, i) => {
                                return (
                                    <option key={i}>{`${n.company_name}`}</option>
                                )
                            })}
                        </Form.Select>
                    <Form.Label>Platoon</Form.Label>
                    <Form.Control type="text" placeholder="Platoon" />
                    <Form.Label>PMOS</Form.Label>
                    <Form.Control type="text" placeholder="Primary MOS" name="mos" value={userData.mos} onChange={(e) => setUserData(userData => ({...userData, "mos": e.target.value}))} />
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" placeholder="Date of Birth" name="dob" value={userData.DOB} onChange={(e) => setUserData(userData => ({...userData, "DOB": e.target.value}))} />
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="text" placeholder="Age" />
                    <Form.Label>Weight</Form.Label>
                    <Form.Control type="text" placeholder="Weight" name="weight" value={userData.weight} onChange={(e) => setUserData(userData => ({...userData, "weight": e.target.value}))} />
                    <Form.Label>Height</Form.Label>
                    <Form.Control type="text" placeholder="Height in Centimeters" name="height" value={userData.height} onChange={(e) => setUserData(userData => ({...userData, "height": e.target.value}))} />
                    <Form.Label>Blood Type</Form.Label>
                    <Form.Control type="text" placeholder="Blood Type" name="bloodtype" value={userData.blood_type} onChange={(e) => setUserData(userData => ({...userData, "blood_type": e.target.value}))} />
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" placeholder="Phone number" name="phonenumber" value={userData.phone_number} onChange={(e) => setUserData(userData => ({...userData, "phone_number": e.target.value}))} />
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Address" name="address" value={userData.address} onChange={(e) => setUserData(userData => ({...userData, "address": e.target.value}))} />
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
                </Col>
            </Row>
        </Container>
        </>
   ) 
}