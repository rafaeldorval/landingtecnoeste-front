/* eslint-disable consistent-return */
import { put, call, select } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import PecasActions from '../ducks/pecas';
import api from '../../services/api';
import apiFenix from '../../services/apiFenix';
import { formatFloat } from '../../utils/formaters';
// import { formatFloat } from '../../utils/formaters';

export function* getPecas({ nextPage = false }) {
  try {
    const pecasData = yield select((store) => store.pecas.pecasData);
    const lojaSelect = yield select((store) => store.pecas.lojaSelect);

    if (nextPage && pecasData.hasNextPage) {
      const { data } = yield call(apiFenix.get, `/app?l=${lojaSelect}&limit=20${(nextPage && pecasData.hasNextPage) ? `&page=${pecasData.nextPage}` : ''}`);
      const filterData = data.docs.map((item) => ({
        ...item,
        // newPrice: Math.round(((item.PRECO) * 0.9) * 100) / 100,
        newPrice: formatFloat((item.PRECO * 0.9)),
        qtd: 0,
        imgData: `https://fenix.tecnoeste.net/imagens/pecas/slr-${item.SLR}-ref-${item.REFERENCIA}-cf--foto1.jpeg`,
      }));
      const customData = [...pecasData.docs, ...filterData];
      data.docs = customData;
      return yield put(PecasActions.getPecasSuccess(data));
    }

    const { data } = yield call(apiFenix.get, `/app?l=${lojaSelect}&limit=20${(nextPage && pecasData.hasNextPage) ? `&page=${pecasData.nextPage}` : ''}`);
    const filterData = data.docs.map((item) => ({
      ...item,
      // newPrice: Math.round(((item.PRECO) * 0.9) * 100) / 100,
      newPrice: formatFloat((item.PRECO * 0.9)),
      qtd: 0,
      imgData: `https://fenix.tecnoeste.net/imagens/pecas/slr-${item.SLR}-ref-${item.REFERENCIA}-cf--foto1.jpeg`,
    }));

    data.docs = filterData;
    return yield put(PecasActions.getPecasSuccess(data));
  } catch (error) {
    console.log(error);
  }
}

export function* searchPecas({ name, nextPage = false }) {
  try {
    const pecasData = yield select((store) => store.pecas.pecasData);
    const lojaSelect = yield select((store) => store.pecas.lojaSelect);
    const isSearchPecas = yield select((store) => store.pecas.isSearchPecas);

    if (nextPage && pecasData.hasNextPage) {
      const { data } = yield call(apiFenix.get, `/app?l=${lojaSelect}&limit=20&search=${name.toUpperCase()}${(nextPage && pecasData.hasNextPage) ? `&page=${pecasData.nextPage}` : ''}`);
      const filterData = data.docs.map((item) => ({
        ...item,
        // newPrice: Math.round(((item.PRECO) * 0.9) * 100) / 100,
        newPrice: formatFloat((item.PRECO * 0.9)),
        qtd: 0,
        imgData: `https://fenix.tecnoeste.net/imagens/pecas/slr-${item.SLR}-ref-${item.REFERENCIA}-cf--foto1.jpeg`,
      }));
      const customData = [...pecasData.docs, ...filterData];
      data.docs = customData;

      if (isSearchPecas) {
        return yield put(PecasActions.getSearchPecasSuccess(data));
      }

      yield put(PecasActions.setSearchPecas(true));
      yield put(PecasActions.setSecondaryPecas(pecasData));
      return yield put(PecasActions.getSearchPecasSuccess(data));
    }

    const { data } = yield call(apiFenix.get, `/app?l=${lojaSelect}&limit=20&search=${name.toUpperCase()}`);
    const filterData = data.docs.map((item) => ({
      ...item,
      // newPrice: Math.round(((item.PRECO) * 0.9) * 100) / 100,
      newPrice: formatFloat((item.PRECO * 0.9)),
      qtd: 0,
      imgData: `https://fenix.tecnoeste.net/imagens/pecas/slr-${item.SLR}-ref-${item.REFERENCIA}-cf--foto1.jpeg`,
    }));

    data.docs = filterData;

    if (isSearchPecas) {
      return yield put(PecasActions.getSearchPecasSuccess(data));
    }

    yield put(PecasActions.setSearchPecas(true));
    yield put(PecasActions.setSecondaryPecas(pecasData));
    return yield put(PecasActions.getSearchPecasSuccess(data));
  } catch (error) {
    console.log(error);
  }
}

export function* clearPecas() {
  try {
    const pecasData = yield select((store) => store.pecas.secondaryData);

    yield put(PecasActions.clearSearchPecasSuccess(pecasData, null));
    return yield put(PecasActions.setSearchPecas(false));
  } catch (error) {
    console.log(error);
  }
}

export function* finishOrcamento({ data }) {
  try {
    const pecasData = yield select((store) => store.pecas.pecasData.docs);
    const formPgmSelected = yield select((store) => store.pecas.formPgmSelected);
    const totalPrice = yield select((store) => store.pecas.totalPrice);
    const totalPriceFator = yield select((store) => store.pecas.totalPriceFator);
    const lojaSelectStore = yield select((store) => store.pecas.lojaSelect);
    // const clientDataStore = yield select((store) => store.pecas.clientData);

    const filterItens = totalPrice === 0 ? [] : pecasData.filter((item) => item.qtd);
    const dateNow = format(Date.now(), 'dd/MM/yyyy - HH:mm:ss', { locale: ptBr });
    const finalData = {
      ...data,
      produtos: filterItens,
      loja: lojaSelectStore,
      total: formatFloat(totalPrice, true),
      totalMultFormPgt: formatFloat(totalPriceFator, true),
      dateLead: dateNow,
      formaPgmName: totalPrice === 0 ? '' : formPgmSelected.DESCRICAO,
      codFormaPgm: totalPrice === 0 ? '' : formPgmSelected.CODIGO,
      promoName: 'BLACK FRIDAY - 26/11/2021',
    };

    yield call(api.post, '/lead', finalData);
    NotificationManager.success(
      'Orçamento gerado com sucesso, em breve um vendedor ira entrar em contato',
      'Orçamento',
    );
    yield put(PecasActions.setCartStep(4));
    return yield put(PecasActions.finishOrcamentoSuccess());
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        NotificationManager.error(
          'Email informado para atualização já esta cadastrado.',
          'Orçamento',
        );
        return yield put(PecasActions.loadingCancel());
      }
    }
    NotificationManager.error(
      'Ops, algo deu errado, tente novamente',
      'Orçamento',
    );
    return yield put(PecasActions.loadingCancel());
  }
}
