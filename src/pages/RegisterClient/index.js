/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import NumberFormat from 'react-number-format';
import NavigationActions from '../../store/ducks/navigation';
import ClientActions from '../../store/ducks/client';
import './style.css';
// import { Container } from './styles';

export default function RegisterClient({ history }) {
  const dispatch = useDispatch();
  const registerFormStep = useSelector((store) => store.client.registerFormStep);
  const clientLoading = useSelector((store) => store.client.loading);
  const [maskDoc, setMaskDoc] = useState('###.###.###-##');
  const [clientDataForm, setClientDataForm] = useState({
    doc: '',
    nome: '',
    apelido: '',
    email: '',
    telefone: '',
    celular: '',
    senha: '',
    senhaConfirm: '',
  });

  const [addressData, setAddressData] = useState({
    rua: '',
    cep: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
  });

  useEffect(() => {
    dispatch(NavigationActions.setNavigation({ ...history }));
  }, []);

  const handleClientData = (name) => ({ target }) => setClientDataForm({
    ...clientDataForm, [name]: target.value,
  });

  const handleAddressData = (name) => ({ target }) => setAddressData({
    ...addressData, [name]: target.value,
  });

  function handleForm(action) {
    if (action === '+') {
      if (registerFormStep === 0) {
        if (!clientDataForm.doc) {
          return NotificationManager.error(
            'Preencha seu CPF/CNPJ para continuar',
            'Novo cliente',
          );
        }
        return dispatch(ClientActions.verifyClientExistRequest(clientDataForm));
      }
      if (registerFormStep === 1) {
        if (!clientDataForm.doc
            || !clientDataForm.nome
            || !clientDataForm.nome
            || !clientDataForm.email
            || !clientDataForm.celular
        ) {
          return NotificationManager.error(
            'Todos os campos com (*) são obrigatorios',
            'Novo cliente',
          );
        }
      }
      if (registerFormStep === 2) {
        if (!addressData.cep
          || !addressData.rua
          || !addressData.numero
          || !addressData.estado
          || !addressData.cidade
        ) {
          return NotificationManager.error(
            'Todos os campos com (*) são obrigatorios',
            'Novo cliente',
          );
        }
      }
      if (registerFormStep === 3) {
        const { senha, senhaConfirm, ...restClientData } = clientDataForm;
        if (senha !== senhaConfirm) {
          return NotificationManager.error(
            'As senhas informadas não são iguais, verifique e tente novamente',
            'Novo cliente',
          );
        }
        const finishData = {
          ...restClientData,
          senha,
          logradouro: addressData,
        };
        return dispatch(ClientActions.createClientRequest(finishData));
      }
      return dispatch(ClientActions.setRegisterFormStep(registerFormStep + 1));
    }
    if (action === '-') {
      if (registerFormStep === 0) {
        return null;
      }
      return dispatch(ClientActions.setRegisterFormStep(registerFormStep - 1));
    }

    return null;
  }

  async function handleZip() {
    const zip = addressData.cep.replace('-', '');
    const { data } = await axios.get(`https://viacep.com.br/ws/${zip}/json/`);

    return setAddressData({
      ...addressData,
      rua: data.logradouro,
      bairro: data.bairro,
      cidade: data.localidade,
      estado: data.uf,
    });
  }

  return (
    <div className="w-full h-screen flex flex-row">
      <div className="hidden md:flex bg-gray-400 w-1/2 background-banner" />
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center">
        <div className="w-full h-5/6 flex flex-col items-center justify-between">
          <div className="w-10/12 md:w-8/12">
            <h3 className="font-semibold text-2xl text-primary">Cadastro</h3>
            <h3 className="font-light text-primary mb-8">Os campos marcados com (*) são obrigatórios</h3>
            {registerFormStep <= 1 && (
              <NumberFormat
                placeholder="CPF ou CNPJ*"
                type="string"
                format={maskDoc}
                mask="_"
                value={clientDataForm.doc}
                onChange={(e) => {
                  if (clientDataForm.doc.length === 11) {
                    setMaskDoc('##.###.###/####-##');
                  }

                  if (clientDataForm.doc.length < 11) {
                    setMaskDoc('###.###.###-##');
                  }
                }}
                onValueChange={(target) => {
                  setClientDataForm({ ...clientDataForm, doc: target.value });
                }}
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
            )}
            {registerFormStep === 1 && (
              <section>
                <input
                  placeholder={clientDataForm.doc.length <= 11 ? 'Nome*' : 'Razão social*'}
                  value={clientDataForm.nome}
                  onChange={handleClientData('nome')}
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
                  placeholder={clientDataForm.doc.length <= 11 ? 'Apelido' : 'Nome Fantasia'}
                  value={clientDataForm.apelido}
                  onChange={handleClientData('apelido')}
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
                  placeholder="Email*"
                  value={clientDataForm.email}
                  onChange={handleClientData('email')}
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
                <NumberFormat
                  placeholder="Celular*"
                  type="string"
                  format="(##) #####-####"
                  mask="_"
                  value={clientDataForm.celular}
                  onValueChange={(target) => {
                    setClientDataForm({ ...clientDataForm, celular: target.value });
                  }}
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
                <NumberFormat
                  placeholder="Telefone"
                  type="string"
                  format="(##) ####-####"
                  mask="_"
                  value={clientDataForm.telefone}
                  onValueChange={(target) => {
                    setClientDataForm({ ...clientDataForm, telefone: target.value });
                  }}
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
            )}
            {registerFormStep === 2 && (
              <section>
                <input
                  placeholder="CEP*"
                  value={addressData.cep}
                  onBlur={() => handleZip()}
                  onChange={handleAddressData('cep')}
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
                <section className="flex flex-row items-center justify-between">
                  <input
                    placeholder="Rua*"
                    value={addressData.rua}
                    onChange={handleAddressData('rua')}
                    className="
                      w-9/12
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
                    placeholder="Numero*"
                    value={addressData.numero}
                    onChange={handleAddressData('numero')}
                    className="
                        w-2/12
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
                <section className="flex flex-row items-center justify-between">
                  <input
                    placeholder="Cidade*"
                    value={addressData.cidade}
                    onChange={handleAddressData('cidade')}
                    className="
                      w-9/12
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
                    placeholder="Estado*"
                    value={addressData.estado}
                    onChange={handleAddressData('estado')}
                    className="
                      w-2/12
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
                <input
                  placeholder="Bairro"
                  value={addressData.bairro}
                  onChange={handleAddressData('bairro')}
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
            )}
            {registerFormStep === 3 && (
              <section>
                <input
                  placeholder="Senha"
                  type="password"
                  value={clientDataForm.senha}
                  onChange={handleClientData('senha')}
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
                  placeholder="Confirme sua senha"
                  type="password"
                  value={clientDataForm.senhaConfirm}
                  onChange={handleClientData('senhaConfirm')}
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
            )}
          </div>
          <div className="w-full flex flex-col items-center">
            <button
              onClick={() => handleForm('+')}
              disabled={clientLoading}
              className={`
                bg-secondary
                py-2
                px-8
                rounded
                mb-4
                flex
                flex-row
                align-center
                justify-center
                border-2
                w-7/12
              `}
              type="button"
            >
              <p className="font-bold text-xl">
                {clientLoading ? 'Carregando' : (registerFormStep <= 2 && 'Continuar')}
                {registerFormStep === 3 && 'Finalizar cadastro'}
              </p>
              <IoIosArrowForward size={32} />
            </button>
            {registerFormStep > 0 && (
              <button
                onClick={() => handleForm('-')}
                className={`
                  border-primary
                  py
                  px-8
                  rounded
                  flex
                  flex-row
                  align-center
                  justify-center
                  border-2
                  w-3/12
                `}
                type="button"
              >
                <IoIosArrowBack size={25} />
                <p className="font-bold">Voltar</p>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
