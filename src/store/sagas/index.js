import { all, takeLatest } from 'redux-saga/effects';

import { PecasTypes } from '../ducks/pecas';
import { searchClient } from './pecas';

export default function* rootSaga() {
  yield all([
    takeLatest(PecasTypes.GET_PECAS_REQUEST, searchClient),
  ]);
}
