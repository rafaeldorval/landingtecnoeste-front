/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import ClientActions from '../../store/ducks/client';
import NavigationActions from '../../store/ducks/navigation';
import { useQuery } from '../../hooks/useQuery';
import Header from '../../components/Header';

// import { Container } from './styles';

export default function RecoveryPassword() {
  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();
  const invalidRecoveryPasswordToken = useSelector(
    (store) => store.client.invalidRecoveryPasswordToken,
  );

  const clientLoading = useSelector(
    (store) => store.client.loading,
  );

  const [senhaData, setSenhaData] = useState({
    senha: '',
    senhaConfirm: '',
  });

  useEffect(() => {
    const tokenRecovery = query.get('token');
    const userId = query.get('user');

    dispatch(NavigationActions.setNavigation(history));

    if (!tokenRecovery && !userId) {
      return dispatch(ClientActions.setInvalidRecoveryPasswordToken(true));
    }

    dispatch(ClientActions.passwordTokenVerifyRequest({
      token: tokenRecovery,
      userId,
    }));
  }, []);

  function handleNewPassword() {
    const userId = query.get('user');

    if (!senhaData.senha || !senhaData.senhaConfirm) {
      return NotificationManager.error(
        'Preencha todos os campos para continuar',
        'Recuperação de Senha',
      );
    }

    if (senhaData.senha !== senhaData.senhaConfirm) {
      return NotificationManager.error(
        'As senhas não são iguais, verifique e tente novamente',
        'Recuperação de Senha',
      );
    }

    return dispatch(ClientActions.newPasswordRequest({
      senha: senhaData.senha,
      userId,
    }));
  }

  return (
    <div className="w-full">
      <Header showUserAction={false} stickOff />
      {invalidRecoveryPasswordToken ? (
        <div className="flex flex-col items-center justify-center h-full mt-12">
          <div className="flex flex-col items-center bg-white p-12 shadow-lg w-2/3 h-1/3">
            <h3 className="font-bold text-3xl">Token de verificação invalido</h3>
            <p className="font-thin text-xl mt-2">O token informado é invalido, ou esta vencido, solicite outro novamente.</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full mt-12">
          <div className="flex flex-col items-center bg-white p-12 shadow-lg w-2/3 h-1/3">
            <h3 className="font-bold text-2xl">Recuperar Senha</h3>
            <span className="font-thin mt-2 mb-4">Digite sua nova senha</span>
            <section className="w-2/3 flex flex-col items-center">
              <input
                placeholder="Senha"
                type="password"
                value={senhaData.senha}
                onChange={({ target }) => setSenhaData({ ...senhaData, senha: target.value })}
                className="
                  w-full
                  h-10
                  mb-4
                  border-b
                  border-primary
                  outline-none
                  focus:border-b
                  focus:border-secondaryDark
                "
              />
              <input
                placeholder="Confirmar Senha"
                type="password"
                value={senhaData.senhaConfirm}
                onChange={({ target }) => setSenhaData({
                  ...senhaData,
                  senhaConfirm: target.value,
                })}
                className="
                  w-full
                  h-10
                  mb-4
                  border-b
                  border-primary
                  outline-none
                  focus:border-b
                  focus:border-secondaryDark
                "
              />
              <button
                onClick={() => handleNewPassword()}
                disabled={clientLoading}
                className={`
                  bg-secondary
                  py
                  px-8
                  rounded
                  mt-4
                  flex
                  flex-row
                  align-center
                  justify-center
                  border-2
                  w-3/4
                `}
                type="button"
              >
                <p className="font-bold text-xl">
                  {clientLoading ? 'Carregando...' : 'Continuar'}
                </p>
              </button>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
