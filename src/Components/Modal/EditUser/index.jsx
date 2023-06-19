import { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { postCreateUser, putUpdateUser } from '../../../Services/UserService';
import { toast } from 'react-toastify';

const ModalEditUser = (props) => {
    const { show, handleClose, dataUserEdit, HandleEditFromModal } = props;
    const [name, setName] = useState('');
    const [job, setJob] = useState('')
    const [uID, setUid] = useState(0)

    const handleEditUser = async () => {
        let res = await putUpdateUser(name, job, uID)
        if (res && res.updatedAt && name !== dataUserEdit.name) {
            HandleEditFromModal({
                first_name: name,
                id: dataUserEdit.id
            })
            toast.success('🦄 Update User Success', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
            handleClose();
        } else {
            toast.error('Nothing to Update', {
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
    }

    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name)
            setUid(dataUserEdit.id)
        }

    }, [dataUserEdit])//call useEffect when click edit button(update dataUserEffect)

    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
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
                    <Button variant="primary" onClick={() => handleEditUser()}>
                        Comfirm
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    )
}

export default ModalEditUser
