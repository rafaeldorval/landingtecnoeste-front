/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import {
  Switch, Route, BrowserRouter as Router, useLocation,
} from 'react-router-dom';
import ptBr from 'date-fns/locale/pt-BR';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import Header from './components/Header';
import Banner from './components/Banner';
import SectionBanner from './components/SectionBanner';

import 'react-notifications/lib/notifications.css';

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  const query = useQuery();
  const [clientData, setClientData] = useState({
    nome: '',
    email: '',
    telefone: '',
  });

  function handleClientData(value, name) {
    setClientData({
      ...clientData,
      [name]: value,
    });
    console.log('clientData', clientData);
  }

  async function finishOrcamento() {
    if (!clientData.nome || !clientData.email || !clientData.telefone) {
      return alert('Todos os campos do formulario são obrigatorios');
    }

    try {
      const dateNow = format(Date.now(), 'dd/MM/yyyy - HH:mm:ss', { locale: ptBr });
      const finalData = {
        ...clientData,
        codVendedor: query.get('v'),
        origem: query.get('o'),
        dateLead: dateNow,
        promoName: 'LEAD LANDING - SEM PROMO',
      };

      await axios.post('https://trecho.app.br:21124/lead', finalData);
      // await axios.post('http://localhost:21124/lead', finalData);
      NotificationManager.success(
        'Cadastro realizado sucesso',
        'Cadastro landing',
      );
    } catch (error) {
      NotificationManager.error(
        'Ops, algo deu errado, tente novamente',
        'Cadastro landing',
      );
    }
  }

  return (
    <div className="h-screen">
      <Header />
      <Banner
        clientData={clientData}
        codFormaPgm={clientData.codFormaPgm}
        handleClientData={handleClientData}
        finishOrcamento={finishOrcamento}
      />
      <SectionBanner />
      <NotificationContainer />
    </div>
  );
}

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" component={App} />
    </Switch>
  </Router>
);

export default Routes;
