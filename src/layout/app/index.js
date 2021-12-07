/* eslint-disable import/no-useless-path-segments */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from '../../pages/Home';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
    </Switch>
  );
}

export default Routes;
