import React from 'react'
import Header from '../../Components/Header'

import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import AppRoutes from '../../Routes/App';
import { useDispatch, useSelector } from 'react-redux';
import { handleRefresh } from '../../Redux/reducers/userSlice';


const HomePage = () => {

    const dataRedux = useSelector(state => state.user)
    //state như là rootReducer -> trỏ vào user(reducer) -> trỏ đến phần tử bên trong init_value là account của redducer  
     console.log('>>> data User Redux', dataRedux);

    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(handleRefresh())
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
