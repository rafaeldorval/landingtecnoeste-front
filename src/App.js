/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import React, {
  createContext, useState, useRef, useEffect,
} from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import axios from 'axios';
import {
  Switch,
  Route,
  useLocation,
  BrowserRouter as Router,
} from 'react-router-dom';
import { create, all } from 'mathjs';
import ptBr from 'date-fns/locale/pt-BR';
import { NotificationManager, NotificationContainer } from 'react-notifications';

import PecasAction from './store/ducks/pecas';

import './config/reactotron';
import store from './store';
import Header from './components/Header';
import Banner from './components/Banner';
import Body from './components/Body';
import FAB from './components/FAB';
import formPgmData from './components/Banner/formPagamento';
import initialItemData from './newData';

import 'react-notifications/lib/notifications.css';

const config = { };
const math = create(all, config);

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  const dispatch = useDispatch();
  const query = useQuery();
  const bodyRef = useRef();
  const pecasData = useSelector((state) => state.pecas.pecasData);
  const [itemData, setItemData] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceFator, setTotalPriceFator] = useState(0);
  const [clientData, setClientData] = useState({
    nome: '',
    email: '',
    telefone: '',
    codFormaPgm: '01',
    formaPgmName: '',
  });

  useEffect(() => {
    dispatch(PecasAction.getPecasRequest());
  }, []);

  useEffect(() => {
    if (pecasData) {
      setItemData([...pecasData.docs]);
    }
  }, [pecasData]);

  function handleItemQtd(REFERENCIA, action) {
    const filterQtdItem = itemData.map((item) => (item.REFERENCIA === REFERENCIA ? (
      {
        ...item,
        qtd: action === '+' ? (item.qtd ? item.qtd + 1 : 1) : (item.qtd && item.qtd > 0 && item.qtd - 1),
      }
    ) : item));

    setItemData(filterQtdItem);
    const priceToItemFilter = itemData.filter(
      (item) => item.REFERENCIA === REFERENCIA,
    )[0].newPrice;
    const updateTotalPrice = action === '+' ? totalPrice + priceToItemFilter : (priceToItemFilter > totalPrice ? 0 : totalPrice - priceToItemFilter);
    setTotalPrice(updateTotalPrice);
    setTotalPriceFator(updateTotalPrice);
  }

  function handleClientData(value, name) {
    setClientData({
      ...clientData,
      [name]: value,
    });
    console.log('clientData', clientData);
  }

  function handleFormPgt(value) {
    const formPgtSelect = formPgmData.filter((pgt) => pgt.CODIGO === value)[0];
    // const finalPrice = formPgtSelect.nFator > 0 ? totalPrice * formPgtSelect.nFator : totalPrice;
    const { nFator, nParcelas } = formPgtSelect;
    const nFatorFormat = nFator === 0 ? 1 : nFator;
    const nParcelasFormat = nParcelas === 0 ? 1 : nParcelas;

    const totalFormat = math.round(totalPrice, 2);
    const valueParcelaFator = math.round(
      ((totalFormat * nFatorFormat) / nParcelasFormat), 2,
    );
    const totalFinal = math.round((valueParcelaFator * nParcelasFormat), 2);
    setClientData({
      ...clientData,
      codFormaPgm: value,
      formaPgmName: formPgtSelect.DESCRICAO,
    });
    return setTotalPriceFator(totalFinal);
  }

  async function finishOrcamento() {
    if (!clientData.nome || !clientData.email || !clientData.telefone) {
      return alert('Todos os campos do formulario são obrigatorios');
    }

    try {
      const filterItens = totalPrice === 0 ? [] : itemData.filter((item) => item.qtd);
      const dateNow = format(Date.now(), 'dd/MM/yyyy - HH:mm:ss', { locale: ptBr });
      const formPgmFilter = formPgmData.filter((pgm) => pgm.CODIGO === clientData.codFormaPgm)[0];
      const finalData = {
        ...clientData,
        codVendedor: query.get('v'),
        origem: query.get('o'),
        produtos: filterItens,
        total: totalPrice,
        totalMultFormPgt: totalPriceFator.toLocaleString('pt-br', { minimumFractionDigits: 2 }),
        dateLead: dateNow,
        formaPgmName: !clientData.formaPgmName ? formPgmFilter.DESCRICAO : clientData.formaPgmName,
        promoName: 'CAMPANHA NACIONAL DE PECAS, 30/10/2021',
      };

      // await axios.post('https://trecho.app.br:21124/lead', finalData);
      await axios.post('http://localhost:21124/lead', finalData);
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
      <FAB totalPrice={totalPriceFator} />
      {/* <Context.Provider value={{ price: totalPrice }}>
      </Context.Provider> */}
      <Header />
      <Body itemData={itemData} handleItemQtd={handleItemQtd} ref={bodyRef} />
      {/* <Footer /> */}
      <Banner
        totalPrice={totalPrice}
        totalPriceFator={totalPriceFator}
        clientData={clientData}
        setTotalPrice={setTotalPrice}
        codFormaPgm={clientData.codFormaPgm}
        handleFormPgt={handleFormPgt}
        handleClientData={handleClientData}
        finishOrcamento={finishOrcamento}
      />
      {/* <SectionBanner /> */}
      <NotificationContainer />
    </div>
  );
}

const Routes = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </Provider>
);

export default Routes;
