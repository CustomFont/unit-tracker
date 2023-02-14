import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Registration() {
   return (
        <>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" />
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" />
                </Form.Group>
            </Form>
        </>
   ) 
}