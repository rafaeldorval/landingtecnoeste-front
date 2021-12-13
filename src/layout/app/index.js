/* eslint-disable import/no-useless-path-segments */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import ClientActions from '../../store/ducks/client';

import HomePage from '../../pages/Home';
import RegisterClient from '../../pages/RegisterClient';
import { isAuthenticated } from '../../services/auth';

function Routes() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(ClientActions.getClientInfoRequest());
    }
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/user/register" component={RegisterClient} />
    </Switch>
  );
}

export default Routes;
