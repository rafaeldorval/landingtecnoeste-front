/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import React, { createContext, useState, useRef } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import {
  Switch, Route, BrowserRouter as Router, useLocation,
} from 'react-router-dom';
import { create, all } from 'mathjs';
import ptBr from 'date-fns/locale/pt-BR';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import Header from './components/Header';
import Banner from './components/Banner';
import BannerFooter from './components/BannerFooter';
import SectionBanner from './components/SectionBanner';
import Body from './components/Body';
import BodySection from './components/BodySection';
import Footer from './components/Footer';

import 'react-notifications/lib/notifications.css';

const config = { };

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  const query = useQuery();
  const bodyRef = useRef();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceFator, setTotalPriceFator] = useState(0);
  const [clientData, setClientData] = useState({
    nome: '',
    email: '',
    telefone: '',
    codFormaPgm: '01',
    formaPgmName: '',
  });

  function handleClientData(value, name) {
    setClientData({
      ...clientData,
      [name]: value,
    });
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
        produtos: [],
        dateLead: dateNow,
        area: 'equipamentos',
        promoName: 'CAMPANHA COMPACTADORES DE SOLO VOLVO SD110B',
      };

      await axios.post('https://trecho.app.br:21124/lead', finalData);
      // await axios.post('http://localhost:21124/lead', finalData);
      NotificationManager.success(
        'Orçamento gerado com sucesso, em breve um vendedor ira entrar em contato',
        'Orçamento',
      );
    } catch (error) {
      NotificationManager.error(
        'Ops, algo deu errado, tente novamente',
        'Orçamento',
      );
    }
  }

  return (
    <div className="h-screen">
      <Header />
      <Banner />
      <SectionBanner />
      <Body />
      <BodySection />
      <BannerFooter
        handleClientData={handleClientData}
        clientData={clientData}
        finishOrcamento={finishOrcamento}
      />
      <Footer />
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
