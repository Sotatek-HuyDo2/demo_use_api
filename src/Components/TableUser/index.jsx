import React, { useEffect, useState } from 'react'
import { fetchAllUser } from '../../Services/UserService'
import { Button, Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import ModalAddNew from '../Modal/AddNew';
import ModalEditUser from '../Modal/EditUser';
import _, { debounce } from 'lodash'
import Confirm from '../Modal/Confirm';

//css
import './table.scss'
import { CSVDownload, CSVLink } from 'react-csv';

const ListUser = ({ props, itemsPerPage }) => {

  const [listUser, setListUser] = useState([]);

  const [totalUsers, setTotalUser] = useState(0);
  const [totalPages, setTotalPage] = useState(0);

  const [show, setShow] = useState(false);

  const [showEditUser, setShowEditUser] = useState(false)
  const [dataUser, setDataUser] = useState({})

  const [showDeleteUser, setShowDeleteUser] = useState(false)

  const [sortBy, setSortBy] = useState('asc')
  const [sortField, setSortField] = useState('id')

  const [textSearch, setSearchText] = useState('')

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
    setShowDeleteUser(false)
  }
  const handleShow = () => setShow(true);

  const handleShowEdit = (user) => {
    setDataUser(user);
    setShowEditUser(true)
  }

  const HandleEditFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUser)
    let index = listUser.findIndex(item => item.id === user.id)
    cloneListUser[index].first_name = user.first_name
    setListUser(cloneListUser)
  }

  const handleShowDeleteUser = (user) => {
    setShowDeleteUser(true);
    setDataUser(user)
  }

  const handleDeleteFromModal = (uID) => {
    let cloneListUser = _.cloneDeep(listUser)
    cloneListUser = cloneListUser.filter((user) => user.id !== uID)
    setListUser(cloneListUser);
  }
  //Table data
  const updateTableUser = (user) => {
    setListUser([user, ...listUser]);
  }

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy)
    setSortField(sortField)
    let cloneListUser = _.cloneDeep(listUser)
    cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
    // console.log(cloneListUser);
    setListUser(cloneListUser)
  }

  const handleSearch = debounce((e) => {
    const { value } = e.target;
    console.log(value);
    if (value) {
      let cloneListUser = _.cloneDeep(listUser);
      cloneListUser = listUser.filter((user) => user.email.includes(value))
      setListUser(cloneListUser)
    } else {
      getUser()
    }
  }, 1000)

  // console.log(sortBy, sortField);

  const csvData = listUser
  return (
    <>
      <div className="my-2 flex d-flex align-items-center justify-content-between add-new ">
        <div className="add-new-title text-uppercase fw-bold fs-3">List User</div>
        <div className="action d-flex gap-2">
          <input type="search" className='rounded-2 border px-2' placeholder='Search here...' onChange={(e) => handleSearch(e)} />

          <label htmlFor="test" className='btn btn-warning'>
            <i class="fa-solid fa-file-import mx-1"></i>
            Import
          </label>
          <input type="file" className='d-none' id='test' />


          <input type="file" className='d-none' id='import' />
          <CSVLink
            data={csvData}
            filename={"my-file.csv"}
            className="btn btn-primary"
            target="_blank"
          >
            <i class="fa-solid fa-file-arrow-down mx-1"></i>
            Download
          </CSVLink>
          <Button variant="success" onClick={handleShow}>
            <i className="mx-1 fa-solid fa-circle-plus"></i>
            Add New
          </Button>
        </div>

      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <span className='mx-1 sort'>ID</span>
              <i
                className="icon-down fa-solid fa-arrow-down-long"
                onClick={() => handleSort('asc', 'id')}
              ></i>
              <i
                className="icon-up fa-solid fa-arrow-up-long"
                onClick={() => handleSort('desc', 'id')}
              ></i>
            </th>
            <th>Email</th>
            <th>
              <span className='mx-1'>First Name</span>
              <i
                className="icon-down fa-solid fa-arrow-down-long"
                onClick={() => handleSort('asc', 'first_name')}
              ></i>
              <i
                className="icon-up fa-solid fa-arrow-up-long"
                onClick={() => handleSort('desc', 'first_name')}
              ></i>
            </th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.map((user, index) => {
              return (

                <tr key={index}>
                  <td>
                    {user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>
                    <button
                      className='btn btn-warning mx-2'
                      onClick={() => { handleShowEdit(user) }}
                    >EDIT</button>
                    <button className='btn btn-danger' onClick={() => handleShowDeleteUser(user)} >DELETE</button>

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
        dataUserEdit={dataUser}
        HandleEditFromModal={HandleEditFromModal}
      />
      <Confirm
        show={showDeleteUser}
        handleClose={handleClose}
        dataUserDelete={dataUser}
        handleDeleteFromModal={handleDeleteFromModal}
      />
    </>
  )
}

export default ListUser
