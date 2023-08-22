import React, { useEffect, useState } from 'react';
import { NotificationManager } from 'react-notifications';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import NavigationActions from '../../store/ducks/navigation';
import ClientActions from '../../store/ducks/client';
import Header from '../../components/Header';
import RecoveryPasswordModal from '../../components/RecoveryPasswordModal';
// import { Container } from './styles';

export default function ClientAcess() {
  const dispatch = useDispatch();
  const history = useHistory();
  const recoveryPasswordModal = useSelector((store) => store.client.recoveryPasswordModal);
  const [userData, setUserData] = useState({
    docEmail: '',
    senha: '',
  });

  const [visitanteData, setVisitanteData] = useState({
    nome: '',
    telefone: '',
    email: '',
  });

  useEffect(() => {
    dispatch(NavigationActions.setNavigation(history));
  }, []);

  function handleUserLogin() {
    if (!userData.docEmail || !userData.senha) {
      NotificationManager.warning(
        'Os dois campos são obrigatorios',
        'Login',
      );
    }
    return dispatch(ClientActions.userLoginRequest(userData, '/app/checkout'));
  }

  function handleVisitClient() {
    if (!visitanteData.nome || !visitanteData.telefone || !visitanteData.email) {
      NotificationManager.warning(
        'Todos os campos são obrigatorios',
        'Visitante',
      );

      return null;
    }
    history.push('/app/checkout');
    return dispatch(ClientActions.setClientData(visitanteData));
  }

  return (
    <div className="w-full bg-background h-screen flex flex-col">
      <Header showUserAction={false} stickOff />
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div className="w-11/12 md:w-8/12 h-full md:h-4/6 bg-white flex flex-col md:flex-row shadow-md p-4">
          <div className="w-full md:w-6/12 mb-4 pb-4 md:mb-0 md:pb-0 flex flex-col items-center justify-center md:border-r sm:border-b">
            <h3 className="font-semibold mb-4 text-2xl">Login</h3>
            <section className="flex flex-col items-start w-9/12">
              <input
                placeholder="Email ou CPF/CNPJ"
                value={userData.docEmail}
                onChange={({ target }) => setUserData({ ...userData, docEmail: target.value })}
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
            </section>
            <section className="flex flex-col items-start w-9/12">
              <input
                placeholder="Senha"
                type="password"
                value={userData.senha}
                onChange={({ target }) => setUserData({ ...userData, senha: target.value })}
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
            </section>
            <button
              onClick={() => handleUserLogin()}
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
              <p className="font-bold text-xl">Entrar</p>
            </button>
            <div className="mt-8">
              <button
                type="button"
                onClick={() => dispatch(ClientActions.setRecoveryPasswordModal({
                  status: !recoveryPasswordModal.status,
                  step: 0,
                }))}
              >
                <h3 className="font-bold text-secondaryDark">Esqueci minha SENHA</h3>
              </button>
              <Link to="/app/user/register">
                <h3 className="flex flex-row">
                  Novo usuário?<h3 className="font-bold text-secondaryDark ml-2">Cadastre-se aqui</h3>
                </h3>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-6/12 flex flex-col items-center justify-center">
            <h3 className="font-semibold mb-4 text-2xl">Ou continuar como visitante</h3>
            <section className="flex flex-col items-start w-9/12">
              <input
                placeholder="Nome"
                value={visitanteData.nome}
                onChange={({ target }) => setVisitanteData({
                  ...visitanteData,
                  nome: target.value,
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
            </section>
            <section className="flex flex-col items-start w-9/12">
              <NumberFormat
                placeholder="Telefone"
                format="(##) #####-####"
                mask="_"
                type="string"
                value={visitanteData.telefone}
                onValueChange={(target) => setVisitanteData({
                  ...visitanteData,
                  telefone: target.value,
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
            </section>
            <section className="flex flex-col items-start w-9/12">
              <input
                placeholder="Email"
                value={visitanteData.email}
                onChange={({ target }) => setVisitanteData({
                  ...visitanteData,
                  email: target.value,
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
            </section>
            <button
              onClick={() => handleVisitClient()}
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
              <p className="font-bold text-xl">Continuar</p>
            </button>
          </div>
        </div>
      </div>
      <RecoveryPasswordModal />
    </div>
  );
}
