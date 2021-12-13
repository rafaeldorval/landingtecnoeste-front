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
  userLoginRequest: ['data'],
  userLoginSuccess: ['data'],
  setLoginModalStatus: ['data'],
  setRegisterFormStep: ['data'],
  loadingCancel: null,
});

export const ClientTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = {
  loginModalStatus: false,
  registerFormStep: 0,
  clientData: null,
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

  [Types.SET_LOGIN_MODAL_STATUS]: (state = INITIAL_STATE, { data }) => ({
    ...state,
    loginModalStatus: data,
  }),

  [Types.LOADING_CANCEL]: (state = INITIAL_STATE) => ({
    ...state,
    loading: false,
  }),
});
