/* eslint-disable import/no-useless-path-segments */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MeusPedidos from '../../pages/MeusPedidos';

function Routes() {
  return (
    <Switch>
      <Route exact path="/cliente/pedidos" component={MeusPedidos} />
    </Switch>
  );
}

export default Routes;
