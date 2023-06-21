import React from 'react'
import './login.scss'
import { useState } from 'react'

const Login = () => {

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    return (
        <div className='login-container'>
            <div className="login-header">
                <div className="login-header-title">LOGIN</div>
            </div>
            <div className="login-body">
                <div className="login-body-text">Email or Username</div>
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
                    disabled={!email && !password}
                >
                    Login
                </button>
            </div>
            <div className="login-back">
                <div className="login-back-text">
                    <i class="fa-solid fa-chevron-left"></i> Go Back
                </div>
            </div>

        </div>
    )
}

export default Login
