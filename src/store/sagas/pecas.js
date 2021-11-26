/* eslint-disable consistent-return */
import { put, call, select } from 'redux-saga/effects';
import PecasActions from '../ducks/pecas';
import api from '../../services/api';

export function* getPecas({ nextPage = false }) {
  try {
    const pecasData = yield select((store) => store.pecas.pecasData);

    if (nextPage && pecasData.hasNextPage) {
      const { data } = yield call(api.get, `/?l=0001&limit=50${(nextPage && pecasData.hasNextPage) ? `&page=${pecasData.nextPage}` : ''}`);
      const filterData = data.docs.map((item) => ({
        ...item,
        newPrice: item.PRECO * 0.90,
        qtd: 0,
        imgData: `https://fenix.tecnoeste.net/imagens/pecas/slr-${item.SLR}-ref-${item.REFERENCIA}-cf--foto1.jpeg`,
      }));
      const customData = [...pecasData.docs, ...filterData];
      data.docs = customData;
      return yield put(PecasActions.getPecasSuccess(data));
    }

    const { data } = yield call(api.get, `/?l=0001&limit=50${(nextPage && pecasData.hasNextPage) ? `&page=${pecasData.nextPage}` : ''}`);
    const filterData = data.docs.map((item) => ({
      ...item,
      newPrice: item.PRECO * 0.90,
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
    const isSearchPecas = yield select((store) => store.pecas.isSearchPecas);

    if (nextPage && pecasData.hasNextPage) {
      const { data } = yield call(api.get, `/?l=0001&limit=100&search=${name.toUpperCase()}${(nextPage && pecasData.hasNextPage) ? `&page=${pecasData.nextPage}` : ''}`);
      const filterData = data.docs.map((item) => ({
        ...item,
        newPrice: item.PRECO * 0.90,
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

    const { data } = yield call(api.get, `/?l=0001&limit=100&search=${name.toUpperCase()}`);
    const filterData = data.docs.map((item) => ({
      ...item,
      newPrice: item.PRECO * 0.90,
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
