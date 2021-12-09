/* eslint-disable no-nested-ternary */
import { createReducer, createActions } from 'reduxsauce';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  setLoginModalStatus: ['data'],
  loadingCancel: null,
});

export const ClientTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = {
  loginModalStatus: false,
  loading: false,
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_LOGIN_MODAL_STATUS]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    loginModalStatus: data,
  }),

  [Types.LOADING_CANCEL]: (state = INITIAL_STATE) => ({
    ...state,
    loading: false,
  }),
});
