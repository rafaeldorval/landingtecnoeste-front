/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import PecasAction from '../../../store/ducks/pecas';
import ClientActions from '../../../store/ducks/client';
// import { Container } from './styles';

export default function DeliveryAddress() {
  const dispatch = useDispatch();
  const clientData = useSelector((store) => store.client.clientData);
  const addressLojaSelected = useSelector((store) => store.pecas.lojaAddress);
  const [deliverySelected, setDeliverySelected] = useState('loja');
  const [addressData, setAddressData] = useState({
    rua: '',
    cep: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
  });

  useEffect(() => {
    if (clientData && clientData.logradouro) {
      setAddressData(clientData.logradouro);
    }
  }, []);

  const handleAddressData = (name) => ({ target }) => setAddressData({
    ...addressData, [name]: target.value,
  });

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

  function handleDeliveryData() {
    if (deliverySelected === 'clienteEndereco') {
      if (!addressData.rua
        || !addressData.cep
        || !addressData.numero
        || !addressData.cidade
        || !addressData.estado
      ) {
        return NotificationManager.error(
          'Todos os campos com (*) são obrigatorios',
          'Novo cliente',
        );
      }
    }

    const deliveryData = {
      tipo: deliverySelected,
      logradouro: deliverySelected === 'loja' ? addressLojaSelected : addressData,
    };
    dispatch(PecasAction.setCartStep(4));
    return dispatch(ClientActions.setDeliveryData(deliveryData));
  }

  return (
    <div className="flex flex-col md:flex-row md:justify-between mt-8">
      <div className="flex my-4 md:my-0 flex-col w-full md:w-4/12 shadow px-2 md:p-4 bg-white">
        <h3 className="font-bold text-xl">Selecione uma opção de entrega</h3>
        <div className="mt-8">
          <section className="flex flex-row items-center mb-2">
            <input
              type="radio"
              id="loja"
              value="loja"
              className="mr-2"
              checked={deliverySelected === 'loja'}
              onClick={() => setDeliverySelected('loja')}
            />
            <label htmlFor="html">Retirar na loja</label>
          </section>
          <section className="flex flex-row items-center">
            <input
              type="radio"
              id="clienteEndereco"
              value="clienteEndereco"
              className="mr-2"
              checked={deliverySelected === 'clienteEndereco'}
              onClick={() => setDeliverySelected('clienteEndereco')}
            />
            <label htmlFor="html">Entregar no meu endereço</label>
          </section>
        </div>
      </div>
      {deliverySelected === 'loja' && (
        <div className="flex my-4 md:my-0 flex-col w-full md:w-7/12 shadow px-2 md:p-4 bg-white">
          <h3 className="font-bold text-xl">Loja selecionada</h3>
          <div className="mt-8 flex flex-col items-center">
            <section className="w-full flex flex-col items-start mb-2">
              <h3 className="font-bold">Tecnoeste {addressLojaSelected.cidade}</h3>
              <h3>{addressLojaSelected.rua}, {addressLojaSelected.numero}
                {' '}- {addressLojaSelected.estado}
              </h3>
              <h3>Atendimento das 07:30 11:30 - 13:00 17:30</h3>
              <h3>Segunda a Sexta</h3>
            </section>
            <button
              onClick={() => handleDeliveryData()}
              className={`
                bg-secondary
                border-secondary
                text-black
                py-2
                px-8
                rounded
                mt-2
                mb-4
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
        </div>
      )}
      {deliverySelected === 'clienteEndereco' && (
        <div className="flex my-4 md:my-0 flex-col w-full md:w-7/12 shadow px-2 md:p-4 bg-white">
          <h3 className="font-bold text-xl">Confirme o endereço</h3>
          <h3 className="font-thin text-md">Todos os campos com (*) são obrigatorios</h3>
          <div className="mt-8 flex flex-col items-center">
            <section className="w-full p-4 md:p-0">
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
                    capitalize
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
                      capitalize
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
                        capitalize
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
                      capitalize
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
                      capitalize
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
                    capitalize
                    outline-none
                    focus:border-b
                    focus:border-secondaryDark
                  "
              />
            </section>
            <button
              onClick={() => handleDeliveryData()}
              className={`
                bg-secondary
                border-secondary
                text-black
                py-2
                px-8
                rounded
                mt-2
                mb-4
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
        </div>
      )}
    </div>
  );
}
