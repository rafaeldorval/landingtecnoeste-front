import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AppLayout from '../layout/app';

const Routes = () => (
  <Switch>
    <Route path="/" component={AppLayout} />
  </Switch>
);

export default Routes;
