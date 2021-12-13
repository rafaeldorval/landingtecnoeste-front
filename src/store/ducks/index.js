import { combineReducers } from 'redux';

import { reducer as pecas } from './pecas';
import { reducer as client } from './client';
import { reducer as navigation } from './navigation';

const reducers = combineReducers({
  pecas,
  client,
  navigation,
});

export default reducers;
