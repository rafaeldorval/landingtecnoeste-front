/* eslint-disable no-restricted-properties */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-operators */
import React from 'react';
import { create, all } from 'mathjs';

const config = { };
const math = create(all, config);

export function formatFloat(value, returnString = false) {
  const formatedValue = math.round(value, 2);

  if (returnString) {
    return formatedValue.toLocaleString('pt-br', { minimumFractionDigits: 2 });
  }
  return formatedValue;
}

export function handleParcelaValuePecas(row, total) {
  const {
    nFator, nParcelas, DESCRICAO,
  } = row;

  // const nFatorFormat = nFator === 0 ? 1 : nFator;
  // const nParcelasFormat = nParcelas === 0 ? 1 : nParcelas;

  const totalFormat = math.round(total, 2);
  const valueParcelaFator = math.round(
    ((totalFormat * nFator) / nParcelas), 2,
  );

  console.tron.log('valueParcelaFator', valueParcelaFator);
  const totalFinal = math.round((valueParcelaFator * nParcelas), 2);

  return (`${DESCRICAO} ${valueParcelaFator.toLocaleString('pt-br', { minimumFractionDigits: 2 })} (TOTAL ${totalFinal.toLocaleString('pt-br', { minimumFractionDigits: 2 })})`);
}
