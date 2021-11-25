import { createReducer, createActions } from 'reduxsauce';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  getPecasRequest: null,
  getPecasSuccess: ['data'],
  loadingCancel: null,
});

export const PecasTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = {
  pecasData: null,
  loading: false,
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PECAS_REQUEST]: (state = INITIAL_STATE) => ({
    ...state,
    loading: true,
  }),

  [Types.GET_PECAS_SUCCESS]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    loading: false,
    pecasData: data,
  }),

  [Types.LOADING_CANCEL]: (state = INITIAL_STATE) => ({
    ...state,
    loading: false,
  }),
});
