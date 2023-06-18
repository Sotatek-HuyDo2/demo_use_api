import React from 'react'
import Header from '../../Components/Header'
import ListUser from '../../Components/TableUser'
import { Container } from 'react-bootstrap'
const HomePage = () => {
    return (
        <div>
            <Header />
            <Container>
                <ListUser />
            </Container>
        </div>
    )
}

export default HomePage
