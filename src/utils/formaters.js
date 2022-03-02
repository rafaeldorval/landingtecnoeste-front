/* eslint-disable new-cap */
/* eslint-disable no-restricted-properties */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-operators */
import React from 'react';
import {
  compareAsc, format, isBefore, parseISO, toDate,
} from 'date-fns';
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

  const totalFinal = math.round((valueParcelaFator * nParcelas), 2);

  return (`${DESCRICAO} ${valueParcelaFator.toLocaleString('pt-br', { minimumFractionDigits: 2 })} (TOTAL ${totalFinal.toLocaleString('pt-br', { minimumFractionDigits: 2 })})`);
}

export function valideDatePrommo(pricePromo, price, datePromo) {
  if (pricePromo) {
    const dateNow = parseISO(format(Date.now(), 'yyyyMMdd'));
    const teste = parseISO(datePromo);
    const compare = isBefore(dateNow, teste);

    if (compare) {
      return pricePromo;
    }

    return price;
  }

  return price;
}
