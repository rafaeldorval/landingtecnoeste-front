/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import React, { createContext, useState } from 'react';
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
import Body from './components/Body';
import Footer from './components/Footer';
import FAB from './components/FAB';

import initialItemData from './data';

import 'react-notifications/lib/notifications.css';

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  const query = useQuery();
  const [itemData, setItemData] = useState([...initialItemData]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [clientData, setClientData] = useState({
    nome: '',
    email: '',
    telefone: '',
  });

  function handleItemQtd(ref, action) {
    const filterQtdItem = itemData.map((item) => (item.ref === ref ? (
      {
        ...item,
        qtd: action === '+' ? (item.qtd ? item.qtd + 1 : 1) : (item.qtd && item.qtd > 0 && item.qtd - 1),
      }
    ) : item));

    setItemData(filterQtdItem);
    const priceToItemFilter = itemData.filter((item) => item.ref === ref)[0].newPrice;
    const updateTotalPrice = action === '+' ? totalPrice + priceToItemFilter : (priceToItemFilter > totalPrice ? 0 : totalPrice - priceToItemFilter);
    setTotalPrice(updateTotalPrice);
  }

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
      const filterItens = totalPrice === 0 ? [] : itemData.filter((item) => item.qtd);
      const dateNow = format(Date.now(), 'dd/MM/yyyy - HH:mm:ss', { locale: ptBr });
      console.log('query.get', query.get('v'));
      const finalData = {
        ...clientData,
        codVendedor: query.get('v'),
        origem: query.get('o'),
        produtos: filterItens,
        total: totalPrice,
        dateLead: dateNow,
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

  const Context = createContext(null);

  return (
    <div className="h-screen">
      <Header />
      <Banner
        totalPrice={totalPrice}
        clientData={clientData}
        handleClientData={handleClientData}
        finishOrcamento={finishOrcamento}
      />
      <SectionBanner />
      <Body itemData={itemData} handleItemQtd={handleItemQtd} />
      <Footer />
      <Context.Provider value={{ price: totalPrice }}>
        <FAB totalPrice={totalPrice} />
      </Context.Provider>
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
