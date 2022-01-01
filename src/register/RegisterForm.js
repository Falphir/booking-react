import './RegisterForm.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

const RegisterForm = () => {

    const { register, handleSubmit } = useForm();
    const onSubmit = data => postUser(buildUsers(data));

    const postUser = (data) => {
        fetch('/auth/user/register', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(data)
        })

            .then((response) => {
                if (response.ok) {
                    console.log(response);
                    alert("User created");
                    return response.json();

                } else {
                    console.log(response);
                    alert("User duplicate");
                }
            })

            .catch((err) => {
                console.error('error:', err);
            });
    }


    const buildUsers = (data) => {
        return {
            ...data, role: {

                name: data.nameRole,
                scopes: ["read-own-reserves"]
            }
        }
    };


    return (
        <div className='registerForm'>
            <h2>Register Form</h2>

            <form className='form-register' onSubmit={handleSubmit(onSubmit)}>
                <div className='field'>
                    <label>Name: </label>
                    <input {...register('name')}></input>
                </div>

                <div className='field'>
                    <label>Email: </label>
                    <input {...register('email')}></input>
                </div>

                <div className='field'>
                    <label>Password: </label>
                    <input {...register('password')} type='password'></input>
                </div>

                <div className='field'>
                    <label>Role: </label>
                    <select {...register('nameRole')}>
                        <option value="user">User</option>
                    </select>
                </div>

                <div className='field'>
                    <label>Permission: </label>
                    <select {...register('scopes')}>
                        <option value="read-own-reserves">Read Own Reserves</option>
                    </select>
                </div>


                <input className='submit' type='submit'></input>
            </form>
        </div>
    )
}

export default RegisterForm;