import { useState, useEffect } from "react"
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Login from './Login'
// import MyChars from './MyChars'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'

export default function Profile(props) {
    // state is information from the server
    const [message, setMessage] = useState('')

    // hit the auth locked route on the backend
    useEffect(() => {
        const getPrivateMessage = async () => {
            try {
                // get the jwt from local storage
                const token = localStorage.getItem('jwtToken')

                // make up the auth headers
                const authHeaders = {
                    Authorization: token
                }

                // hit the auth locked endpoint
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`, { headers: authHeaders })

                // set state with the data from the server
                setMessage(response.data.msg)

            } catch (error) {
                console.log(error)
                // log the user out if an error occurs
                props.handleLogout()
            }
        }

        getPrivateMessage()
    }, [props])

    // redirect if there is no user in state
    if(!props.currentUser) return <Redirect to='/login' component={ Login } currentUser={ props.currentUser } />
    
    console.log(props.currentUser)

    return (
        <div className="secondborder">
            <div className="borderedpicture4">
                <div>
                    <h4>Welcome {props.currentUser.name}!</h4>
                    <p>{message}</p>
                </div>
                {/* <div>
                    <h1 style={{textAlign: "left", margin: "50px 0px 100px", }}><strong>Your Events</strong></h1>
                    <MyChars {...props}/>
                </div> */}
            </div>
        </div>        
    )
}