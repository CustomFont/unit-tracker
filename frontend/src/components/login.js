import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {LinkContainer} from 'react-router-bootstrap'

export default function Login() {
    return (
        <>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>UNIT</Form.Label>
                        <Form.Select> 
                            <option>5-73CAV</option>
                            <option>1-505PIR</option>
                            <option>Some Other Unit</option>
                            <option>And Some Red Devil Baggy Pants Unit</option>
                        </Form.Select>
                </Form.Group> 

                <Form.Group className="mb-3" controlId="formBasicDod">
                    <Form.Label>DOD ID</Form.Label>
                    <Form.Control type="text" placeholder="Enter DOD ID" />
                    <Form.Text className="text-muted">
                    We'll never share your DOD ID with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Social Security Number</Form.Label>
                    <Form.Control type="password" placeholder="SSN" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <br />
            <LinkContainer to='/alertroster'>
                <Button variant="secondary" type="button">
                    Alert Roster
                </Button>
            </LinkContainer>
            <br />
            <br />
            <LinkContainer to='/registration'>
                <Button variant="success" type="button">
                    Registration
                </Button>
            </LinkContainer>
            <br />
            <br />
            <LinkContainer to='/leadersportal'>
                <Button variant="danger" type="button">
                    Leaders' Portal
                </Button>
            </LinkContainer>
        </>
    )
}