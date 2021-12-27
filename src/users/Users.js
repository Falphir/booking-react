import User from './UserTable';
import './Users.css';
import Config from '../config';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import UserTable from './UserTable';



const Users = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    //se n tiver configurado o token no config.js, irá diretamente redirecionar para a homepage
    if (!Config.token) {
        return <Navigate to={'/'}></Navigate>
    }


    return (
        <div className='user-container'>
            <UserTable></UserTable>
        </div>
    )
}

export default Users;