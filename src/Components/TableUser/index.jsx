import React, { useEffect, useState } from 'react'
import { fetchAllUser } from '../../Services/UserService'
import { Button, Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import ModalAddNew from '../Modal/AddNew';
import ModalEditUser from '../Modal/EditUser';
import _ from 'lodash'

const ListUser = ({ props, itemsPerPage }) => {
  const [listUser, setListUser] = useState([]);
  const [totalUsers, setTotalUser] = useState(0);
  const [totalPages, setTotalPage] = useState(0);
  const [show, setShow] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false)
  const [dataUserEdit, setDataUserEdit] = useState({})
  useEffect(() => {
    //callAPI
    getUser();
  }, [])

  //PAGIN
  const getUser = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {//check tồn tại
      setListUser(res.data);
      setTotalUser(res.total);
      setTotalPage(res.total_pages)
      console.log(res);
    }
    // console.log("check", res);>>
  }

  const handlePageClick = (event) => {
    getUser(+event.selected + 1)
  };


  //MODAL
  const handleClose = () => {
    setShow(false)
    setShowEditUser(false)
  }
  const handleShow = () => setShow(true);

  const handleShowEdit = (user) => {
    setDataUserEdit(user);
    setShowEditUser(true)
  }

  //Table data
  const updateTableUser = (user) => {
    setListUser([user, ...listUser]);
  }

  const HandleEditFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUser)
    let index = listUser.findIndex(item => item.id === user.id)
    cloneListUser[index].first_name = user.first_name
    setListUser(cloneListUser)
  }

  return (
    <>
      <div className="my-2 flex d-flex align-items-center justify-content-between a add-new ">
        <div className="add-new-title text-uppercase fw-bold fs-3">List User</div>
        <Button variant="primary" onClick={handleShow}>Add New</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.map((user, index) => {
              return (

                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>
                    <button
                      className='btn btn-warning mx-2'
                      onClick={() => { handleShowEdit(user) }}
                    >EDIT</button>
                    <button className='btn btn-danger'>DELETE</button>

                  </td>
                </tr>
              )

            })
          }
        </tbody>
      </Table>

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}

        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNew
        show={show}
        handleClose={handleClose}
        updateTableUser={updateTableUser}
      />
      <ModalEditUser
        handleClose={handleClose}
        show={showEditUser}
        dataUserEdit={dataUserEdit}
        HandleEditFromModal={HandleEditFromModal}
      />
    </>
  )
}

export default ListUser
