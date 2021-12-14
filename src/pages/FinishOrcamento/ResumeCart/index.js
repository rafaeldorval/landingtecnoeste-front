/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import PecasAction from '../../../store/ducks/pecas';
import { formatFloat, handleParcelaValuePecas } from '../../../utils/formaters';

export default function ResumeCart() {
  const dispatch = useDispatch();
  const clientDataStore = useSelector((store) => store.client.clientData);
  const totalPrice = useSelector((store) => store.pecas.totalPrice);
  const totalPriceFator = useSelector((store) => store.pecas.totalPriceFator);
  const formPgmSelected = useSelector((store) => store.pecas.formPgmSelected);
  const pecasLoading = useSelector((store) => store.pecas.loading);

  const [editMode, setEditMode] = useState(false);
  const [clientData, setClientData] = useState({
    nome: '',
    celular: '',
    email: '',
  });

  const [oldClientData, setOldClientData] = useState({
    nome: '',
    celular: '',
    email: '',
  });

  useEffect(() => {
    if (clientDataStore) {
      setClientData({
        cliente_id: clientDataStore._id,
        nome: clientDataStore.nome,
        celular: clientDataStore.celular,
        email: clientDataStore.email,
      });

      setOldClientData({
        cliente_id: clientDataStore._id,
        nome: clientDataStore.nome,
        celular: clientDataStore.celular,
        email: clientDataStore.email,
      });
    }
  }, [clientDataStore]);

  const handleClientData = (name) => ({ target }) => setClientData({
    ...clientData, [name]: target.value,
  });

  function handleEditButton() {
    if (editMode) {
      if (clientDataStore) {
        setClientData({
          nome: oldClientData.nome,
          celular: oldClientData.celular,
          email: oldClientData.email,
        });
      }
      return setEditMode(false);
    }

    setOldClientData({
      nome: clientData.nome,
      celular: clientData.celular,
      email: clientData.email,
    });
    return setEditMode(true);
  }

  function handleFinishPedido() {
    return dispatch(PecasAction.finishOrcamentoRequest({
      ...clientData,
      telefone: clientData.celular,
    }));
  }

  return (
    <div className="flex flex-col md:flex-row md:justify-between mt-8">
      <div className="flex my-4 md:my-0 flex-col w-full shadow md:w-7/12 px-2 md:p-4 bg-white">
        <section className="flex flex-row items-center justify-between mb-8">
          <h3 className="font-bold text-xl">Verifique Seus Dados</h3>
          <button
            type="button"
            className="bg-secondary p-2 border border-black"
            onClick={() => handleEditButton()}
          >
            <AiFillEdit size={22} />
          </button>
        </section>
        {editMode ? (
          <div className="flex flex-col items-center">
            <input
              placeholder="Nome"
              value={clientData.nome}
              onChange={handleClientData('nome')}
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
            <NumberFormat
              placeholder="Celular"
              type="string"
              format="(##) #####-####"
              mask="_"
              value={clientData.celular}
              onValueChange={(target) => {
                setClientData({ ...clientData, celular: target.value });
              }}
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
              placeholder="Email"
              value={clientData.email}
              onChange={handleClientData('email')}
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
            <button
              onClick={() => setEditMode(!editMode)}
              className={`
                bg-secondary
                border-secondary
                text-black
                py-2
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
              <p className="font-bold text-xl">Confirmar</p>
            </button>
          </div>
        ) : (
          <div>
            <section className="flex flex-row items-center justify-between">
              <h3 className="font-semibold text-sm">Nome</h3>
              <h3 className="capitalize font-bold">{clientData.nome}</h3>
            </section>
            <section className="flex flex-row items-center justify-between">
              <h3 className="font-semibold text-sm">Celular</h3>
              <h3 className="font-bold">{clientData.celular}</h3>
            </section>
            <section className="flex flex-row items-center justify-between">
              <h3 className="font-semibold text-sm">Email</h3>
              <h3 className="font-bold">{clientData.email}</h3>
            </section>
          </div>
        )}
      </div>
      <div className="flex flex-col w-full md:w-4/12">
        <div className="shadow px-2 md:p-4 bg-white">
          <h3 className="mb-8 font-bold text-xl">Resumo</h3>
          <section className="flex flex-row items-center justify-between">
            <h3 className="font-semibold text-sm">Subtotal</h3>
            <h3 className="font-bold">R$ {formatFloat(totalPrice, true)}</h3>
          </section>
          <section className="flex flex-row items-center justify-between mb-4">
            <h3 className="font-semibold text-sm text-secondaryDark">Taxa Forma Pagamento</h3>
            <h3 className="font-bold text-secondaryDark">R$ {formatFloat((totalPriceFator - totalPrice), true)}</h3>
          </section>
          <section className="flex flex-col items-start justify-between">
            <h3 className="font-semibold text-sm">Forma de pagamento</h3>
            <h3 className="font-bold">{handleParcelaValuePecas(formPgmSelected, totalPrice)}</h3>
          </section>
        </div>
        <button
          onClick={() => handleFinishPedido()}
          disabled={pecasLoading}
          className={`
              ${pecasLoading ? 'bg-gray-200' : 'bg-secondary'}
              border-secondary
              text-black
              py-2
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
          <p className="font-bold text-xl">{pecasLoading ? 'Carregando' : 'Finalizar pedido'}</p>
        </button>
      </div>
    </div>
  );
}
