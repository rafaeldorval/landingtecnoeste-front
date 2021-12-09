/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';
import PecasAction from '../../store/ducks/pecas';

import HomeSection from './HomeSection';
import Footer from '../../components/Footer';
import Body from './Body';
import BodySelectLoja from './BodySelectLoja';

import PreSideCart from '../../components/PreSideCart';
import PreSideCartMobile from '../../components/PreSideCartMobile';
import Header from '../../components/Header';
import ScrollToTop from '../../components/ScrollToTop';
import LoadingScreen from '../../components/LoadingScreen';
import VendedorData from '../../config/vendedorData';

import 'react-notifications/lib/notifications.css';

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Home() {
  const dispatch = useDispatch();
  const query = useQuery();
  const pecasLoading = useSelector((state) => state.pecas.loading);
  const lojaSelectStore = useSelector((state) => state.pecas.lojaSelect);
  const totalPrice = useSelector((state) => state.pecas.totalPrice);
  const [initialized, setInitialized] = useState(false);
  // const [clientData, setClientData] = useState({
  //   nome: '',
  //   email: '',
  //   telefone: '',
  //   codVendedor: query.get('v'),
  //   origem: query.get('o'),
  // });

  useEffect(() => {
    if (!window.location.href.includes('localhost')) {
      ReactGA.initialize('G-43LVTPTNBJ');
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }, [initialized]);

  useEffect(() => {
    const vendedorQuery = query.get('v');
    if (vendedorQuery) {
      const vendedorFilter = VendedorData.filter((vend) => vend.codVendedor === vendedorQuery);

      if (vendedorFilter.length > 0) {
        dispatch(PecasAction.setLoja(vendedorFilter[0].loja));
      }
    }
  }, []);

  useEffect(() => {
    if (lojaSelectStore) {
      dispatch(PecasAction.getPecasRequest());
    }
  }, [lojaSelectStore]);

  return (
    <div className="flex flex-col justify-between h-full">
      {pecasLoading && (
        <LoadingScreen />
      )}
      {totalPrice > 0 && (
        <PreSideCart />
      )}
      {totalPrice > 0 && (
        <PreSideCartMobile />
      )}
      <Header />
      {lojaSelectStore && (
        <ScrollToTop />
      )}
      <HomeSection />
      {lojaSelectStore && (
        <Body />
      )}
      {!lojaSelectStore && (
        <BodySelectLoja />
      )}
      <Footer />
    </div>
  );
}
