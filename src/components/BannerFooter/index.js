/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unknown-property */
import React from 'react';
import NumberFormat from 'react-number-format';
import './style.css';

function BannerFooter({
  handleClientData,
  clientData,
  finishOrcamento,
}) {
  return (
    <div className="min-w-screen background-banner md:h-3/4 flex flex-col items-center justify-center w-full">
      <div className="flex items-center justify-center flex-col md:flex-row h-11/12 w-full p-4">
        <div className="md:flex-1 md:h-full flex flex-col items-center justify-center md:items-start ml-0 md:ml-20">
          <h3 className="text-secondary font-semibold text-2xl">COMPACTADORES DE SOLO</h3>
          <h3 className="text-white font-bold text-6xl my-2">VOLVO SD110B</h3>
        </div>
        <div className="flex-1 h-full mt-4 flex items-center justify-center flex-col md:pr-20">
          <h3 className="text-3xl font-bold text-white w-full md:w-8/12">Preencha o formulário para receber o seu orçamento:</h3>
          <section className="w-full md:w-10/12 flex items-center justify-center flex-col mt-2 mb-2">
            <label for="inp-name" className="text-white w-full md:w-8/12 text-left">Nome:</label>
            <input
              id="inp-name"
              value={clientData.nome}
              onChange={({ target }) => handleClientData(target.value, 'nome')}
              type="text"
              className="w-full md:w-8/12 rounded-3xl h-10 p-4"
            />
          </section>
          <section className="w-full md:w-10/12 flex items-center justify-center flex-col mt-2 mb-2">
            <label for="inp-email" className="text-white w-full md:w-8/12 text-left">Email:</label>
            <input
              id="inp-email"
              value={clientData.email}
              onChange={({ target }) => handleClientData(target.value, 'email')}
              type="text"
              className="w-full md:w-8/12 rounded-3xl h-10 p-4"
            />
          </section>
          <section className="w-full md:w-10/12 flex items-center justify-center flex-col mt-2 mb-2">
            <label for="inp-telefone" className="text-white w-full md:w-8/12 text-left">Telefone:</label>
            <NumberFormat
              format="(##) #####-####"
              mask="_"
              className="w-full md:w-8/12 rounded-3xl h-10 p-4"
              value={clientData.telefone}
              onChange={({ target }) => handleClientData(target.value, 'telefone')}
            />
          </section>
          <button
            type="button"
            className="bg-secondary w-full md:w-2/5 h-12 rounded-3xl mt-2 mb-4"
            onClick={() => finishOrcamento()}
          >
            <h4 className="text-base lg:text-lg font-bold uppercase">Receber ORÇAMENTO</h4>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BannerFooter;
