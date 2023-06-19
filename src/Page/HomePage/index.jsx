import React from 'react'
import Header from '../../Components/Header'
import ListUser from '../../Components/TableUser'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';

const HomePage = () => {
    return (
        <>
            <div>
                <Header />
                <Container>
                    <ListUser />
                </Container>
            </div>
            <ToastContainer />
        </>

    )
}

export default HomePage
