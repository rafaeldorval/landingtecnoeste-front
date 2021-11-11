/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unknown-property */
import React from 'react';
import NumberFormat from 'react-number-format';
import BannerOil from '../../assets/images/banneroil.png';
import formPagamento from './formPagamento';
import { formatFloat, handleParcelaValuePecas } from '../../utils/formaters';
import './style.css';

function Banner({
  totalPrice,
  handleClientData,
  clientData,
  finishOrcamento,
  totalPriceFator,
  handleFormPgt,
  codFormaPgm,
}) {
  return (
    <div className="min-w-screen p-4 background-banner md:h-3/4 flex items-center justify-center flex-col md:flex-row">
      <div className="md:flex-1 md:h-full flex flex-col items-center justify-center md:items-end">
        <img className="md:w-3/5 w-11/12" src={BannerOil} alt="product banner" />
        <p className="text-4xl md:text-5xl font-bold text-white w-full md:w-auto">Melhore o<br />desempenho das<br />suas máquinas!</p>
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
        {totalPrice > 0 && (
          <section className="w-full md:w-10/12 flex items-center justify-center flex-col mt-2 mb-2">
            <label for="inp-formpagamento" className="text-white w-full md:w-8/12 text-left">Forma pagamento:</label>
            <select
              id="inp-formpagamento"
              value={codFormaPgm}
              onChange={({ target }) => handleFormPgt(target.value)}
              className="w-full md:w-8/12 rounded-3xl h-10 px-4"
            >
              {/* {formPagamento.map((pgt) => (
                <option key={pgt.CODIGO} value={pgt.CODIGO}>{pgt.DESCRICAO}</option>
              ))} */}
              {formPagamento.filter((row) => (row.LIMITEINFE ? totalPriceFator >= row.LIMITEINFE : true)).map((pgt) => (
                <option key={pgt.CODIGO} value={pgt.CODIGO}>
                  {handleParcelaValuePecas(pgt, totalPrice)}
                </option>
              ))}
            </select>
          </section>
        )}
        <button
          type="button"
          className="bg-secondary w-full md:w-2/5 h-12 rounded-3xl mt-2 mb-4"
          onClick={() => finishOrcamento()}
        >
          <h4 className="text-base lg:text-lg font-bold uppercase">Receber ORÇAMENTO</h4>
        </button>
        {totalPrice > 0 && (
          <h4 className="bg-black rounded-xl px-5 border border-secondary py-2 text-secondary border-dashed text-3xl font-bold uppercase">Total: R$ {formatFloat(totalPriceFator).toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h4>
        )}
      </div>
    </div>
  );
}

export default Banner;
