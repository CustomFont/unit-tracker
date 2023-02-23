import React, { useState, useEffect } from 'react';



export default function Confirm() {

    const [userData, setUserData] = useState([]) 

    const queryString = window.location.href;
    const dod = queryString.substring(queryString.indexOf('?')+31)
    console.log(dod)

    

    return (
        <>
            <h1>Confirm Changes</h1>

        </>
    )
}