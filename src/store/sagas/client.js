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

export function* getPedidos() {
  try {
    const { data } = yield call(api.get, '/lead/client-logged');

    if (data.leads && data.leads.produtos) {
      const formatedProdutos = data.leads.produtos.map((prod) => ({
        ...prod,
        imgData: `https://fenix.tecnoeste.net/imagens/pecas/slr-${prod.SLR}-ref-${prod.REFERENCIA}-cf--foto1.jpeg`,
      }));

      data.produtos = formatedProdutos;
    }

    return yield put(ClientActions.getPedidosClientSuccess(data.leads));
  } catch (error) {
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

export function* userLogin({ data, navigation }) {
  try {
    const { data: response } = yield call(api.post, '/client/login', data);
    const navigationStore = yield select((store) => store.navigation.navigation);

    NotificationManager.success(
      'Login realizado com sucesso',
      'Login',
    );

    localStorage.setItem(TOKEN_KEY, response.token);

    yield call(getClientInfo);
    yield put(ClientActions.setLoginModalStatus(false));

    if (navigation) {
      navigationStore.push(navigation);
    }

    return yield put(ClientActions.userLoginSuccess());
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        NotificationManager.error(
          'CPF/CNPJ ou EMAIL estão incorreto',
          'Login',
        );
      }
    }
    return yield put(ClientActions.loadingCancel());
  }
}

export function* passwordTokenVerify({ data }) {
  try {
    yield call(api.post, '/client/passwordtoken-verify', data);

    NotificationManager.success(
      'Senha atualizada com sucesso',
      'Recuperação de Senha',
    );

    return yield put(ClientActions.passwordTokenVerifySuccess());
  } catch (error) {
    yield put(ClientActions.setInvalidRecoveryPasswordToken(true));
    return yield put(ClientActions.loadingCancel());
  }
}

export function* newIssues({ data }) {
  try {
    const navigationStore = yield select((store) => store.navigation.navigation);
    yield call(api.post, '/issues', data);

    NotificationManager.success(
      'Chamado criado com sucesso',
      'Chamado',
    );

    if (navigationStore) {
      navigationStore.push('/app');
    }

    return yield put(ClientActions.createIssuesSuccess());
  } catch (error) {
    return yield put(ClientActions.loadingCancel());
  }
}

export function* passwordResetRequest({ data }) {
  try {
    yield call(api.post, '/client/reset-password', data);

    yield put(ClientActions.setLoginModalStatus(false));

    yield put(ClientActions.setRecoveryPasswordModal({
      status: true,
      step: 1,
    }));

    return yield put(ClientActions.resetPasswordSuccess());
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        NotificationManager.error(
          'CPF/CNPJ ou EMAIL estão incorreto',
          'Login',
        );
      }
    }
    return yield put(ClientActions.loadingCancel());
  }
}

export function* newPassword({ data }) {
  try {
    const navigationStore = yield select((store) => store.navigation.navigation);
    yield call(api.put, `/client/new-password/${data.userId}`, data);

    navigationStore.push('/app');
    return yield put(ClientActions.newPasswordSuccess());
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        NotificationManager.error(
          'CPF/CNPJ ou EMAIL estão incorreto',
          'Login',
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

    navigation.push(`/app?${queryV ? `v=${queryV}&` : ''}${queryO ? `o=${queryO}` : ''}`);
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
