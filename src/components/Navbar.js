import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link, Navigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo/logo_simples.png'

function Navbar() {

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [dashboardLink, setDashboardButton] = useState(true);
  const [signUpLink, setSignUpButton] = useState(true);
  const [signInLink, setSignInButton] = useState(true);
  const [signOutLink, setSignOutButton] = useState(true);
  const [reservesLink, setReservesButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [userLogged, setUserLogged] = useState(true);


  const showButton = () => {
    if (window.innerWidth <= 960) {
      if (login) {

        setButton(false);
        setSignUpButton(false);
        setSignInButton(false);
        setSignOutButton(true);
      }

      setButton(false);
      setSignUpButton(false);
      setSignInButton(false);
      setSignOutButton(true);

    } else {

      if (login) {

        setButton(false);
        setSignUpButton(false);
        setSignInButton(false);
        setSignOutButton(true);

      } else {

        setButton(true);
        setSignUpButton(true);
        setSignInButton(true);
        setSignOutButton(false);
      }
    }
  };

  const role = "admin";
  const login = false;

  const showReservesButton = () => {
    if (login) {
      setReservesButton(true);
    } else {
      setReservesButton(false);
    }
  };

  //Função detetar se tem perm para aceder dashboard
  const showDashboardButton = () => {
    if (role == "admin") {
      setDashboardButton(true);
    } else {
      setDashboardButton(false);
    }
  };

  /*   useEffect(() => {
      showButton();
      showDashboardButton();
      showReservesButton();
    }, []); */

  window.addEventListener('resize', showButton);

  const onClickLogout = () => {
    fetch('/auth/logout', {
      headers: { 'Accept': 'application/json' }
    })

      .then((response) => response.json())

      .then((response) => {
        if (response.logout) {

          setUserLogged(false);
          window.location.reload(false);
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
        //se scope do utilizador for == ao scope q tem permissão pra ver button
        setUserLogged(response.decoded);
        console.log("scopes: " + response.decoded);


        if (response.decoded == 'undefined') {

          setDashboardButton(false);
          setReservesButton(false);
          setSignUpButton(true);
          setSignInButton(true);
          setSignOutButton(false);
          console.log("guest");


        } else if (response.decoded == 'read-own-reserves' || response.decoded == 'create-reserve' || response.decoded == 'detail-reserve'
          //response.decoded == 'read-own-reserves,create-reserve,detail-reserve'
        ) {

          //window.location.reload(false);

          setDashboardButton(false);
          setReservesButton(true);
          setSignUpButton(false);
          setSignInButton(false);
          setSignOutButton(true);
          console.log("user");


        } else if (response.decoded == 'create-reserve,detail-reserve,verify-logged-in,update-reserve,read-reserves,delete-reserve,create-room,update-room,read-reserve-client,delete-room,read-users') {

          setDashboardButton(true);
          setReservesButton(false);
          setSignUpButton(false);
          setSignInButton(false);
          setSignOutButton(true);
          console.log("admin");


        } else if (response.decoded == 'update-reserve,read-reserves,delete-reserve,create-room,update-room,read-reserve-client,delete-room,create-reserve,detail-reserve') {

          setDashboardButton(true);
          setReservesButton(false);
          setSignUpButton(false);
          setSignInButton(false);
          setSignOutButton(true);
          console.log("editor");


        } else {

          setDashboardButton(false);
          setReservesButton(false);
          setSignUpButton(true);
          setSignInButton(true);
          setSignOutButton(false);
          console.log("guest");
        }
      })

      .catch(() => {
        setUserLogged(false);
      })
  }, [])


  if (!userLogged) {
  }


  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <img className='Logo' src={logo} />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>

            <li className='nav-item'>
              <Link to='/roomList'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Rooms
              </Link>
            </li>

            {reservesLink &&
              <li className='nav-item'>
                <Link to='/reserves'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  My Reserves
                </Link>
              </li>}

            {dashboardLink &&
              <li className='nav-item'>
                <Link to='/dashboard'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
              </li>}
            <li hidden={login}>
              <Link
                to='/register'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
            <li hidden={login} >
              <Link
                to='/login'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign In
              </Link>
            </li>
          </ul>


          {signUpLink &&
            <Link to='/register' className='btn-mobile'>
              <Button buttonStyle='btn--gold--outline'>SIGN UP</Button>
            </Link>}


          {signInLink &&
            <Link to='/login' className='btn-mobile'>
              <Button buttonStyle='btn--gold--outline'>SIGN IN</Button>
            </Link>}

          {signOutLink &&
            <div className='btn-mobile'>
              <Button buttonStyle='btn--gold--outline' onClick={onClickLogout}>SIGN OUT</Button>
            </div>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;