import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

const ModalAddNew = (props) => {
    const { show, handleClose } = props;
    const [name, setName] = useState('');
    const [job, setJob] = useState('')

    const handlCreateUser = () => {
        console.log(name, job);
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ADD NEW USER</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add">
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder='Enter Name Now'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Job</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder='Enter Job here'
                                value={job}
                                onChange={(e) => setJob(e.target.value)}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handlCreateUser}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalAddNew
