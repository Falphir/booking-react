import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link, Navigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo/logo_simples.png'

function UseWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}


function Navbar() {

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [dashboardLink, setDashboardButton] = useState();
  const [dashboardeditorLink, setDashboardEditorButton] = useState();
  const [signUpLink, setSignUpButton] = useState();
  const [signInLink, setSignInButton] = useState();
  const [signOutLink, setSignOutButton] = useState();
  const [MobilesignUpLink, setMobileSignUpButton] = useState();
  const [MobilesignInLink, setMobileSignInButton] = useState();
  const [MobilesignOutLink, setMobileSignOutButton] = useState();
  const [reservesLink, setReservesButton] = useState();
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [userLogged, setUserLogged] = useState();

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
        setUserLogged(response.auth);
        console.log("stuff: " + response.auth);
        console.log("scopes: " + response.decoded);

        function showButtons() {
          if (window.innerWidth <= 960) {
            setSignInButton(false);
            setSignUpButton(false);
            setSignOutButton(false);
            if (response.auth) {
              setMobileSignInButton(false);
              setMobileSignUpButton(false);
              setMobileSignOutButton(true);
            } else {
              setMobileSignInButton(true);
              setMobileSignUpButton(true);
              setMobileSignOutButton(false);
            }
          } else {
            if (response.auth) {
              setSignInButton(false);
              setSignUpButton(false);
              setSignOutButton(true);
            } else {
              setSignInButton(true);
              setSignUpButton(true);
              setSignOutButton(false);
            }
          }
        }
        window.addEventListener('resize', showButtons);

        if (response.decoded == 'undefined') {

          setDashboardButton(false);
          setDashboardEditorButton(false);
          setReservesButton(false);
          showButtons();
          console.log("guest");


        } else if (response.decoded == 'read-own-reserves,create-reserve,detail-reserve') {

          setDashboardButton(false);
          setDashboardEditorButton(false);
          setReservesButton(true);
          showButtons();
          console.log("user");


        } else if (response.decoded == 'create-reserve,detail-reserve,verify-logged-in,update-reserve,read-reserves,delete-reserve,create-room,update-room,read-reserve-client,delete-room,read-users' ||
          response.decoded == 'read-users, update-reserve, read-reserves, delete-reserve, create-room, update-room, read-reserve-client, delete-room, create-reserve, detail-reserve' ||
          response.decoded == 'read-users,update-reserve,read-reserves,delete-reserve,create-room,update-room,read-reserve-client,delete-room,create-reserve,detail-reserve') {

          setDashboardButton(true);
          setDashboardEditorButton(false);
          setReservesButton(false);
          showButtons();
          console.log("admin");


        } else if (response.decoded == 'update-reserve,read-reserves,delete-reserve,create-room,update-room,read-reserve-client,delete-room,create-reserve,detail-reserve') {

          setDashboardButton(false);
          setDashboardEditorButton(true);
          setReservesButton(false);
          showButtons();
          console.log("editor");


        } else {
          
          setDashboardButton(false);
          setDashboardEditorButton(false);
          setReservesButton(false);
          showButtons();
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
            {/* <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li> */}

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
            {dashboardeditorLink &&
              <li className='nav-item'>
                <Link to='/dashboardeditor'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
              </li>}
            {MobilesignUpLink &&
              <li>
                <Link
                  to='/register'
                  className='nav-links-mobile'
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </li>
            }
            {MobilesignInLink &&
              <li>
                <Link
                  to='/login'
                  className='nav-links-mobile'
                  onClick={closeMobileMenu}
                >
                  Sign In
                </Link>
              </li>
            }
            {MobilesignOutLink &&
              <li >
                <Link
                  to='/'
                  className='nav-links-mobile'
                  onClick={closeMobileMenu, onClickLogout}
                >
                  Sign Out
                </Link>
              </li>
            }
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