// Imports
import { useState } from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { Redirect } from 'react-router-dom'
import Profile from './Profile'
import Select from 'react-select'
import 'bootstrap/dist/css/bootstrap.min.css'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import '../App.css'
import { useEffect } from 'react'

// Button Styling
const JobB = styled.input `
    height: 38px;
    width: 150px;
    background: #1B6625;
    color: #ffffff;
    font-family: Poppins;
    font-size: 18px;
    font-weight: 900;
    border-radius: 10px;
    margin-bottom: 40px;
    border: 0;
`

export default function Results(props) {
    const [jobs, getJobs] = useState('')

    useEffect(async () => {
        fetch('/results')
        if(res.ok) {
            const response = await axios.get(`https://xivapi.com/character/${charId}`)
            getJobs(response.Character.ClassJobs)
        }
    })
    return(
        <div className="secondborder">
            <div className="borderedpicture4">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <Select options={ allJ.unlockedState.Name}/>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>    
    )
}
