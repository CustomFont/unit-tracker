import React, { useEffect, useState } from "react"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'

export default function AlertRoster () {
    const [list, setList] = useState([])
    useEffect(() => {
        fetch ('http://localhost:8080/users') 
            .then((res) => res.json())
            .then(data => setList(data))
        }, [])
        console.log(list)
        
    return (
        <div className="alert-container">
            <h1>Alert Roster</h1>
            <Container>
                {list.map(data => {
                    return (
                        <Row>
                            <h4 key={data.DODID}>
                                <Col>
                                    {data.rank} {data.last_name} {data.first_name} {data.phone_number}
                                </Col>
                            </h4>
                        </Row>
                    )
                })}
            </Container>
        </div>
    )
}