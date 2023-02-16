import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {LinkContainer} from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [userLogin, setUserLogin] = useState({"DODID": "", "SSN": ""})
    const navigate = useNavigate();

    const onFormSubmit = e => {
        e.preventDefault()
        let stringifiedJSON = JSON.stringify(userLogin);
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: stringifiedJSON,
            withCredentials: true,
            credentials: 'include'
        }).then(res => {
            if(res.status === 200){
                if (e.target.id === "login") {
                    navigate('/registration')
                } else if (e.target.id === "alertRosterButton"){
                    navigate('/alertroster')
                } else if (e.target.id === "leadersportal") {
                    navigate('/leadersportal')
                }
            }
        }) 
    }

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
                    <Form.Control type="text" placeholder="Enter DOD ID" onChange={(e) => setUserLogin(userLogin => ({ ...userLogin, "DODID": e.target.value }))} value={userLogin.DODID} />
                    <Form.Text className="text-muted">
                    We'll never share your DOD ID with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Social Security Number</Form.Label>
                    <Form.Control type="password" placeholder="SSN" onChange={(e) => setUserLogin(userLogin => ({ ...userLogin, "SSN": e.target.value }))} value={userLogin.SSN} />
                </Form.Group>
                <Button id="login" variant="primary" type="submit" onClick={onFormSubmit}>
                    Login
                </Button>
                <br />
                <br />
                <Button id="alertRosterButton" variant="secondary" type="submit" onClick={onFormSubmit}>
                    Alert Roster
                </Button>
                <br />
                <br />
                <Button id="leadersportal" variant="danger" type="submit" onClick={onFormSubmit}>
                    Leaders' Portal
                </Button>
            </Form>

            <br />
            <LinkContainer to='/registration'>
                <Button id="registrationButton" variant="success" type="button">
                    Registration
                </Button>
            </LinkContainer>
            <br />
            <br />
        </>
    )
}