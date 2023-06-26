import React from 'react'
import './header.scss'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { handleLogoutRedux } from '../../Redux/reducers/userSlice'
import { useEffect } from 'react'

const Header = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const account = useSelector(state => state.user.account);
    const handleLogout = () => {
        dispatch(handleLogoutRedux());

    }

    //check xem đã logout chưa
    useEffect(() => {
        if (account && account.auth === false && window.location.pathname !== '/login') {
            toast.success('Logout success')
            navigate("/")
        }
    }, [account])
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>

                    <NavLink to="/" className='nav-link fs-4 fw-semibold pb-1 mx-1 text-danger'>
                        React-Bootstrap
                    </NavLink>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {((account && account.auth === true && account.email !== '') || (window.location.pathname === '/')) &&
                            <>
                                <Nav className="me-auto">
                                    <NavLink to="/" className='nav-link'>Home</NavLink>
                                    <NavLink to='/users' className='nav-link'>Managers User</NavLink>
                                </Nav>
                                <Nav>
                                    <NavDropdown title={account && account.auth ? `Welcome ${account.email}` : 'Action'} className='nav-link' id="basic-nav-dropdown">
                                        {account && account.auth === true
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
