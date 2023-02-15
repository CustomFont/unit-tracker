import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Login from './login';


export default function Splashpage() {
    return (
        <Container>
            <Row>
                <Col><h1>Unit Tracker</h1></Col>
            </Row>
            <br />
            <br />
            <Row>
               <Col xs={5} md={{ span: 4, offset: 4 }}>
                <Login /> 
               </Col> 
            </Row>
        </Container>
    )
}