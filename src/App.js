// Imports
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'
import './App.css'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register' 
import Profile from './components/Profile'
import Welcome from './components/Welcome'
import CharSearch from './components/CharSearch' 

// import Char from './components/Char' 
// import Job from './components/JobData'
// import Note from './components/Note'
// import GenNote from './components/GenNote'

export default function App() {
  // State holds user data if the user is logged in
  const [currentUser, setCurrentUser] = useState(null)

  // If user navigates away automatically log them in (if the jwt is valid)
  useEffect(() => {
    // Get the token from local storage
    const token = localStorage.getItem('jwtToken')

    // Check for token
    if(token) {
      setCurrentUser(jwt.decode(token))
    } else {
      // Else set user in state to be null
      setCurrentUser(null)
    }
  }, [])

  // Function to log the user out
  const handleLogout = () => {
    // Delete the jwt that's in local storage
    if(localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken')

      // Set the user in state to be null
      setCurrentUser(null)
    }
  }

  return (
    <Router>

      <header>
        <Navbar
          currentUser={ currentUser }
          handleLogout={ handleLogout }
        />
      </header>

      <div className="App">
        <Switch>

          <Route
            exact path="/"
            component={ Welcome }
          />

          <Route
            exact path="/register"
            render={ props => <Register {...props} currentUser={ currentUser } setCurrentUser={ setCurrentUser } /> }
          />

          <Route
            exact path="/login"
            render={ props => <Login {...props} currentUser={ currentUser } setCurrentUser={ setCurrentUser } /> }
          />

          {/* conditionally render a redirect for auth locked routes */}
          <Route
            exact path="/profile"
            render={ props => currentUser ? <Profile {...props} currentUser={ currentUser } handleLogout={ handleLogout }/> : <Redirect to="/login" />}
          />

          <Route
            exact path="/chars/charsearch"
            render={ props => <CharSearch {...props} currentUser={ currentUser } handleLogout={ handleLogout }/>}
          />  

        </Switch>
      </div>

      <span style={{height: "125px", width: "100px", display: "block"}}></span>
    </Router>
  )
}
