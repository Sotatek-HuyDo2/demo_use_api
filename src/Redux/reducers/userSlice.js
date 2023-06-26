import { createSlice } from '@reduxjs/toolkit';
import { loginApi } from "../../Services/UserService";
import { toast } from 'react-toastify';

export const handleLoginRedux = (email, password) => {
    return async (dispatch) => {
        dispatch(fetchUserLogin());
        try {
            let res = await loginApi(email, password);
            if (res && res.token) {
                localStorage.setItem('email', email);
                localStorage.setItem('token', res.token);
                dispatch(fetchUserSuccess({ email, token: res.token }));
            } else {
                if (res && res.status === 400) {
                    toast.error(res.data.error);
                }
                dispatch(fetchUserError());
            }
        } catch (error) {
            dispatch(fetchUserError());
        }
    };
};

export const handleLogoutRedux = () => {
    return (dispatch) => {
        dispatch(userLogout())
    }
}

export const handleRefresh = () => {
    return (dispatch) => {
        dispatch(userRefresh())
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        account: {
            email: '',
            auth: null,
            token: '',
        },
        isLoading: false,
        isError: false,
    },
    reducers: {
        fetchUserLogin: (state) => {
            state.isLoading = true;
            state.isError = false;
        },
        fetchUserSuccess: (state, action) => {
            const { email, token } = action.payload;
            state.account = {
                email,
                token,
                auth: true,
            };
            state.isLoading = false;
            state.isError = false;
        },
        fetchUserError: (state) => {
            state.isLoading = false;
            state.isError = true;
        },
        userLogout: (state) => {
            localStorage.removeItem('email');
            localStorage.removeItem('token');
            state.account = {
                email: '',
                auth: false,
                token: '',
            };
        },
        userRefresh: (state) => {
            state.account = {
                email: localStorage.getItem('email'),
                auth: true,
                token: localStorage.getItem('token'),
            };
        },
    }
});

export const {
    fetchUserLogin,
    fetchUserSuccess,
    fetchUserError,
    userLogout,
    userRefresh,
} = userSlice.actions;

export default userSlice;
