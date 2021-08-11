import React from 'react';
import { Redirect, Switch, Route, useLocation } from 'react-router-dom';
import {
  CryptoList,
  Details
} from '../pages';

export const routes = {
  home: '/',
  cryptoList: '/market',
  details: '/details',
  contactUs: '/contact-us',
  search: '/search'
};

const Routes = () => {
  const location = useLocation();
  const isRouteValid = (pathname) => {
    let isValid = false;
    Object.keys(routes).forEach((routeKey) => {
      if (routes[routeKey] === pathname) isValid = true;
    });
    return isValid;
  };
  return (
    <Switch>
      <Redirect exact from={routes.home} to={routes.cryptoList} />
      {isRouteValid(location.pathname) ? (
        <>
          <Route exact component={CryptoList} path={routes.cryptoList} />
          <Route exact component={Details} path={`${routes.details}`} />
          <Route exact component={CryptoList} path={routes.search} />
          <Route exact component={CryptoList} path={routes.contactUs} />
        </>
      ) : (
        <Redirect to={routes.home} />
      )}
    </Switch>
  );
};

export default Routes;
