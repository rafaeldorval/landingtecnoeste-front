/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unknown-property */
import React from 'react';
import NumberFormat from 'react-number-format';
import './style.css';

function Banner({
  handleClientData,
  clientData,
  finishOrcamento,
}) {
  return (
    <div className="min-w-screen p-4 background-banner md:h-3/4 flex items-center justify-center flex-col">
      <div className="flex-1 h-full mt-4 flex items-center justify-center flex-col md:pr-20">
        <h3 className="text-3xl font-bold text-secondary text-center w-full md:w-10/12">ESSA PROMOÇÃO FOI ATÉ 30/09/2021</h3>
        <h3 className="text-3xl font-bold text-white text-center w-full md:w-8/12">Mas deixe seu cadastro para receber as novas promoões</h3>
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
          <h4 className="text-base lg:text-lg font-bold uppercase">Cadastrar</h4>
        </button>
      </div>
    </div>
  );
}

export default Banner;
