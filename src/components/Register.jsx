// Imports
import { useState } from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { Redirect } from 'react-router-dom'
import Profile from './Profile'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import '../App.css'

const Links = styled.li `
    display: inline;
    margin: 0 auto;
    margin-right: 10px;
    font-size:20px;
    &:hover {
        border-bottom: 4px solid #1B6625;
    }
`
const Inputs = styled.input `
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    width: 450px;
    height: 30px;
    margin-top: 30px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid lightgrey;
    padding-left: 5px;
`

const Passwords = styled.input `
    margin: 0 auto;
    margin-right: 5px;
    margin-left: 5px;
    margin-bottom: 20px;
    width: 220px;
    border-radius: 5px;
    border: 1px solid lightgrey;
    padding-left: 5px;
`

const SignupB = styled.input `
    margin-top: 10px;
    width: 150px;
    height: 38px;
    background: #1B6625;
    margin-bottom: 40px;
    color: #ffffff;
    font-family: Poppins;
    font-size: 18px;
    font-weight: 900;
    border-radius: 10px;
    border: 0;
`

export default function Register(props) {
    // State for the controlled form

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // State for flash messages from the server
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            console.log('do axios call')
            // Post to the backend with axios
            const requestBody = {
                name: name,
                email: email,
                password: password
            }

            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`, requestBody)
            
            console.log(response)
            // Destrcuture the response
            const { token } = response.data
            
            // Save the response to localstorage
            localStorage.setItem('jwtToken', token)

            // Decode the jwt token before we put it in state
            const decoded = jwt.decode(token)

            // Set the user in App.js' state
            props.setCurrentUser(decoded)

        } catch (error) {
            if(error.response.status === 400) {
                setMessage(error.response.data.msg)
            } else {
                console.log(error)
            }
        }
    }

    if(props.currentUser) return <Redirect to='/profile' component={ Profile } currentUser={ props.currentUser } />

    return (
        <div className="secondborder">
            <div className="borderedpicture4">
                <ul>
                    <Links>
                        <Link to="/login" style={{textDecoration:"none", color: "black"}}>Sign In</Link>
                    </Links>

                    <Links>
                        |
                    </Links>

                    <Links>
                        <Link to="/register" style={{textDecoration:"none", color: "black"}}>New Account</Link>
                    </Links>
                </ul>

                <p>{message}</p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor={'email-input'}></label>
                    <Inputs
                        id='name-input'
                        type='text'
                        placeholder='Name'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    
                    <Inputs
                        id='email-input'
                        type='email'
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />

                    <Inputs
                        id='password-input'
                        type='password'
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />

                    <Passwords
                        id='password-input'
                        type='password'
                        placeholder='Confirm Password'
                    />

                    <br />

                    <SignupB type='submit' value='Sign Up' />

                    <p>Don't have an account? <strong>Sign up</strong></p>
                </form>
            </div>
        </div>    
    )
}