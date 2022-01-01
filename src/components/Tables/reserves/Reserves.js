import ReserveTable from "./ReserveTable";
import './Reserves.css';
import Config from '../../../config';
import { Navigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';



const Reserves = () => {

    /* const [showForm, setShowForm] = useState(false);

    const onClickShowForm = () => {
        setShowForm(!showForm);
    }

    const [userLogged, setUserLogged] = useState(true);

    const onClickLogout = () => {
        fetch('/auth/logout', {
            headers: { 'Accept': 'application/json' }
        })

            .then((response) => response.json())

            .then((response) => {
                if (response.logout) {
                    setUserLogged(false);
                }
            })

            .catch(() => {
                setUserLogged(false);
            })
    }

    useEffect(() => {
        fetch('/auth/me', {
            headers: { 'Accept': 'application/json' }
        })

            .then((response) => response.json())

            .then((response) => {
                setUserLogged(response.auth);
            })

            .catch(() => {
                setUserLogged(false);
            })
    }, []) */


    //esta msg irá aparecer dentro do btn
    /* const showFormMessage = showForm ? 'Hide Form' : 'Show Form';

    if (!userLogged) {
        return <Navigate to={'/'} />
    } */

    return (
        <div className="reserve-container" >
            <ReserveTable></ReserveTable>
        </div >
    )
}

export default Reserves;