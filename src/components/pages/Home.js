import { useState, useEffect } from 'react';
import '../../App.css'
import BannerSection from '../BannerSection'
import RoomsCard from '../Cards/allRooms/Rooms'
import Footer from '../Footer';





function Home() {

    const [userLogged, setUserLogged] = useState();


    useEffect(() => {

        fetch('/auth/me', {
            headers: { 'Accept': 'application/json' }
        })

            .then((response) => response.json())

            .then((response) => {
                setUserLogged(response.auth);
                localStorage.setItem('idUser', response.decoded[1]);
            })

            .catch(() => {
                localStorage.removeItem('idUser');
                setUserLogged(false);
            })
    }, [])

    if (!userLogged) {
        localStorage.removeItem('idUser');
    }

    return (
        <>
            <BannerSection />
            <RoomsCard></RoomsCard>
            <Footer />
        </>
    )
}

export default Home