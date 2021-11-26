/* eslint-disable consistent-return */
import { put, call, select } from 'redux-saga/effects';
import { create, all } from 'mathjs';
import PecasActions from '../ducks/pecas';
import api from '../../services/api';
// import { formatFloat } from '../../utils/formaters';
const config = { };
const math = create(all, config);

export function* getPecas({ nextPage = false }) {
  try {
    const pecasData = yield select((store) => store.pecas.pecasData);
    const lojaSelect = yield select((store) => store.pecas.lojaSelect);

    if (nextPage && pecasData.hasNextPage) {
      const { data } = yield call(api.get, `/?l=${lojaSelect}&limit=20${(nextPage && pecasData.hasNextPage) ? `&page=${pecasData.nextPage}` : ''}`);
      const filterData = data.docs.map((item) => ({
        ...item,
        // newPrice: Math.round(((item.PRECO) * 0.9) * 100) / 100,
        newPrice: math.round((item.PRECO * 0.9), 2),
        qtd: 0,
        imgData: `https://fenix.tecnoeste.net/imagens/pecas/slr-${item.SLR}-ref-${item.REFERENCIA}-cf--foto1.jpeg`,
      }));
      const customData = [...pecasData.docs, ...filterData];
      data.docs = customData;
      return yield put(PecasActions.getPecasSuccess(data));
    }

    const { data } = yield call(api.get, `/?l=${lojaSelect}&limit=20${(nextPage && pecasData.hasNextPage) ? `&page=${pecasData.nextPage}` : ''}`);
    const filterData = data.docs.map((item) => ({
      ...item,
      // newPrice: Math.round(((item.PRECO) * 0.9) * 100) / 100,
      newPrice: math.round((item.PRECO * 0.9), 2),
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
      const { data } = yield call(api.get, `/?l=${lojaSelect}&limit=20&search=${name.toUpperCase()}${(nextPage && pecasData.hasNextPage) ? `&page=${pecasData.nextPage}` : ''}`);
      const filterData = data.docs.map((item) => ({
        ...item,
        // newPrice: Math.round(((item.PRECO) * 0.9) * 100) / 100,
        newPrice: math.round((item.PRECO * 0.9), 2),
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

    const { data } = yield call(api.get, `/?l=${lojaSelect}&limit=20&search=${name.toUpperCase()}`);
    const filterData = data.docs.map((item) => ({
      ...item,
      // newPrice: Math.round(((item.PRECO) * 0.9) * 100) / 100,
      newPrice: math.round((item.PRECO * 0.9), 2),
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
