import ReserveTable from "./ReserveTable";
import './Reserves.css';
import Config from '../config';
import { useEffect, useState } from "react";
import ReservesForm from "./add/ReservesForm";
import { Navigate } from "react-router-dom";


const Reserves = () => {
    const [loading, setLoading] = useState(true);
    const [reserves, setReserves] = useState([]);

    useEffect(() => {
        fetch('/reserve/reserves', {
            headers: { 'Accept': 'application/json', 'x-access-token': Config.token }
        })

            .then((response) => response.json())

            .then((response) => {
                const { auth, reserves = [] } = response;

                if (auth) {
                    setLoading(false);
                    setReserves(reserves)
                }
            });

        return () => setReserves([]);
    }, [])


    if (!Config.token) {
        return <Navigate to={'/'}></Navigate>
    }

    if (loading) {
        return <h1>LOADING</h1>
    }


    return (
        <div className="reserve-container">
            <ReserveTable></ReserveTable>
        </div>
    )

}

export default Reserves;