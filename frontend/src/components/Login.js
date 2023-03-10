import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {LinkContainer} from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [userLogin, setUserLogin] = useState({"DODID": "", "SSN": ""})
    const [errors, setErrors] = useState({"DODID": false, "SSN": false})
    const navigate = useNavigate();


    // move all checking to useEffect
    useEffect(()=>{
        let currentErrors = errors;
        // regex for only numbers
        if (/^\d+$/.test(userLogin.SSN) === false || userLogin.SSN.length !== 9) {
            currentErrors = { ...currentErrors, "SSN": true }
        } else {
            currentErrors = { ...currentErrors, "SSN": false }
        }
        // regex for only numbers
        if (/^\d+$/.test(userLogin.DODID) === false || userLogin.DODID.length !== 10) {
            currentErrors = { ...currentErrors, "DODID": true }
        } else {
            currentErrors = { ...currentErrors, "DODID": false }
        }
        setErrors(currentErrors)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userLogin])

    const onFormSubmit = (e) => {
        e.preventDefault()
        if (errors.DODID === false && errors.SSN === false) {
            let stringifiedJSON = JSON.stringify(userLogin);
            fetch('https://142.93.182.171/login', {
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
                        navigate(`/update`)
                    } else if (e.target.id === "alertRosterButton"){
                        navigate('/alertroster')
                    } else if (e.target.id === "leadersportal") {
                        console.log('you do note have admin rights')
                    }
                } 
                else if (res.status === 250){
                    if (e.target.id === "login") {
                        navigate(`/update`)
                    } else if (e.target.id === "alertRosterButton") {
                        navigate('/alertroster')
                    } else if (e.target.id === "leadersportal") {
                        navigate('/leadersportal')
                    }
                }
            }) 
        }
    }

    return (
        <>
        <Container fluid="md">
            <Row>
                <Col>
                    <Form noValidate>
                        <Form.Group className="mb-3" controlId="formBasicDod">
                            <Form.Label>DOD ID</Form.Label>
                            <Form.Control required type="text" placeholder="Enter DOD ID" onChange={(e) => setUserLogin(userLogin => ({ ...userLogin, "DODID": e.target.value }))} value={userLogin.DODID} isInvalid={errors.DODID} />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid 10 digit DOD ID.
                            </Form.Control.Feedback>
                            {/* <Form.Text className="text-muted" >
                            We'll never share your DOD ID with anyone else.
                            </Form.Text> */}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Social Security Number</Form.Label>
                            <Form.Control required type="password" placeholder="SSN" onChange={(e) => setUserLogin(userLogin => ({ ...userLogin, "SSN": e.target.value }))} value={userLogin.SSN} isInvalid={errors.SSN} />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid 9 digit Social Security Number (no dashes).
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button id="login" variant="secondary" type="submit" onClick={onFormSubmit}>
                            Login
                        </Button>
                        <br />
                        <br />
                        <Button id="alertRosterButton" variant="secondary" type="submit" onClick={onFormSubmit}>
                            Alert Roster
                        </Button>
                        <br />
                        <br />
                        <Button id="leadersportal" variant="secondary" type="submit" onClick={onFormSubmit}>
                            Leaders' Portal
                        </Button>
                    </Form>

                    <br />
                    <LinkContainer to='/registration'>
                        <Button id="registrationButton" variant="secondary" type="button">
                            Registration
                        </Button>
                    </LinkContainer>
                    <br />
                    <br />
                </Col>
            </Row>
        </Container>
        </>
    )
}
