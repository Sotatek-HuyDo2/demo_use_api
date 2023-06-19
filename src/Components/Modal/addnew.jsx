import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { postCreateUser } from '../../Services/UserService';
import { toast } from 'react-toastify';

const ModalAddNew = (props) => {
    const { show, handleClose, updateTableUser } = props;
    const [name, setName] = useState('');
    const [job, setJob] = useState('')

    const handlCreateUser = async () => {
        if (name && job) {
            let res = await postCreateUser(name, job)
            console.log(res);
            if (res && res.id) {
                //success
                handleClose();
                toast.success('🦄 Create Success', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                updateTableUser({ first_name: name, id: res.id })
            }
        } else {
            //error
            toast.error('Please Check Input', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        setName('');
        setJob('');

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
