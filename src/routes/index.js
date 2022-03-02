import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useQuery } from '../hooks/useQuery';

import AppLayout from '../layout/app';
import ClientLayout from '../layout/client';

import { isAuthenticated } from '../services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/app', state: { from: props.location } }} />
    ))}
  />
);

const Routes = () => {
  const query = useQuery();

  useEffect(() => {
    const cookie = new Cookies();

    const vendedorQuery = query.get('v');
    const origemQuery = query.get('o');

    if (vendedorQuery) {
      cookie.set('v', vendedorQuery);
    }

    if (origemQuery) {
      cookie.set('o', vendedorQuery);
    }
  }, []);

  return (
    <Switch>
      <Route path="/app" component={AppLayout} />
      <PrivateRoute path="/cliente" component={ClientLayout} />
      <Redirect from="/" to="/app" />
    </Switch>
  );
};

export default Routes;
