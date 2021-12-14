import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
// import { Container } from './styles';

export default function ClientAcess() {
  const [userData, setUserData] = useState({
    docEmail: '',
    senha: '',
  });

  const [visitanteData, setVisitanteData] = useState({
    nome: '',
    telefone: '',
    email: '',
  });

  return (
    <div className="w-full bg-background h-screen flex flex-col">
      <Header showUserAction={false} stickOff />
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div className="w-8/12 h-4/6 bg-white flex flex-row shadow-md p-4">
          <div className="w-6/12 flex flex-col items-center justify-center border-r">
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
              onClick={() => {}}
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
              <Link to="/">
                <h3 className="font-bold text-secondaryDark">Esqueci minha SENHA</h3>
              </Link>
              <Link to="/user/register">
                <h3 className="flex flex-row">
                  Novo usuário?<h3 className="font-bold text-secondaryDark ml-2">Cadastre-se aqui</h3>
                </h3>
              </Link>
            </div>
          </div>
          <div className="w-6/12 flex flex-col items-center justify-center">
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
              onClick={() => {}}
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
    </div>
  );
}
