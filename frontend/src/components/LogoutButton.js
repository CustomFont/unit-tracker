import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router";

export default function LogoutButton() {
    const navigate = useNavigate();
    return (
        <Button variant="dark" onClick={() => fetch('http://localhost:8080/logout', { credentials: 'include' }).then(res => navigate('/'))}>Logout</Button>
    )

}