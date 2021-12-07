/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { useDispatch, useSelector } from 'react-redux';
import PecasAction from '../../../store/ducks/pecas';

import './style.css';

function Body() {
  const dispatch = useDispatch();
  const pecasLoading = useSelector((state) => state.pecas.loading);

  const [lojaValue, setLojaValue] = useState('0000');

  function handleLojaSelected() {
    if (lojaValue === '0000') {
      return NotificationManager.error(
        'Selecione uma loja para continuar',
        'Black Friday',
      );
    }
    window.scrollTo({
      top: 0,
      behavior: 'auto',
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
    return dispatch(PecasAction.setLoja(lojaValue));
  }

  const lojasData = [
    {
      cod: '0000',
      nome: 'Escolha uma loja',
    },
    {
      cod: '0001',
      nome: 'Campo Grande',
    },
    {
      cod: '0002',
      nome: 'Cuiaba',
    },
    {
      cod: '0012',
      nome: 'Sinop',
    },
    {
      cod: '0014',
      nome: 'Dourados',
    },
  ];

  return (
    <div className="pt-10 px-10 pb-0 my-36">
      <section className="w-full flex flex-col items-center">
        <h3 className="text-4xl uppercase text-primary font-bold text-center">Escolha a loja para atendimento</h3>
        <h3 className="text-xl font-semibold text-center mt-12 mb-2">Após selecionar, vamos carregar as nossas promoções para você:</h3>
        {/* <p>*Exceto itens que já estão na promoção da CS Challenge, Pneus, MR e VTS*</p>
        <p><b>Promoção válida 26/11/2021</b></p> */}
      </section>

      {!pecasLoading && (
        <section className="w-full flex flex-col items-center justify-center">
          {/* <input
            value={pecasSearch}
            onChange={({ target }) => setPecasSearch(target.value)}
            onKeyPress={(e) => handlePecasQuery(e)}
            className="w-full md:w-6/12 h-10 p-4 rounded-l border border-primary"
          /> */}
          <select
            id="inp-formpagamento"
            value={lojaValue}
            onChange={({ target }) => setLojaValue(target.value)}
            className="w-full md:w-6/12 h-10 flex rounded border border-primary"
          >
            {lojasData.map((loja) => (
              <option key={loja.cod} value={loja.cod}>
                {loja.nome}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => handleLojaSelected()}
            className="h-10 p-4 bg-primary font-semibold text-secondary rounded mt-4 flex flex-row items-center justify-center"
          >
            SELECIONAR
          </button>
        </section>
      )}
    </div>
  );
}

export default Body;
