import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo/logo_simples.png'

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(false);
  const [dashboardLink, setDashboardButton] = useState(true);
  const [reservesLink, setReservesButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      if (login) {
        setButton(false);
      }
      setButton(false);
    } else {
      if (login) {
        setButton(false);
      } else {
        setButton(true);
      }

    }
  };

  const role = "admin";
  const login = true;

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

  useEffect(() => {
    showButton();
    showDashboardButton();
    showReservesButton();
  }, []);

  window.addEventListener('resize', showButton);

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
                to='/sign-up'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
            <li hidden={login}>
              <Link
                to='/sign-in'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign In
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--gold--outline'>SIGN UP</Button>}
          {button && <Button buttonStyle='btn--gold--outline'>SIGN IN</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;