/* eslint-disable no-unused-vars */
import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  setNavigation: ['data'],
});

export const NavigationTypes = Types;
export default Creators;

export const INITAL_STATE = {
  navigation: null,
};

export const reducer = createReducer(INITAL_STATE, {
  [Types.SET_NAVIGATION]: (state = INITAL_STATE, { data }) => ({
    navigation: data,
  }),
});
