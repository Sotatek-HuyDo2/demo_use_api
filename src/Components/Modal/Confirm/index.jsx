import { Button, Modal } from 'react-bootstrap'
import { deleteUser } from '../../../Services/UserService';
import { toast } from 'react-toastify';

const Confirm = (props) => {
    const { show, handleClose, dataUserDelete, handleDeleteFromModal } = props;


    const confirmDelete = async () => {
        let res = await deleteUser(dataUserDelete.id)
        if (res && +res.statusCode === 204) {
            handleDeleteFromModal(dataUserDelete.id)
            toast.success('Delete Success')
            handleClose();
        } else {
            toast.error('Delete Error')
        }

    }


    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-del">
                        <div className="body-del-title">
                            This action can't be undone!, Are u sure delete this user?
                            <br />
                            <strong>email = {dataUserDelete.email}</strong>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={confirmDelete}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    )
}

export default Confirm
