import { all, takeLatest } from 'redux-saga/effects';

import { PecasTypes } from '../ducks/pecas';
import {
  getPecas, searchPecas, clearPecas, finishOrcamento,
} from './pecas';

export default function* rootSaga() {
  yield all([
    takeLatest(PecasTypes.GET_PECAS_REQUEST, getPecas),
    takeLatest(PecasTypes.GET_SEARCH_PECAS_REQUEST, searchPecas),
    takeLatest(PecasTypes.CLEAR_SEARCH_PECAS_REQUEST, clearPecas),
    takeLatest(PecasTypes.FINISH_ORCAMENTO_REQUEST, finishOrcamento),
  ]);
}
