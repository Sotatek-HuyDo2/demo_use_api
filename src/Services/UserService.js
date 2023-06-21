// import axios from "axios";
import axios from "./axiosCustom"


const fetchAllUser = (page) => {
    return (
        axios.get(`/api/users?page=${page}`)
    )
}

const postCreateUser = (name, job) => {
    return axios.post('/api/users', { name: name, job: job })
}

const putUpdateUser = (name, job, id) => {
    return axios.patch(`/api/users/${id}`, { name: name, job: job })
}

const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`)
}

const loginApi = (email, password) => {
    return axios.post('/api/login', { email, password })
}

export { fetchAllUser, postCreateUser, putUpdateUser, deleteUser, loginApi }