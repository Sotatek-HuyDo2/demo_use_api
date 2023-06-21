import React from 'react'
import Home from '../../Components/Home';
import Header from '../../Components/Header'
import ListUser from '../../Components/TableUser'
import Login from '../../Components/Login';


import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from "react-router-dom";

const HomePage = () => {
    return (
        <>
            <div>
                <Header />
                <Container>
                    <Routes >
                        <Route path="/" element={<Home />} />
                        <Route path="/users" element={<ListUser />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </Container>
            </div>
            <ToastContainer />
        </>

    )
}

export default HomePage
