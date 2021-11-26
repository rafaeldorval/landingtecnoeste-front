import { createReducer, createActions } from 'reduxsauce';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  getPecasRequest: ['nextPage'],
  getPecasSuccess: ['data'],
  getSearchPecasRequest: ['name', 'nextPage'],
  getSearchPecasSuccess: ['data'],
  setSecondaryPecas: ['data'],
  setSearchPecas: ['data'],
  clearSearchPecasRequest: null,
  clearSearchPecasSuccess: ['data', 'secondaryData'],
  loadingCancel: null,
  setLoading: ['data'],
  setLoja: ['data'],
});

export const PecasTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = {
  pecasData: null,
  secondaryData: null,
  isSearchPecas: false,
  lojaSelect: null,
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
  [Types.GET_SEARCH_PECAS_REQUEST]: (state = INITIAL_STATE) => ({
    ...state,
    loading: true,
  }),

  [Types.GET_SEARCH_PECAS_SUCCESS]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    loading: false,
    pecasData: data,
  }),

  [Types.SET_SECONDARY_PECAS]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    loading: false,
    secondaryData: data,
  }),

  [Types.SET_SEARCH_PECAS]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    loading: false,
    isSearchPecas: data,
  }),

  [Types.CLEAR_SEARCH_PECAS_REQUEST]: (state = INITIAL_STATE) => ({
    ...state,
    loading: false,
  }),

  [Types.CLEAR_SEARCH_PECAS_SUCCESS]: (state = INITIAL_STATE, {
    data,
    secondaryData,
  }) => ({
    ...state,
    loading: false,
    pecasData: data,
    secondaryData,
  }),

  [Types.LOADING_CANCEL]: (state = INITIAL_STATE) => ({
    ...state,
    loading: false,
  }),
  [Types.SET_LOADING]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    loading: data,
  }),
  [Types.SET_LOJA]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    lojaSelect: data,
  }),
});
