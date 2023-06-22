import React from 'react'
import './header.scss'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { UserContext } from '../../Context'
import { useState } from 'react'

const Header = (props) => {

    const navigate = useNavigate();

    const { logout, user } = useContext(UserContext)


    const handleLogout = () => {
        logout();
        toast.success('Logout success')
        navigate("/")
    }
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>

                    <NavLink to="/" className='nav-link fs-4 fw-semibold pb-1 mx-1 text-danger'>
                        React-Bootstrap
                    </NavLink>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {((user && user.auth === true && user.email !== '') || (window.location.pathname === '/')) &&
                            <>
                                <Nav className="me-auto">
                                    <NavLink to="/" className='nav-link'>Home</NavLink>
                                    <NavLink to='/users' className='nav-link'>Managers User</NavLink>
                                </Nav>
                                <Nav>
                                    <NavDropdown title={user && user.auth ? `Welcome ${user.email}` : 'Action'} className='nav-link' id="basic-nav-dropdown">
                                        {user && user.auth === true
                                            ? <NavDropdown.Item onClick={() => handleLogout()}>Logout </NavDropdown.Item>
                                            : <NavLink className='dropdown-item' to="/login">Login</NavLink>
                                        }
                                    </NavDropdown>
                                </Nav>
                            </>

                        }

                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </>
    )
}

export default Header
