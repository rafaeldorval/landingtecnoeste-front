/* eslint-disable import/no-useless-path-segments */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import ClientActions from '../../store/ducks/client';

import HomePage from '../../pages/Home';
import ClientAcess from '../../pages/ClientAcess';
import RegisterClient from '../../pages/RegisterClient';
import FinishOrcamento from '../../pages/FinishOrcamento';

import { isAuthenticated } from '../../services/auth';

function Routes() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(ClientActions.getClientInfoRequest());
    }
  }, []);

  return (
    <Switch>
      <Route exact path="/app" component={HomePage} />
      <Route exact path="/app/checkout" component={FinishOrcamento} />
      <Route exact path="/app/user/acess" component={ClientAcess} />
      <Route exact path="/app/user/register" component={RegisterClient} />
    </Switch>
  );
}

export default Routes;
