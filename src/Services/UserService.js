// import axios from "axios";
import axios from "./axiosCustom"


const fetchAllUser = () => {
    return (
        axios.get('/api/users?page=2')
    )
}
export { fetchAllUser }