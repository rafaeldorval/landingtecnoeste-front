/* eslint-disable consistent-return */
import Cookies from 'universal-cookie';
import { put, call, select } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import { TOKEN_KEY } from '../../services/auth';
import ClientActions from '../ducks/client';
import api from '../../services/api';

export function* clientVerify({ data }) {
  try {
    const response = yield call(api.post, '/client/verify', data);

    yield put(ClientActions.setRegisterFormStep(1));
    return yield put(ClientActions.verifyClientExistSuccess(response));
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        NotificationManager.error(
          'CPF/CNPJ Já cadastrado',
          'Novo cliente',
        );
      }
    }
    return yield put(ClientActions.loadingCancel());
  }
}

export function* getClientInfo() {
  try {
    const { data } = yield call(api.get, '/client/logged-info');
    const formatData = {
      ...data,
      firstName: data.nome.split(' ')[0],
    };
    return yield put(ClientActions.getClientInfoSuccess(formatData));
  } catch (error) {
    return yield put(ClientActions.loadingCancel());
  }
}

export function* userLogin({ data }) {
  try {
    const { data: response } = yield call(api.post, '/client/login', data);

    NotificationManager.success(
      'Login realizado com sucesso',
      'Login',
    );

    localStorage.setItem(TOKEN_KEY, response.token);

    yield call(getClientInfo);
    yield put(ClientActions.setLoginModalStatus(false));
    return yield put(ClientActions.createClientSuccess());
  } catch (error) {
    if (error.response) {
      if (error.response.status === 405) {
        NotificationManager.error(
          'CPF/CNPJ Já cadastrado',
          'Novo cliente',
        );
      }
    }
    return yield put(ClientActions.loadingCancel());
  }
}

export function* createClient({ data }) {
  try {
    const cookie = new Cookies();
    const navigation = yield select((store) => store.navigation.navigation);
    const { data: response } = yield call(api.post, '/client', data);

    NotificationManager.success(
      'Cliente cadastrado com sucesso',
      'Novo cliente',
    );

    localStorage.setItem(TOKEN_KEY, response.token);

    const queryV = cookie.get('v');
    const queryO = cookie.get('o');

    navigation.push(`/?${queryV ? `v=${queryV}&` : ''}${queryO ? `o=${queryO}` : ''}`);
    yield call(getClientInfo);
    yield put(ClientActions.setLoginModalStatus(false));
    yield put(ClientActions.setRegisterFormStep(0));
    return yield put(ClientActions.createClientSuccess());
  } catch (error) {
    if (error.response) {
      if (error.response.status === 405) {
        NotificationManager.error(
          'CPF/CNPJ ou EMAIL Já cadastrado',
          'Novo cliente',
        );
      }
    }
    return yield put(ClientActions.loadingCancel());
  }
}
