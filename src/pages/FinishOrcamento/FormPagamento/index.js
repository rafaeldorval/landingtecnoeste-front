import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PecasAction from '../../../store/ducks/pecas';
import { formatFloat, handleParcelaValuePecas } from '../../../utils/formaters';

// import { Container } from './styles';

export default function FormPagamento() {
  const dispatch = useDispatch();
  const totalPrice = useSelector((store) => store.pecas.totalPrice);
  const totalPriceFator = useSelector((store) => store.pecas.totalPriceFator);
  const formPgmData = useSelector((store) => store.pecas.formPgmData);
  const formPgmSelected = useSelector((store) => store.pecas.formPgmSelected);

  function verifyUserData() {
    return true;
  }

  return (
    <div className="flex flex-col md:flex-row md:justify-between mt-8">
      <div className="flex my-4 md:my-0 flex-col w-full shadow md:w-7/12 px-2 md:p-4 bg-white">
        <h3 className="font-bold text-xl">Selecione uma forma de pagamento</h3>
        <select
          id="inp-formpagamento"
          value={formPgmSelected.CODIGO}
          onChange={({ target }) => dispatch(PecasAction.handleFormPgt(target.value))}
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
        >
          {formPgmData.filter((row) => (
            row.LIMITEINFE ? totalPriceFator >= row.LIMITEINFE : true)).map((pgt) => (
              <option key={pgt.CODIGO} value={pgt.CODIGO}>
                {handleParcelaValuePecas(pgt, totalPrice)}
              </option>
          ))}
        </select>
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
            <h3 className="font-bold text-secondaryDark">
              R$ {formatFloat((formatFloat(totalPriceFator) - formatFloat(totalPrice)), true)}
            </h3>
          </section>
          <section className="flex flex-row items-center justify-between">
            <h3 className="font-semibold text-sm">Total</h3>
            <h3 className="font-bold">R$ {formatFloat((totalPriceFator), true)}</h3>
          </section>
        </div>
        <button
          onClick={() => dispatch(PecasAction.setCartStep(3))}
          disabled={!verifyUserData()}
          className={`
            ${!verifyUserData() ? 'bg-gray-500' : 'bg-secondary'}
            ${!verifyUserData() ? '' : 'border-secondary'}
            ${!verifyUserData() ? 'text-gray-400' : 'text-black '}
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
          <p className="font-bold text-xl">Continuar</p>
        </button>
      </div>
    </div>
  );
}
