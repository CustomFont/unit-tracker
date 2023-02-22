import React, { useEffect, useState } from "react"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import LogoutButton from './LogoutButton'
import { useNavigate } from "react-router"
import Button from "react-bootstrap/esm/Button"

export default function AlertRoster () {
    const [list, setList] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [leaderPortalButton, setLeaderPortalButton] = useState("")
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

    const isLeaderButtonRender = () => {
        let button = leaderPortalButton;
        if (button === ""){
            fetch('http://localhost:8080/creds', {credentials: "include"})
                .then(res => {
                    if(res.status === 250){
                        setLeaderPortalButton(<Button variant="dark" onClick={() => {navigate('/leadersportal')}}>Leader's Portal</Button>)
                    } else {
                        return
                    }
                })        
        }
        if(button === ""){
            return
        } else{
            return button
        }
    }
    const renderHelper = () => {
        if(searchInput === '') {
            return list.map(data => {
                return (
                    <Row key={data.DODID}>
                        <Col>{data.rank}</Col>
                        <Col>{data.last_name}</Col>
                        <Col>{data.first_name}</Col>
                        <Col>{data.phone_number}</Col>
                    </Row>
                )
            })
        }
        if(searchInput !== '') {
            return searchResults.map(data => {
                return (
                    <Row key={data.DODID}>
                        <Col>{data.rank}</Col>
                        <Col>{data.last_name}</Col>
                        <Col>{data.first_name}</Col>
                        <Col>{data.phone_number}</Col>
                    </Row>
                )
            })
        }
    }

    return (
        <div className="alert-container">
            <h1>Alert Roster</h1>
            <LogoutButton />
            {isLeaderButtonRender()}
            <form onSubmit={onSubmit}>
                <input type='text' placeholder="Search" onChange={handleChange} value={searchInput} />
                <button className="submit">Submit</button>
            </form>
            <Container>
                {renderHelper()}
            </Container>
        </div>
    )
}