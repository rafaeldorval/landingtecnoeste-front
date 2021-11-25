import { put, call } from 'redux-saga/effects';
import PecasActions from '../ducks/pecas';
import api from '../../services/api';

export function* searchClient() {
  try {
    const { data } = yield call(api.get, '/l=0001');
    const filterData = data.docs.map((item) => ({
      ...item,
      newPrice: item.PRECO * 0.90,
      qtd: 0,
      imgData: `https://fenix.tecnoeste.net/imagens/pecas/slr-${item.SLR}-ref-${item.REFERENCIA}-cf--foto1.jpeg`,
    }));

    data.docs = filterData;
    yield put(PecasActions.getPecasSuccess(data));
  } catch (error) {
    console.log(error);
  }
}
