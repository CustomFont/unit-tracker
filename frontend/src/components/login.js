import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {LinkContainer} from 'react-router-bootstrap'

export default function Login() {
    const [userLogin, setUserLogin] = useState({"DODID": undefined, "SSN": undefined})

    const onFormSubmit = e => {
        e.preventDefault()
        let stringifiedJSON = JSON.stringify(userLogin);
        console.log(stringifiedJSON)
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: stringifiedJSON,
            withCredentials: true,
            credentials: 'include'
        }).then(res => console.log(res.session))
    }
    const getallusers = () => {
        fetch('http://localhost:8080/users', { credentials: 'include' })
            .then(res => res.json())
            .then(data => console.log(data))
    }
    return (
        <>
            <Form onSubmit={onFormSubmit}>
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
                    <Form.Control type="text" placeholder="Enter DOD ID" onChange={(e) => setUserLogin(userLogin => ({ ...userLogin, "DODID": e.target.value }))} value={userLogin.DODID} />
                    <Form.Text className="text-muted">
                    We'll never share your DOD ID with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Social Security Number</Form.Label>
                    <Form.Control type="password" placeholder="SSN" onChange={(e) => setUserLogin(userLogin => ({ ...userLogin, "SSN": e.target.value }))} value={userLogin.SSN} />
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
                <Button variant="success" type="button" onClick={getallusers}>
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