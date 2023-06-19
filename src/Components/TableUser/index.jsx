import React, { useEffect, useState } from 'react'
import { fetchAllUser } from '../../Services/UserService'
import { Button, Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import ModalAddNew from '../Modal/addnew';

const ListUser = ({ props, itemsPerPage }) => {
  const [listUser, setListUser] = useState([]);
  const [totalUsers, setTotalUser] = useState(0);
  const [totalPages, setTotalPage] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    //callAPI
    getUser();
  }, [])

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

  const handeClose = () => setShow(false)
  const handleShow = () => setShow(true);

  const updateTableUser = (user) => {
    setListUser([user, ...listUser]);
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
                </tr>
              )

            })
          }
        </tbody>
      </Table>
      <ModalAddNew
        show={show}
        handleClose={handeClose}
        updateTableUser={updateTableUser}
      />
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
    </>
  )
}

export default ListUser
