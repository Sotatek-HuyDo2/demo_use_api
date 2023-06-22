import React from 'react'
import Header from '../../Components/Header'

import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../../Context';
import { useEffect } from 'react';
import AppRoutes from '../../Routes/App';


const HomePage = () => {
    const { user, loginContext } = useContext(UserContext)
    console.log('>>> user', user);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            loginContext(localStorage.getItem('email'), localStorage.getItem('token'))
        }
    }, [])
    return (
        <>
            <div>
                <Header />
                <Container>
                    <AppRoutes />
                </Container>
            </div>
            <ToastContainer />
        </>

    )
}

export default HomePage
