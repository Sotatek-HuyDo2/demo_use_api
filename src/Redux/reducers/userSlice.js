import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginApi } from "../../Services/UserService";
import { toast } from 'react-toastify';

export const handleLoginRedux = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(fetchUserLogin());
        try {
            let res = await loginApi(email, password);
            if (res && res.token) {
                localStorage.setItem('email', email);
                localStorage.setItem('token', res.token);
                dispatch(fetchUserSuccess({ email: email, token: res.token }));
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

// export const handleLoginRedux = createAsyncThunk(
//     'user/handleLogin',
//     async (param, { dispatch }) => {
//         const { email, password } = param;
//         dispatch(fetchUserLogin());
//         try {
//             let res = await loginApi(email, password);
//             if (res && res.token) {
//                 localStorage.setItem('email', email);
//                 localStorage.setItem('token', res.token);
//                 dispatch(fetchUserSuccess({ email, token: res.token }))
//             } else {
//                 if (res && res.status === 400) {
//                     toast.error(res.data.error);
//                 }
//                 dispatch(fetchUserError())
//                 throw new Error('Login failed');
//             }
//         } catch (error) {
//             throw new Error('Login failed');
//         }
//     }
// );

// export const handleLoginRedux = createAsyncThunk(
//     'user/handleLogin',
//     async (param) => {
//         const { email, password } = param;
//         console.log('>>> check param: ', param);
//         let res = await loginApi(email, password);
//         try {
//             if (res && res.token) {
//                 localStorage.setItem('email', email);
//                 localStorage.setItem('token', res.token);
//                 return ({ email: email, token: res.token })
//             } else {
//                 if (res && res.status === 400) {
//                     toast.error(res.data.error);
//                 }
//                 throw new Error('Login failed');
//             }
//         } catch (error) {
//             throw new Error('Login failed');
//         }
//     }
// );

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
    },
    reducers: {
        fetchUserLogin: (state) => {
            state.isLoading = true;
        },
        fetchUserSuccess: (state, action) => {
            const { email, token } = action.payload;
            state.account = {
                email,
                token,
                auth: true,
            };
            state.isLoading = false;
        },
        fetchUserError: (state) => {
            state.isLoading = false;
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
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(handleLoginRedux.pending, (state) => {
    //             state.isLoading = true;
    //         })
    //         .addCase(handleLoginRedux.fulfilled, (state, action) => {
    //             console.log('>>> check state: ', state);
    //             state.account.email = action.payload.email;
    //             state.account.token = action.payload.token;
    //             state.account.auth = true;
    //             state.isLoading = false;
    //         })
    //         .addCase(handleLoginRedux.rejected, (state) => {
    //             state.isLoading = false;
    //         })
    // },

});

export const {
    fetchUserLogin,
    fetchUserSuccess,
    fetchUserError,
    userLogout,
    userRefresh,
} = userSlice.actions;

export default userSlice.reducer;
