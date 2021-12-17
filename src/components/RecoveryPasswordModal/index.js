/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ClientActions from '../../store/ducks/client';
import ModalComponent from '../ModalComponent';

// import { Container } from './styles';

export default function RecoveryPasswordModal() {
  const dispatch = useDispatch();
  const clientLoading = useSelector((store) => store.client.loading);
  const recoveryPasswordModal = useSelector((store) => store.client.recoveryPasswordModal);

  const [userData, setUserData] = useState({
    docEmail: '',
  });

  function handleRecoveryPassword() {
    return dispatch(ClientActions.resetPasswordRequest(userData));
  }

  return (
    <div className="">
      {/* Versçao mobile */}
      <div className="flex md:hidden">
        {window.matchMedia('(min-width:768px)').matches ? (
          <ModalComponent
            openState={recoveryPasswordModal.status}
            closeAction={() => dispatch(ClientActions.setRecoveryPasswordModal({
              status: !recoveryPasswordModal.status,
              step: 0,
            }))}
            width="40%"
            height="60%"
          >
            {recoveryPasswordModal.step === 0 && (
              <div className="flex flex-col justify-center items-center w-full h-full py-4 px-2">
                <div className="flex flex-col items-center justify-center w-8/12">
                  <h3 className="font-semibold text-xl">Recuperação de Senha</h3>
                  <span className="mb-8 mt-4 text-center">Digite seu EMAIL ou CPF/CNPJ, e em alguns minutos, enviaremos para o EMAIL cadastrado, um link para recuperação de senha.</span>
                  <section className="flex flex-col items-start w-full">
                    <span>Email ou CPF/CNPJ</span>
                    <input
                      value={userData.docEmail}
                      onChange={({ target }) => setUserData({
                        ...userData,
                        docEmail: target.value,
                      })}
                      className="w-full h-10 p-4 rounded-l border border-primary"
                    />
                  </section>
                  <button
                    onClick={() => handleRecoveryPassword()}
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
                      {clientLoading ? 'Carregando' : 'Continuar'}
                    </p>
                  </button>
                </div>
                <div className="mt-8">
                  <Link to="/app/issues-form">
                    <h3 className="font-bold text-secondaryDark text-center">Não tenho mais acesso ao EMAIL cadastrado.</h3>
                  </Link>
                </div>
              </div>
            )}
            {recoveryPasswordModal.step === 1 && (
            <div className="flex flex-col justify-center items-center w-full h-full py-4 px-2">
              <div className="flex flex-col items-center justify-center w-8/12">
                <h3 className="font-semibold text-xl">Recuperação de Senha</h3>
                <span className="mb-8 mt-4 text-center">Tudo certo, em breve enviaremos um email com os passos para recuperar sua senha.</span>
                <button
                  onClick={() => dispatch(ClientActions.setRecoveryPasswordModal({
                    status: !recoveryPasswordModal.status,
                    step: 0,
                  }))}
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
                  <p className="font-bold text-xl">Finalizar</p>
                </button>
              </div>
              <div className="mt-8">
                <Link to="/app/issues-form">
                  <h3 className="font-bold text-secondaryDark text-center">Não tenho mais acesso ao EMAIL cadastrado.</h3>
                </Link>
              </div>
            </div>
            )}
          </ModalComponent>
        ) : (
          <ModalComponent
            openState={recoveryPasswordModal.status}
            closeAction={() => dispatch(ClientActions.setRecoveryPasswordModal({
              status: !recoveryPasswordModal.status,
              step: 0,
            }))}
            width="90%"
            height="60%"
          >
            {recoveryPasswordModal.step === 0 && (
              <div className="flex flex-col justify-center h-full py-4 px-2">
                <div className="flex flex-col items-center">
                  <h3 className="font-semibold text-xl">Recuperação de Senha</h3>
                  <span className="mb-8 mt-4 text-center">Digite seu EMAIL ou CPF/CNPJ, e em alguns minutos, enviaremos para o EMAIL cadastrado, um link para recuperação de senha.</span>
                  <section className="w-full">
                    <span>Email ou CPF/CNPJ</span>
                    <input
                      value={userData.docEmail}
                      onChange={({ target }) => setUserData({
                        ...userData,
                        docEmail: target.value,
                      })}
                      className="w-full md:w-6/12 h-10 p-4 rounded-l border border-primary"
                    />
                  </section>
                  <button
                    onClick={() => handleRecoveryPassword()}
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
                    <p className="font-bold text-xl">Continuar</p>
                  </button>
                </div>
                <div className="mt-8">
                  <Link to="/app/issues-form">
                    <h3 className="font-bold text-secondaryDark text-center">Não tenho mais acesso ao EMAIL cadastrado.</h3>
                  </Link>
                </div>
              </div>
            )}
            {recoveryPasswordModal.step === 1 && (
              <div className="flex flex-col justify-center items-center w-full h-full py-4 px-2">
                <div className="flex flex-col items-center justify-center w-8/12">
                  <h3 className="font-semibold text-xl">Recuperação de Senha</h3>
                  <span className="mb-8 mt-4 text-center">Tudo certo, em breve enviaremos um email com os passos para recuperar sua senha.</span>
                  <button
                    onClick={() => handleRecoveryPassword()}
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
                    <p className="font-bold text-xl">Finalizar</p>
                  </button>
                </div>
                <div className="mt-8">
                  <Link to="/app/issues-form">
                    <h3 className="font-bold text-secondaryDark text-center">Não tenho mais acesso ao EMAIL cadastrado.</h3>
                  </Link>
                </div>
              </div>
            )}
          </ModalComponent>
        )}
      </div>
    </div>
  );
}
