import React from 'react'
import './login.scss'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchUserSuccess, handleLoginRedux } from '../../Redux/reducers/userSlice'
import { loginApi } from '../../Services/UserService'

const Login = () => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const dispatch = useDispatch();

    // const isLoading = useSelector(state => state.user.isLoading);
    const account = useSelector(state => state.user.account)

    useEffect(() => {
        if (account && account.auth === true) {
            navigate('/')
            toast.success(`Welcome  ${account.email}`)
        }
    }, [account])

    // const handleLogin = async () => {

    //     if (!email && !password) {
    //         toast.error('Missing Email/Password');
    //         return;
    //     }
    //     dispatch(handleLoginRedux({
    //         email: email,
    //         password: password
    //     }));
    // }

    const handleLogin = async () => {
        setIsLoading(true);
        if (!email && !password) {
            toast.error('Missing Email/Password');
            return;
        }
        let res = await loginApi(email, password);
        if (res && res.token) {
            localStorage.setItem('email', email);
            localStorage.setItem('token', res.token);
            navigate('/')
            dispatch(fetchUserSuccess({ email: email, token: res.token }))
        } else {
            toast.error('Wrong Email/Password');
        }
        setIsLoading(false)
    }

    const handleGoBack = () => {
        navigate('/')
    }

    const handlePress = (event) => {
        if (event.code === 'Enter') {
            handleLogin();
        }
    }
    return (
        <div className='login-container'>
            <div className="login-header">
                <div className="login-header-title">LOGIN</div>
            </div>
            <div className="login-body">
                <div className="login-body-text">Email or Username ( eve.holt@reqres.in )</div>
                <input
                    type="text"
                    className="login-body-input"
                    placeholder='Enter UserName or Email'
                    value={email}
                    onChange={(event) => setEmail(event.target.value.trim())}
                />
                <input
                    type="password"
                    className="login-body-input"
                    placeholder='Enter Password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onKeyDown={(event) => handlePress(event)}
                />
                <button
                    className={email && password ? 'active' : ''}
                    disabled={(!email && !password) || isLoading}
                    onClick={() => handleLogin()}
                >
                    {isLoading && <i className="fa-solid fa-sync fa-spin "></i>}
                    <span hidden={isLoading} >Login</span>

                </button>
            </div>
            <div className="login-back">
                <div className="login-back-text" onClick={() => handleGoBack()}>
                    <i className="fa-solid fa-chevron-left"></i>
                    <span>Back</span>
                </div>
            </div>

        </div>
    )
}

export default Login
