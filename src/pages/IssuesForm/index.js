/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import ClientActions from '../../store/ducks/client';
import NavigationActions from '../../store/ducks/navigation';
import Header from '../../components/Header';

// import { Container } from './styles';

export default function IssuesForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const clientLoading = useSelector(
    (store) => store.client.loading,
  );

  const [formData, setFormData] = useState({
    nome: '',
    celular: '',
    email: '',
    titulo: 'Não tenho acesso ao meu Email cadastrado',
    mensagem: '',
  });

  useEffect(() => {
    dispatch(NavigationActions.setNavigation(history));
  }, []);

  function handleNewIssues() {
    if (
      !formData.nome
      || !formData.celular
      || !formData.titulo
      || !formData.mensagem
    ) {
      return NotificationManager.error(
        'Preencha todos os campos para continuar',
        'Problemas no login',
      );
    }

    return dispatch(ClientActions.createIssuesRequest(formData));
  }

  return (
    <div className="w-full">
      <Header showUserAction={false} stickOff />
      <div className="flex flex-col items-center justify-center h-full mt-12">
        <div className="flex flex-col items-center bg-white p-12 shadow-lg w-full md:w-2/3 h-1/3">
          <h3 className="font-bold text-2xl">Estou com dificuldade no login</h3>
          <span className="font-thin mt-2 mb-4">Preencha o formulario abaxio, todos os campos com (*) são obrigatorios.</span>
          <section className="w-full md:w-2/3 flex flex-col items-center">
            <input
              placeholder="Nome*"
              value={formData.nome}
              onChange={({ target }) => setFormData({
                ...formData,
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
            <NumberFormat
              placeholder="Celular*"
              type="string"
              format="(##) #####-####"
              mask="_"
              value={formData.celular}
              onValueChange={(target) => {
                setFormData({ ...formData, celular: target.value });
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
            <input
              placeholder="Email"
              value={formData.email}
              onChange={({ target }) => setFormData({
                ...formData,
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
            <select
              placeholder="Titulo*"
              value={formData.titulo}
              onChange={({ target }) => setFormData({
                ...formData,
                titulo: target.value,
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
            >
              <option value="Não tenho acesso ao meu Email cadastrado">
                Não tenho acesso ao meu Email cadastrado
              </option>
              <option value="Não recebi o email de confirmação">
                Não recebi o email de confirmação
              </option>
              <option value="Outros">
                Outros
              </option>
            </select>
            <textarea
              placeholder="Mensagem"
              rows={8}
              value={formData.mensagem}
              onChange={({ target }) => setFormData({
                ...formData,
                mensagem: target.value,
              })}
              className="
                w-full
                h-18
                mb-4
                mt-4
                border-b
                resize-none
                border-primary
                outline-none
                focus:border-b
                focus:border-secondaryDark
              "
            />
            <button
              onClick={() => handleNewIssues()}
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
    </div>
  );
}
