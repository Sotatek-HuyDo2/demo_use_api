import { toast } from "react-toastify";
import { loginApi } from "../../Services/UserService";

export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN'
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const USER_REFRESH = 'USER_REFRESH'
export const USER_LOGOUT = 'USER_LOGOUT'

export const handleLoginRedux = (email, password) => {
    return async (dispatch, getState) => {
        dispatch({ type: FETCH_USER_LOGIN })
        let res = await loginApi(email, password);
        if (res && res.token) {//login success
            localStorage.setItem('email', email);
            localStorage.setItem('token', res.token);

            dispatch({
                type: FETCH_USER_SUCCESS,
                data: { email: email, token: res.token }
            })
        } else {
            if (res && res.status === 400) {
                toast.error(res.data.error)
            }
            dispatch({ type: FETCH_USER_ERROR })

        }
    }

}

export const handleLogoutRedux = () => {
    return (dispatch, getState) => {
        dispatch({ type: USER_LOGOUT })
    }
}

export const handleRefresh = () => {
    return (dispatch, getState) => {
        dispatch({
            type: USER_REFRESH,
        })
    }
}