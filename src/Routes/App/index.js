import { Route, Routes } from 'react-router-dom'

import React from 'react'
import Home from '../../Components/Home'
import ListUser from '../../Components/TableUser'
import Login from '../../Components/Login'
import PrivateRoutes from '../Private'

const AppRoutes = () => {
    return (
        <>
            <Routes >
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path='/users'
                    element={
                        <PrivateRoutes >
                            <ListUser />
                        </PrivateRoutes>
                    }
                />
            </Routes>


        </>
    )
}

export default AppRoutes
