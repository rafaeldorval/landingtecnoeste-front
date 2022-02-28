/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import { createReducer, createActions } from 'reduxsauce';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  verifyClientExistRequest: ['data'],
  verifyClientExistSuccess: ['data'],
  createClientRequest: ['data'],
  createClientSuccess: null,
  getClientInfoRequest: null,
  getClientInfoSuccess: ['data'],
  getPedidosClientRequest: null,
  getPedidosClientSuccess: ['data'],
  userLoginRequest: ['data', 'navigation'],
  userLoginSuccess: ['data'],
  resetPasswordRequest: ['data'],
  resetPasswordSuccess: null,
  passwordTokenVerifyRequest: ['data'],
  passwordTokenVerifySuccess: null,
  newPasswordRequest: ['data'],
  newPasswordSuccess: null,
  createIssuesRequest: ['data'],
  createIssuesSuccess: null,
  setLoginModalStatus: ['data'],
  setRecoveryPasswordModal: ['data'],
  setRegisterFormStep: ['data'],
  setClientData: ['data'],
  setDeliveryData: ['data'],
  setInvalidRecoveryPasswordToken: ['data'],
  loadingCancel: null,
});

export const ClientTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = {
  loginModalStatus: false,
  recoveryPasswordModal: {
    status: false,
    step: 0,
  },
  registerFormStep: 0,
  invalidRecoveryPasswordToken: false,
  clientData: null,
  deliveryData: null,
  pedidosData: null,
  loading: false,
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.VERIFY_CLIENT_EXIST_REQUEST]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    loading: true,
  }),
  [Types.VERIFY_CLIENT_EXIST_SUCCESS]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    registerFormStep: 1,
    clientData: data,
    loading: false,
  }),

  [Types.CREATE_CLIENT_REQUEST]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    loading: true,
  }),
  [Types.CREATE_CLIENT_SUCCESS]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    loading: false,
  }),

  [Types.USER_LOGIN_REQUEST]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    loading: true,
  }),
  [Types.USER_LOGIN_SUCCESS]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    loading: false,
  }),

  [Types.RESET_PASSWORD_REQUEST]: (state = INITIAL_STATE) => ({
    ...state,
    loading: true,
  }),
  [Types.RESET_PASSWORD_SUCCESS]: (state = INITIAL_STATE) => ({
    ...state,
    loading: false,
  }),

  [Types.PASSWORD_TOKEN_VERIFY_REQUEST]: (state = INITIAL_STATE) => ({
    ...state,
    loading: true,
  }),
  [Types.PASSWORD_TOKEN_VERIFY_SUCCESS]: (state = INITIAL_STATE) => ({
    ...state,
    loading: false,
  }),

  [Types.NEW_PASSWORD_REQUEST]: (state = INITIAL_STATE) => ({
    ...state,
    loading: true,
  }),
  [Types.NEW_PASSWORD_SUCCESS]: (state = INITIAL_STATE) => ({
    ...state,
    loading: false,
  }),

  [Types.CREATE_ISSUES_REQUEST]: (state = INITIAL_STATE) => ({
    ...state,
    loading: true,
  }),
  [Types.CREATE_ISSUES_SUCCESS]: (state = INITIAL_STATE) => ({
    ...state,
    loading: false,
  }),

  [Types.GET_PEDIDOS_CLIENT_REQUEST]: (state = INITIAL_STATE) => ({
    ...state,
    loading: true,
  }),

  [Types.GET_PEDIDOS_CLIENT_SUCCESS]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    pedidosData: data,
    loading: false,
  }),

  [Types.GET_CLIENT_INFO_REQUEST]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    loading: true,
  }),
  [Types.GET_CLIENT_INFO_SUCCESS]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    clientData: data,
    loading: false,
  }),

  [Types.SET_REGISTER_FORM_STEP]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    registerFormStep: data,
  }),

  [Types.SET_RECOVERY_PASSWORD_MODAL]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    recoveryPasswordModal: data,
  }),

  [Types.SET_LOGIN_MODAL_STATUS]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    loginModalStatus: data,
  }),

  [Types.SET_CLIENT_DATA]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    clientData: data,
  }),

  [Types.SET_DELIVERY_DATA]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    deliveryData: data,
  }),

  [Types.SET_INVALID_RECOVERY_PASSWORD_TOKEN]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    invalidRecoveryPasswordToken: data,
  }),

  [Types.LOADING_CANCEL]: (state = INITIAL_STATE) => ({
    ...state,
    loading: false,
  }),
});
