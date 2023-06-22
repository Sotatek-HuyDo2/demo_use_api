import React, { useEffect } from 'react'
import './login.scss'
import { useState } from 'react'
import { loginApi } from '../../Services/UserService'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../Context'

const Login = () => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [showLoadingAPI, setShowLoadingAPI] = useState(false)

    const navigate = useNavigate();

    const { loginContext } = useContext(UserContext)


    // useEffect(() => {
    //     let token = localStorage.getItem("token")
    //     if (token) {
    //         navigate('/')
    //     }
    // }, [])

    const handleLogin = async () => {
        setShowLoadingAPI(true)
        if (!email && !password) {
            toast.error('Missing Email/Password');
            return;
        }
        let res = await loginApi(email, password);
        // console.log(res);
        if (res && res.token) {//login success
            loginContext(email, res.token);
            toast.success('Login Success')
            navigate('/')
        } else {
            if (res && res.status === 400) {
                toast.error(res.data.error)
            }
        }
        setShowLoadingAPI(false)
    }

    const handleGoBack = () => {
        navigate('/')
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
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    type="password"
                    className="login-body-input"
                    placeholder='Enter Password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button
                    className={email && password ? 'active' : ''}
                    disabled={(!email && !password) || showLoadingAPI}
                    onClick={() => handleLogin()}
                >
                    {showLoadingAPI && <i class="fa-solid fa-sync fa-spin "></i>}
                    <span hidden={showLoadingAPI} >Login</span>

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
