import React from 'react'
import '../../App.css'
import LoginForm from '../../login/LoginForm'
import Navbar from '../Navbar'

function Login() {
    return (
        <>
            <div className='login-banner-container'>
                <div className='loginForm'>
                    <LoginForm />
                </div>
                
            </div>
        </>
    )
}

export default Login