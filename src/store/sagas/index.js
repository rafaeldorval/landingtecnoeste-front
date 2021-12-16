import { all, takeLatest } from 'redux-saga/effects';

import { PecasTypes } from '../ducks/pecas';
import {
  getPecas,
  searchPecas,
  clearPecas,
  finishOrcamento,
} from './pecas';

import { ClientTypes } from '../ducks/client';
import {
  clientVerify,
  createClient,
  getClientInfo,
  userLogin,
  getPedidos,
} from './client';

export default function* rootSaga() {
  yield all([
    takeLatest(PecasTypes.GET_PECAS_REQUEST, getPecas),
    takeLatest(PecasTypes.GET_SEARCH_PECAS_REQUEST, searchPecas),
    takeLatest(PecasTypes.CLEAR_SEARCH_PECAS_REQUEST, clearPecas),
    takeLatest(PecasTypes.FINISH_ORCAMENTO_REQUEST, finishOrcamento),
    takeLatest(ClientTypes.VERIFY_CLIENT_EXIST_REQUEST, clientVerify),
    takeLatest(ClientTypes.CREATE_CLIENT_REQUEST, createClient),
    takeLatest(ClientTypes.GET_CLIENT_INFO_REQUEST, getClientInfo),
    takeLatest(ClientTypes.GET_PEDIDOS_CLIENT_REQUEST, getPedidos),
    takeLatest(ClientTypes.USER_LOGIN_REQUEST, userLogin),
  ]);
}
