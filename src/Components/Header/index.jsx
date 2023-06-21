import React from 'react'
import './header.scss'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Header = (props) => {
    // const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.success('Logout success')
        navigate("/")
    }
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/" className='nav-link'>Home</NavLink>
                            <NavLink to='/users' className='nav-link'>Managers User</NavLink>
                        </Nav>
                        <Nav>
                            <NavDropdown title="Đăng Nhập đi bà" className='nav-link' id="basic-nav-dropdown">
                                <NavLink  className='dropdown-item' to="/login">Login</NavLink>
                                <NavDropdown.Item onClick={() => handleLogout()}>Logout </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header
