import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";

export default function LogoutButton() {
    const navigate = useNavigate();
    return (
        <Button variant="dark" onClick={() => fetch('https://142.93.182.171/logout', { credentials: 'include' }).then(res => navigate('/'))}>Logout</Button>
    )

}
