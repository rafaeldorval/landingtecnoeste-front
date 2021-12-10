/* eslint-disable no-unused-vars */
import axios from 'axios';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import './style.css';
// import { Container } from './styles';

export default function RegisterClient() {
  const [maskDoc, setMaskDoc] = useState('###.###.###-##');
  const [fullForm, setFullForm] = useState(0);
  const [clientDataForm, setClientDataForm] = useState({
    doc: '',
  });

  const [addressData, setAddressData] = useState({
    street: '',
    zipCode: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    complement: '',
  });

  const handleAddressData = (name) => ({ target }) => setAddressData({
    ...addressData, [name]: target.value,
  });

  async function handleZip() {
    const zip = addressData.zipCode.replace('-', '');
    const { data } = await axios.get(`https://viacep.com.br/ws/${zip}/json/`);

    return setAddressData({
      ...addressData,
      street: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
    });
  }

  return (
    <div className="w-full h-screen flex flex-row">
      <div className="hidden md:flex bg-red-400 w-1/2 background-banner">
        <h3>bg imagem</h3>
      </div>
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center">
        <div className="w-full h-5/6 flex flex-col items-center justify-between">
          <div className="w-10/12 md:w-8/12">
            <h3 className="font-semibold text-2xl text-primary">Cadastro</h3>
            <h3 className="font-light text-primary mb-8">Os campos marcados com (*) são obrigatórios</h3>
            {fullForm <= 1 && (
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
            {fullForm === 1 && (
              <section>
                <input
                  placeholder="Nome"
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
                  placeholder="Apelido"
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
                  placeholder="Celular"
                  type="string"
                  format="(##) #####-####"
                  mask="_"
                  value={clientDataForm.doc}
                // onValueChange={(target) => {
                //   setClientDataForm({ ...clientDataForm, doc: target.value });
                // }}
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
                  value={clientDataForm.doc}
                // onValueChange={(target) => {
                //   setClientDataForm({ ...clientDataForm, doc: target.value });
                // }}
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
            {fullForm === 2 && (
              <section>
                <input
                  placeholder="CEP"
                  value={addressData.zipCode}
                  onBlur={() => handleZip()}
                  onChange={handleAddressData('zipCode')}
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
                    placeholder="Rua"
                    value={addressData.street}
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
                    placeholder="Numero"
                    value={addressData.number}
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
                    placeholder="Cidade"
                    value={addressData.city}
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
                    placeholder="Estado"
                    value={addressData.state}
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
                  value={addressData.neighborhood}
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
              onClick={() => setFullForm(fullForm + 1)}
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
                Continuar
              </p>
              <IoIosArrowForward size={32} />
            </button>
            {fullForm > 0 && (
              <button
                onClick={() => setFullForm(fullForm - 1)}
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
