import React, { useEffect, useState } from 'react'
import { fetchAllUser } from '../../Services/UserService'
import { Button, Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import ModalAddNew from '../Modal/AddNew';
import ModalEditUser from '../Modal/EditUser';
import _, { debounce } from 'lodash'
import Confirm from '../Modal/Confirm';
import { CSVLink } from 'react-csv';
import Papa from 'papaparse'

//css
import './table.scss'
import { toast } from 'react-toastify';

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

  // const [textSearch, setSearchText] = useState('')

  const [dataExport, setDataExport] = useState([])

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
  // console.log(listUser);
  // console.log(sortBy, sortField);

  const getUserExport = (event, done) => {
    let result = [];
    if (listUser && listUser.length > 0) {
      result.push(["id", "email", "first_name", "last_name"])
      listUser.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr)
      })
      setDataExport(result)
      done();
    }
  }

  const handleImportCSV = (event) => {
    let file = event.target.files[0]
    if (event.target && event.target.files && event.target.files[0]) {
      if (file.type !== "text/csv") {
        return toast.error('Import File not type .csv')
      }
    }
    Papa.parse(file, {
      // header: true,
      complete: function (results) {
        // console.log('Finished', results.data);
        let rawCSV = results.data;
        if (rawCSV.length > 0) {
          if (rawCSV[0] && rawCSV[0].length === 4) {
            if (rawCSV[0][0] !== 'id'
              || rawCSV[0][1] !== 'email'
              || rawCSV[0][2] !== 'first_name'
              || rawCSV[0][3] !== 'last_name'
            ) {
              toast.error('Wrong format Header CSV File')
            } else {
              let result = [];
              rawCSV.map((item, index) => {//mảng đa chiều 
                if (index > 0 && item.length === 4) {//bỏ qua header
                  let obj = {};
                  obj.id = item[0]
                  obj.email = item[1]
                  obj.first_name = item[2]
                  obj.last_name = item[3]
                  result.push(obj)
                }
              })
              setListUser(result, ...listUser)
              console.log('>>> check result ', result)
            }
          } else {
            toast.error('Wrong format CSV File')
          }
        } else {
          toast.error('Nothing in your CSV')
        }
      }
    })

    //Parse local CSV file

  }

  return (
    <>
      <div className="my-2 flex d-flex align-items-center justify-content-between add-new ">
        <div className="add-new-title text-uppercase fw-bold fs-3">List User</div>
        <div className="action d-flex gap-2">
          <input
            type="search"
            className='rounded-2 border px-2'
            placeholder='Search here...'
            onChange={(e) => handleSearch(e)}
          />

          <label htmlFor="test" className='btn btn-warning'>
            <i className="fa-solid fa-file-import mx-1"></i>
            Import
          </label>
          <input
            type="file"
            hidden
            id='test'
            onChange={(event) => handleImportCSV(event)}
          />

          <CSVLink
            filename={"users.csv"}
            className="btn btn-primary"
            data={dataExport}
            asyncOnClick={true}
            onClick={getUserExport}
          >
            <i className="fa-solid fa-file-arrow-down mx-1"></i>
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
