/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../../routes/Routes';
import './NavigationBar.css';

const NavigationBar = () => {
  const location = useLocation();
  return (
    <nav className='navbar navbar-expand-lg navbar-dark'>
      <div className='container-fluid'>
        <Link
          className='navbar-brand'
          to={{
            pathname: routes.home,
          }}
        >
          Cryptokit.
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarColor01'
          aria-controls='navbarColor01'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <i className="fa fa-chevron-circle-down fa-2x menu-icon"></i>
        </button>

        <div className='collapse navbar-collapse' id='navbarColor01'>
          <ul className='navbar-nav mx-auto'>
            <li className='nav-item'>
              <Link
                className={`nav-link ${
                  location.pathname === routes.home ||
                  location.pathname === routes.cryptoList
                    ? 'active'
                    : ''
                }`}
                to={{
                  pathname: routes.cryptoList,
                }}
              >
                MARKET
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={`nav-link ${
                  location.pathname === routes.search ? 'active' : ''
                }`}
                to={{
                  pathname: routes.search,
                }}
              >
                SEARCH
              </Link>
            </li>
            <Link
              className={`nav-link ${
                location.pathname === routes.contactUs ? 'active' : ''
              }`}
              to={{
                pathname: routes.contactUs,
              }}
            >
              CONTACT US
            </Link>
          </ul>
          <div className='d-flex'>
            <button className='btn btn-primary my-2 my-sm-0' type='submit'>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
