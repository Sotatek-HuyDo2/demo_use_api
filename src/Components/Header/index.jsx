import React from 'react'
import './header.scss'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { useLocation, NavLink } from 'react-router-dom'

const Header = (props) => {
    // const location = useLocation();
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link>
                                <NavLink to="/" className='nav-link'>Home</NavLink>
                            </Nav.Link>
                            <Nav.Link >
                                <NavLink to='/users' className='nav-link'>Managers User</NavLink>
                            </Nav.Link>

                        </Nav>
                        <Nav>
                            <NavDropdown title="Đăng Nhập đi bà" className='nav-link' id="basic-nav-dropdown">
                                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                                <NavDropdown.Item href="/logout">Logout </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header
