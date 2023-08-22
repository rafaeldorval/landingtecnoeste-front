/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import React from 'react';
import { NotificationContainer } from 'react-notifications';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import './config/reactotron';
import store from './store';

import 'react-notifications/lib/notifications.css';
import Routes from './routes';

function App() {
  return (
    <Provider store={store}>
      <Router basename="/v1">
        <Routes />
        <NotificationContainer />
      </Router>
    </Provider>
  );
}

export default App;
