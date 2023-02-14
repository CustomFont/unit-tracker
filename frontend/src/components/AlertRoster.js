import React, { useContext } from "react"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import { ListContext } from "../App"

export default function AlertRoster () {
    const alertList = useContext(ListContext)
    return (
        <div className="alert-container">
            <h1>Alert Roster</h1>
            <Container>
                <Row>
                {alertList.map(alert => {
                    return (
                        <h4>{alert.last_name}</h4>
                    )
                })}
                </Row>
            </Container>
        </div>
    )
}