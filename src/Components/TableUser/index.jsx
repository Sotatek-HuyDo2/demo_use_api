import React, { useEffect, useState } from 'react'
import { fetchAllUser } from '../../Services/UserService'
import { Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

const ListUser = ({ props, itemsPerPage }) => {
  const [listUser, setListUser] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [totalUsers, setTotalUser] = useState(0);
  const [totalPages, setTotalPage] = useState(0);


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


  return (
    <>
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
