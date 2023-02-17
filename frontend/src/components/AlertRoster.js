import React, { useEffect, useState } from "react"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'

export default function AlertRoster () {
    const [list, setList] = useState([])
    useEffect(() => {
        fetch('http://localhost:8080/users', { credentials: 'include' }) 
            .then((res) => res.json())
            .then(data => setList(data))
        }, [])

    return (
        <div className="alert-container">
            <h1>Alert Roster</h1>
            <Container>
                {list.map(data => {
                    return (
                        <Row key={data.DODID}>
                            <Col>{data.rank}</Col>
                            <Col>{data.last_name}</Col>
                            <Col>{data.first_name}</Col>
                            <Col>{data.phone_number}</Col>
                        </Row>
                    )
                })}
            </Container>
        </div>
    )
}