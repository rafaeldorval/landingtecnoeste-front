import { combineReducers } from 'redux';

import { reducer as pecas } from './pecas';

const reducers = combineReducers({
  pecas,
});

export default reducers;
