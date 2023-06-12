import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { fetchAllUser } from '../../Services/UserService'

const ListUser = (props) => {
  const [listUser, setListuser] = useState([]);

  useEffect(() => {
    getUser();
  }, [])

  const getUser = async () => {
    let res = await fetchAllUser();
    if (res && res.data && res.data.data) {
      setListuser(res.data.data);
    }
    console.log("check", res);
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">email</th>
            <th scope="col">first_name</th>
            <th scope="col">last_name</th>
          </tr>
        </thead>
        <tbody>
          {
            listUser
            && listUser.length > 0
            && listUser.map((user) => {

              return (
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
                  <td>{user.email}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                </tr>
              )
            })

          }

        </tbody>
      </table>
    </>
  )
}

export default ListUser
