/* eslint-disable no-nested-ternary */
import { createReducer, createActions } from 'reduxsauce';
import { formatFloat } from '../../utils/formaters';
import formPagamentoData from '../../utils/formPagamento';

const formPagamentoInicial = formPagamentoData[0];

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
  finishOrcamentoRequest: ['data'],
  finishOrcamentoSuccess: null,
  loadingCancel: null,
  handleItemQtd: ['ref', 'action'],
  handleClearItemQtd: ['ref'],
  handleFormPgt: ['value'],
  setLoading: ['data'],
  setSideCartStatus: ['data'],
  setLoja: ['data'],
  setCarrinho: ['data'],
});

export const PecasTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = {
  pecasData: null,
  secondaryData: null,
  isSearchPecas: false,
  lojaSelect: null,
  carrinho: null,
  totalPrice: 0,
  totalPriceFator: 0,
  formPgmData: formPagamentoData,
  formPgmSelected: formPagamentoInicial,
  sideCartStatus: false,
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

  [Types.FINISH_ORCAMENTO_REQUEST]: (state = INITIAL_STATE) => ({
    ...state,
    loading: false,
  }),

  [Types.FINISH_ORCAMENTO_SUCCESS]: (state = INITIAL_STATE) => ({
    ...state,
    loading: false,
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

  [Types.HANDLE_ITEM_QTD]: (state = INITIAL_STATE, {
    ref,
    action,
  }) => {
    const filterQtdItem = state.pecasData.docs.map((item) => (item.REFERENCIA === ref ? (
      {
        ...item,
        qtd: action === '+'
          ? (item.qtd ? item.qtd + 1 : 1)
          : (item.qtd && item.qtd > 0 && item.qtd - 1),
      }
    ) : item));

    const priceToItemFilter = state.pecasData.docs.filter(
      (item) => item.REFERENCIA === ref,
    )[0].newPrice;

    const updateTotalPrice = action === '+'
      ? state.totalPrice + priceToItemFilter
      : (priceToItemFilter > state.totalPrice
        ? 0
        : state.totalPrice - priceToItemFilter
      );

    return ({
      ...state,
      pecasData: {
        ...state.pecasData,
        docs: filterQtdItem,
      },
      totalPrice: updateTotalPrice,
      totalPriceFator: updateTotalPrice,
    });
  },

  [Types.HANDLE_CLEAR_ITEM_QTD]: (state = INITIAL_STATE, {
    ref,
  }) => {
    const filterOldItem = state.pecasData.docs.filter(
      (item) => item.REFERENCIA === ref,
    )[0];
    const totalOldPrice = filterOldItem.newPrice * filterOldItem.qtd;
    const filterQtdItem = state.pecasData.docs.map((item) => (item.REFERENCIA === ref ? (
      {
        ...item,
        qtd: 0,
      }
    ) : item));

    const updateTotalPrice = totalOldPrice > state.totalPrice
      ? 0
      : state.totalPrice - totalOldPrice;

    return ({
      ...state,
      pecasData: {
        ...state.pecasData,
        docs: filterQtdItem,
      },
      totalPrice: updateTotalPrice,
      totalPriceFator: updateTotalPrice,
    });
  },

  [Types.HANDLE_FORM_PGT]: (state = INITIAL_STATE, {
    value,
  }) => {
    const formPgtSelect = state.formPgmData.filter((pgt) => pgt.CODIGO === value)[0];
    // const finalPrice = formPgtSelect.nFator > 0 ? totalPrice * formPgtSelect.nFator : totalPrice;
    const { nFator, nParcelas } = formPgtSelect;
    const nFatorFormat = nFator === 0 ? 1 : nFator;
    const nParcelasFormat = nParcelas === 0 ? 1 : nParcelas;

    const totalFormat = formatFloat(state.totalPrice);
    const valueParcelaFator = formatFloat((totalFormat * nFatorFormat) / nParcelasFormat);
    const totalFinal = formatFloat((valueParcelaFator * nParcelasFormat));

    return ({
      ...state,
      formPgmSelected: formPgtSelect,
      totalPriceFator: totalFinal,
    });
  },

  [Types.LOADING_CANCEL]: (state = INITIAL_STATE) => ({
    ...state,
    loading: false,
  }),

  [Types.SET_SIDE_CART_STATUS]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    sideCartStatus: data,
  }),

  [Types.SET_LOADING]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    loading: data,
  }),

  [Types.SET_LOJA]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    lojaSelect: data,
  }),

  [Types.SET_CARRINHO]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    carrinho: data,
  }),
});
