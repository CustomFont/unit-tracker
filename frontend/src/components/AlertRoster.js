import React, { useEffect, useState } from "react"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import LogoutButton from './LogoutButton'
import { useNavigate } from "react-router"

export default function AlertRoster () {
    const [list, setList] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:8080/users', { credentials: 'include' }) 
            .then((res) => res.json())
            .then(data => setList(data))
    }, [])

    useEffect(() => {
        if (searchInput.length > 0) {
            setSearchResults(list.filter((user) => 
                user.last_name.toLowerCase().includes(searchInput.toLowerCase()) 
                || user.first_name.toLowerCase().includes(searchInput.toLowerCase())
                || user.DODID.toString().includes(searchInput)))
        } 
    }, [searchInput])

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value)
    };
        
    const onSubmit = (e) => {
        e.preventDefault();
        setSearchResults(list.filter((user) => 
            user.last_name.toLowerCase().includes(searchInput.toLowerCase()) 
            || user.first_name.toLowerCase().includes(searchInput.toLowerCase())
            || user.DODID.toString().includes(searchInput)))
    }

    const navigateToLeadersPortal = () => {
        // if (is_leader = true) {
            navigate('/leadersportal')
        // }
    }

    const renderHelper = () => {
        if(searchInput === '') {
            return list.map(data => {
                return (
                    <tr key={data.DODID}>
                        <td>{data.rank}</td>
                        <td>{data.last_name}</td>
                        <td>{data.first_name}</td>
                        <td>{data.mos}</td>
                        <td>{data.phone_number.toString().replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}</td>
                        <td>{data.address}</td>
                    </tr>
                )
            })
        }
        if(searchInput !== '') {
            return searchResults.map(data => {
                return (
                    <tr key={data.DODID}>
                        <td>{data.rank}</td>
                        <td>{data.last_name}</td>
                        <td>{data.first_name}</td>
                        <td>{data.mos}</td>
                        <td>{data.phone_number.toString().replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}</td>
                        <td>{data.address}</td>
                    </tr>
                )
            })
        }
    }
    
    return (
        <div className="alert-container">
            <h1>Alert Roster</h1>
            <LogoutButton />
            <button className="return2LP" onClick={(navigateToLeadersPortal)}>Return to Leaders Portal</button>
            <form onSubmit={onSubmit}>
                <input type='text' placeholder="Search" onChange={handleChange} value={searchInput} />
                <button className="submit">Submit</button>
            </form>
            <br></br>
            <Container>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th scope='col'>Rank</th>
                            <th scope='col'>Last Name</th>
                            <th scope='col'>First Name</th>
                            <th scope='col'>MOS</th>
                            <th scope='col'>Phone Number</th>
                            <th scope='col'>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                    {renderHelper()}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}