import React, { useEffect, useState } from 'react'
import { fetchAllUser } from '../../Services/UserService'
import { Table } from 'react-bootstrap';

const ListUser = (props) => {
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    //callAPI
    getUser();
  }, [])

  const getUser = async () => {
    let res = await fetchAllUser();
    if (res && res.data) {//check tồn tại
      setListUser(res.data);
    }
    // console.log("check", res);
  }


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
    </>
  )
}

export default ListUser
