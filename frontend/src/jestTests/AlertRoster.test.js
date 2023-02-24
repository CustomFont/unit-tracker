/**
* @jest-environment node
*/
import { getRoles, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import AlertRoster from '../components/AlertRoster';
// import {fetch} from 'node-fetch'
// node-fetch v2 or lower
// react-testing-library w/ jest
beforeAll(async () => {
    await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "DODID": "1928477713", "SSN": "200992888" }),
        withCredentials: true,
        credentials: 'include'
    })
    render(
        <BrowserRouter>
            <AlertRoster />
        </BrowserRouter>
    )
})
afterAll(()=>{
    fetch('http://localhost:8080/logout', { credentials: 'include' })
})

describe("AlertRoster Component", () => {
    test('renders alert roster', () => {
        const pageHeader = screen.getByText(/Alert Roster/i)
        expect(pageHeader).toBeInTheDocument()
    });

    test('renders buttons', () => {
        const buttons = screen.getAllByRole('button')
        expect(buttons.length).toBe(2)
    });

    test('renders soldier entries in the table', () => {
        const rows = screen.getAllByRole('row')
        console.log(rows.length)
    });
})