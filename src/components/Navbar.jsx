import { Link } from 'react-router-dom'
import NavbarB from 'react-bootstrap/Navbar'
import { Nav, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'

export default function Navbar(props) {
    // if the user is logged in
    const loggedIn = (
        <>
            {/* If the user is logged in */}
            <Link to="/profile" style={{
                textDecoration: "none",
                color: "black",
                padding: "0px 15px"
            }}>
                Profile
            </Link>

            <Link to="/" style={{
                textDecoration: "none",
                color: "black",
                padding: "0px 15px"
            }}>
                <span onClick={props.handleLogout}>Logout</span>
            </Link>
        </>
    )

    // if the user is logged out
    const loggedOut = (
        <>
            <Link to="/login" style={{
                textDecoration: "none",
                color: "black",
                padding: "0px 15px"
            }}>
                Login
            </Link>

            <Link to="/register" style={{
                textDecoration: "none",
                color: "black",
                padding: "0px 15px"
            }}>
                Register
            </Link>
        </>
    )
    return(
        <NavbarB collapseOnSelect expand="lg" variant="dark" style={{backgroundColor:"#939694"}}>
            <Container>
                <NavbarB.Toggle aria-controls="responsive-navbar-nav" />
                <NavbarB.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link eventKey={2}>
                            {props.currentUser ? loggedIn : loggedOut}
                        </Nav.Link>
                    </Nav>
                </NavbarB.Collapse>
            </Container>
        </NavbarB>
    )    
}
