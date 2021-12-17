/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ClientActions from '../../store/ducks/client';
import ModalComponent from '../ModalComponent';

// import { Container } from './styles';

export default function LoginModal() {
  const dispatch = useDispatch();
  const loginModal = useSelector((store) => store.client.loginModalStatus);
  const recoveryPasswordModal = useSelector((store) => store.client.recoveryPasswordModal);

  const [userData, setUserData] = useState({
    docEmail: '',
    senha: '',
  });

  function handleUserLogin() {
    return dispatch(ClientActions.userLoginRequest(userData));
  }

  return (
    <div className="">
      {/* Versçao mobile */}
      <div className="flex md:hidden">
        {window.matchMedia('(min-width:768px)').matches ? (
          <ModalComponent
            openState={loginModal}
            closeAction={() => dispatch(ClientActions.setLoginModalStatus(!loginModal))}
            width="40%"
            height="60%"
          >
            <div className="flex flex-col justify-center items-center w-full h-full py-4 px-2">
              <div className="flex flex-col items-center justify-center w-8/12">
                <h3 className="font-semibold mb-4 text-2xl">Login</h3>
                <section className="flex flex-col items-start w-full">
                  <span>Email ou CPF/CNPJ</span>
                  <input
                    value={userData.docEmail}
                    onChange={({ target }) => setUserData({ ...userData, docEmail: target.value })}
                    className="w-full h-10 p-4 rounded-l border border-primary"
                  />
                </section>
                <section className="flex flex-col items-start w-full">
                  <span>Senha</span>
                  <input
                    type="password"
                    value={userData.senha}
                    onChange={({ target }) => setUserData({ ...userData, senha: target.value })}
                    className="w-full h-10 p-4 rounded-l border border-primary"
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
              </div>
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
          </ModalComponent>
        ) : (
          <ModalComponent
            openState={loginModal}
            closeAction={() => dispatch(ClientActions.setLoginModalStatus(!loginModal))}
            width="90%"
            height="60%"
          >
            <div className="flex flex-col justify-center h-full py-4 px-2">
              <div className="flex flex-col items-center">
                <h3 className="font-semibold mb-4">Login</h3>
                <section className="w-full">
                  <span>Email ou CPF/CNPJ</span>
                  <input
                    value={userData.docEmail}
                    onChange={({ target }) => setUserData({ ...userData, docEmail: target.value })}
                    className="w-full md:w-6/12 h-10 p-4 rounded-l border border-primary"
                  />
                </section>
                <section className="w-full">
                  <span>Senha</span>
                  <input
                    type="password"
                    value={userData.senha}
                    onChange={({ target }) => setUserData({ ...userData, senha: target.value })}
                    className="w-full md:w-6/12 h-10 p-4 rounded-l border border-primary"
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
                  `}
                  type="button"
                >
                  <p className="font-bold text-xl">Entrar</p>
                </button>
              </div>
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
                <Link to="/">
                  <h3 className="flex flex-row">
                    Novo usuário?<h3 className="font-bold text-secondaryDark ml-2">Cadastre-se aqui</h3>
                  </h3>
                </Link>
              </div>
            </div>
          </ModalComponent>
        )}
      </div>
    </div>
  );
}
