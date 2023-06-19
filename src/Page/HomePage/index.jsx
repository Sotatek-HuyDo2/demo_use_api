import React, { useState } from 'react'
import Header from '../../Components/Header'
import ListUser from '../../Components/TableUser'
import { Button, Container } from 'react-bootstrap'
import ModalAddNew from '../../Components/Modal/addnew'

const HomePage = () => {
    const [show, setShow] = useState(false);
    const handeClose = () => setShow(false)
    const handleShow = () => setShow(true);
    return (
        <div>
            <Header />
            <Container>
                <div className="my-2 flex d-flex align-items-center justify-content-between a add-new ">
                    <div className="add-new-title text-uppercase fw-bold fs-3">List User</div>
                    <Button variant="primary" onClick={handleShow}>Add New</Button>
                </div>

                <ListUser />
            </Container>
            <ModalAddNew
                show={show}
                handleClose={handeClose}
            />
        </div>
    )
}

export default HomePage
