import './LoginForm.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

const LoginForm = () => {

    const { register, handleSubmit } = useForm();
    const [loginSuccess, setLoginSuccess] = useState(false);
    const onSubmit = data => login(data);

    const login = (data) => {
        fetch('/auth/admin/login', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(data)
        })

            .then(r => r.json())

            .then((response) => {
                console.log(response);

                if (response.auth) {
                    window.location.href = '/'
                    setLoginSuccess(true);

                } else {
                    alert('login errado');
                }
            })

            .catch((err) => {
                console.error('error: ', err);
            });
    }


    // if (loginSuccess) { 
    //     return <Navigate to='/' />
    // }


    return (
        <div className='loginForm'>
            <h2>Login Form</h2>

            <form className='form-login' onSubmit={handleSubmit(onSubmit)}>
                <div className='field'>
                    <label>Name: </label>
                    <input {...register('name')}></input>
                </div>

                <div className='field'>
                    <label>Password: </label>
                    <input {...register('password')} type='password'></input>
                </div>

                <input className='submit' type='submit'></input>
            </form>
        </div>
    )
}

export default LoginForm;