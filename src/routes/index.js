import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

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

const Routes = () => (
  <Switch>
    <Route path="/app" component={AppLayout} />
    <PrivateRoute path="/cliente" component={ClientLayout} />
    <Redirect from="/" to="/app" />
  </Switch>
);

export default Routes;
