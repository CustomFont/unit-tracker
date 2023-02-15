import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';

export default function Registration() {

    const [companies, setCompanies] = useState({})
    const [userData, setUserData] = useState({
        "DODID": 1234567890,
        "SSN": "1234",
        "last_name": "Hash",
        "first_name": "Test",
        "middle_initial": "T",
        "rank": "CPT",
        "company_id": 1,
        "mos": "11B",
        "DOB": "1977-03-14T05:00:00.000Z",
        "weight": 155.23,
        "height": 69,
        "hair_color": "brown",
        "eye_color": "hazel",
        "blood_type": "O POS",
        "phone_number": 2125567798,
        "address": "1577 Default Blvd, Old York, OY, 10023",
        "is_leader": false
    })
    // const init = {
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    // };
    useEffect(() => {
        fetch('http://localhost:8081/units')
            .then(response => response.json())
            .then(data => setCompanies(data))
    }, [])
    
    let arrOfCompanies = []

    for (const c in companies) {
        arrOfCompanies.push(companies[c])
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
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" />
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" />
                    <Form.Label>SSN</Form.Label>
                    <Form.Control type="text" placeholder="Social Security Number" />
                    <Form.Label>DOD ID</Form.Label>
                    <Form.Control type="text" placeholder="DOD ID" />
                    <Form.Label>Rank</Form.Label>
                        <Form.Select>
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
                        <Form.Select>
                            {arrOfCompanies.map((n, i) => {
                                return (
                                    <option key={i}>{`${n.company_name}`}</option>
                                )
                            })}
                        </Form.Select>
                    <Form.Label>Platoon</Form.Label>
                    <Form.Control type="text" placeholder="Platoon" />
                    <Form.Label>PMOS</Form.Label>
                    <Form.Control type="text" placeholder="Primary MOS" />
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" placeholder="Date of Birth" />
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="text" placeholder="Age" />
                    <Form.Label>Weight</Form.Label>
                    <Form.Control type="text" placeholder="Weight" />
                    <Form.Label>Height</Form.Label>
                    <Form.Control type="text" placeholder="Height in Centimeters" />
                    <Form.Label>Blood Type</Form.Label>
                    <Form.Control type="text" placeholder="Blood Type" />
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" placeholder="Phone number" />
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Address" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            {/* yo mama */}
            </Form>
                </Col>
            </Row>
        </Container>
        </>
   ) 
}