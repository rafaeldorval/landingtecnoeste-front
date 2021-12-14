import React from 'react';
import { Img } from 'react-image';
import { useDispatch, useSelector } from 'react-redux';
import { FaWindowClose } from 'react-icons/fa';
import PecasAction from '../../../store/ducks/pecas';

import FallBackImage from '../../../assets/images/imgfallback.png';
import { formatFloat } from '../../../utils/formaters';

export default function CartItems() {
  const dispatch = useDispatch();
  const pecasData = useSelector((store) => store.pecas.pecasData);
  const totalPriceFator = useSelector((store) => store.pecas.totalPriceFator);

  function verifyUserData() {
    return true;
  }

  return (
    <div className="flex flex-col md:flex-row mt-8">
      <div className="flex flex-col w-full shadow md:w-8/12 px-2 md:p-4 bg-white">
        <h3 className="font-semibold text-xl">Todas as pecas</h3>
        <h3 className="font-semibold mb-8">
          {
            pecasData.docs.filter((pecas) => pecas.qtd > 0).length > 1
              ? `${pecasData.docs.filter((pecas) => pecas.qtd > 0).length} Itens`
              : `${pecasData.docs.filter((pecas) => pecas.qtd > 0).length} Item`
          }
        </h3>
        {pecasData && pecasData.docs.filter((item) => item.qtd > 0).map((item) => (
          <div key={item.REFERENCIA} className="flex flex-col mb-4 border-b-2 pb-4 px-4 md:px-0">
            <div className="flex flex-row justify-between w-full">
              <section className="flex flex-row">
                <Img
                  src={[item.imgData, FallBackImage]}
                  style={{
                    width: '55px',
                  }}
                />
                <h3 className="font-semibold text-primary ml-2">
                  {item.DESCRICAO}
                </h3>
              </section>
              <section>
                <button type="button" onClick={() => dispatch(PecasAction.handleClearItemQtd(item.REFERENCIA))}>
                  <FaWindowClose size={25} color="#E6BF27" />
                </button>
              </section>
            </div>
            <div className="flex flex-row items-center justify-between w-full mt">
              <section className="flex flex-col">
                <h3 className="font-semibold text-gray-500 ml-2">
                  Valor: R$ {item.newPrice.toLocaleString('pt-br', { minimumFractionDigits: 2 })}
                </h3>
                <h3 className="font-bold text-primary ml-2">
                  Total: R$ {(item.newPrice * item.qtd).toLocaleString('pt-br', { minimumFractionDigits: 2 })}
                </h3>
              </section>
              <section className="flex flex-row items-center justify-between bg-primary w-1/2 md:w-1/4 rounded">
                <button className="bg-secondary py-2 px-4" type="button" onClick={() => dispatch(PecasAction.handleItemQtd(item.REFERENCIA, '-'))}>
                  <p className="text-primary font-bold">-</p>
                </button>
                <h3 className="text-secondary font-bold">{item.qtd}</h3>
                <button className="bg-secondary py-2 px-4" type="button" onClick={() => dispatch(PecasAction.handleItemQtd(item.REFERENCIA, '+'))}>
                  <p className="text-primary font-bold">+</p>
                </button>
              </section>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full md:w-4/12 p-4">
        <h3 className="font-bold text-xl">Resumo</h3>
        <section className="flex flex-row items-center justify-between">
          <h3 className="font-semibold">Total</h3>
          <h3 className="font-bold text-xl">R$ {formatFloat(totalPriceFator, true)}</h3>
        </section>
        <button
          onClick={() => dispatch(PecasAction.setCartStep(2))}
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
