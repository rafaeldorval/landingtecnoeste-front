/* eslint-disable import/no-useless-path-segments */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from '../../pages/Home';
import RegisterClient from '../../pages/RegisterClient';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/user/register" component={RegisterClient} />
    </Switch>
  );
}

export default Routes;
