/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unknown-property */
import React from 'react';
import NumberFormat from 'react-number-format';
import PromoImg from '../../assets/images/novlogo.png';
import formPagamento from './formPagamento';
import { handleParcelaValuePecas } from '../../utils/formaters';
import './style.css';

function Banner({
  totalPrice,
  handleClientData,
  clientData,
  finishOrcamento,
  totalPriceFator,
  handleFormPgt,
  codFormaPgm,
  openCarrinho,
}) {
  return (
    <div className="min-w-screen background-banner md:h-3/4 md:mb-36 flex flex-col items-center justify-center w-full">
      <div className="flex items-center justify-center flex-col md:flex-row h-11/12 w-full p-4">
        <div className="md:flex-1 md:h-full flex flex-col items-center justify-center">
          <img className="md:w-4/5 w-full md:-mr-8" src={PromoImg} alt="product banner" />
          <button
            type="button"
            className="bg-secondary w-full md:w-2/5 h-12 rounded-3xl mt-2 mb-60 md:mb-8"
            onClick={() => openCarrinho()}
          >
            <h4 className="text-base lg:text-lg font-bold uppercase">Ver carrinho</h4>
          </button>
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
          {/* <section className="w-full md:w-10/12 flex items-center justify-center flex-col mt-2 mb-2">
            <label for="inp-formpagamento" className="text-white w-full md:w-8/12 text-left">Escolha a loja de atendimento:</label>
            <select
              id="inp-formpagamento"
              value={clientData.loja}
              onChange={({ target }) => handleClientData(target.value, 'loja')}
              className="w-full md:w-8/12 rounded-3xl h-10 px-4"
            >
              {lojasData.map((loja) => (
                <option key={loja.cod} value={loja.cod}>
                  {loja.nome}
                </option>
              ))}
            </select>
          </section> */}
          <button
            type="button"
            className="bg-secondary w-full md:w-2/5 h-12 rounded-3xl mt-2 mb-60 md:mb-8"
            onClick={() => {
              if (!clientData.nome || !clientData.email || !clientData.telefone) {
                return alert('Todos os campos do formulario são obrigatorios');
              }

              return (totalPrice > 0 ? openCarrinho() : finishOrcamento());
            }}
          >
            <h4 className="text-base lg:text-lg font-bold uppercase">Receber ORÇAMENTO</h4>
          </button>
          {totalPrice > 0 && (
          <h4 className="bg-black rounded-xl px-5 border border-secondary py-2 text-secondary border-dashed text-3xl font-bold uppercase">Total: R$ {totalPriceFator.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h4>
          )}
        </div>
      </div>
    </div>
  );
}

export default Banner;
