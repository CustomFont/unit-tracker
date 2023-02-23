import React, { useEffect, useState } from "react"
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import LogoutButton from './LogoutButton'
import { useNavigate } from "react-router"
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/esm/Button"

export default function LeadersPortal () {
    const [list, setList] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [regKey, setRegKey] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:8080/leadersportal', { credentials: 'include' }) 
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
    
    useEffect(() => {
        fetch('http://localhost:8080/units', { credentials: 'include' })
            .then((res) => res.json())
            .then(data => setRegKey(data[0].registration_key))
    }, [])

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

    const handleDelete = (e) => {
        e.preventDefault();
        const confirmBox = window.confirm(
            "Do you really want to delete this Soldier?"
            )
            if (confirmBox === true) {
                fetch(`http://localhost:8080/${e.target.id}`, { credentials: 'include', method: 'DELETE' })
                setList(list.filter(item => item.DODID !== parseInt(e.target.id)))
            } else {
                return;
            }
    }
    
    const renderHelper = () => {
        if(searchInput === '') {
            return list.map(data => {
                return (
                    <tr key={data.DODID}>
                        <td>{data.DODID}</td>
                        <td>{data.rank}</td>
                        <td><Link to={`/update/${data.DODID}`}>{data.last_name}</Link></td>
                        <td>{data.first_name}</td>
                        <td>{data.mos}</td>
                        <td>{data.phone_number.toString().replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}</td>
                        <td>{data.address}</td>
                        <td><img src='https://static.thenounproject.com/png/3058-200.png' alt='trash' id={data.DODID} width={25} height={25} onClick={handleDelete}/></td>
                    </tr>
                )
            })
        }
        if(searchInput !== '') {
            return searchResults.map(data => {
                return (
                        <tr key={data.DODID}>
                            <td>{data.DODID}</td>
                            <td>{data.rank}</td>
                            <td><Link to={`/update/${data.DODID}`}>{data.last_name}</Link></td>
                            <td>{data.first_name}</td>
                            <td>{data.mos}</td>
                            <td>{data.phone_number.toString().replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}</td>
                            <td>{data.address}</td>
                            <td><img src='https://static.thenounproject.com/png/3058-200.png' alt='trash' id={data.DODID} width={25} height={25} onClick={handleDelete}/></td>
                        </tr>
                )
            })
        }
    }
    
    return (
        <div className="alert-container">
            <h1>Leader's Portal</h1>
            <LogoutButton />
            <Button variant="dark" onClick={() => {navigate('/alertroster')}}>Alert Roster</Button>
            <br></br>
            <p>{(`Your unit's registration key is ${regKey}.`)}</p>
            <form onSubmit={onSubmit}>
                <input type='text' placeholder="Search" onChange={handleChange} value={searchInput} />
                <button className="submit">Submit</button>
            </form>
            <br></br>
            <Container>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th scope='col'>DODID</th>
                            <th scope='col'>Rank</th>
                            <th scope='col'>Last Name</th>
                            <th scope='col'>First Name</th>
                            <th scope='col'>MOS</th>
                            <th scope='col'>Phone Number</th>
                            <th scope='col'>Address</th>
                            <th scope='col'>Delete Record</th>
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