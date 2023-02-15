import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Registration() {
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
                            <option>5-73CAV</option>
                            <option>1-505PIR</option>
                            <option>Some Other Unit</option>
                            <option>And Some Red Devil Baggy Pants Unit</option>
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
            </Form>
                </Col>
            </Row>
        </Container>
        </>
   ) 
}