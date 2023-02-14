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
                </Form.Group>
            </Form>
                </Col>
            </Row>
        </Container>
        </>
   ) 
}