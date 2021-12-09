import { combineReducers } from 'redux';

import { reducer as pecas } from './pecas';
import { reducer as client } from './client';

const reducers = combineReducers({
  pecas,
  client,
});

export default reducers;
