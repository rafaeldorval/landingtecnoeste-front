/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import {
  AiOutlineShoppingCart,
  AiOutlineCreditCard,
  AiOutlineCheck,
} from 'react-icons/ai';
import { RiFileList3Line } from 'react-icons/ri';
import { GrDeliver } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import PecasAction from '../../../store/ducks/pecas';
// import { Container } from './styles';

export default function CheckoutStep() {
  const dispatch = useDispatch();
  const cartStep = useSelector((store) => store.pecas.cartStep);

  return (
    <div className="mt-4 w-full rounded-md shadow flex flex-row items-center bg-white h-12">
      <section
        onClick={() => {
          if (cartStep >= 1 && cartStep !== 5) {
            dispatch(PecasAction.setCartStep(1));
          }
        }}
        className={`
          flex
          flex-row
          items-center
          justify-center
          h-full
          w-1/4
          ${cartStep >= 1 && `
            bg-secondary
          `}
          ${cartStep >= 1 && cartStep !== 5 && `
            cursor-pointer
          `}
        `}
      >
        <AiOutlineShoppingCart size={25} />
        <p className="ml-4 hidden md:flex font-semibold">Carrinho</p>
      </section>
      <section
        onClick={() => {
          if (cartStep >= 2 && cartStep !== 5) {
            dispatch(PecasAction.setCartStep(2));
          }
        }}
        className={`
        flex
        flex-row
        items-center
        justify-center
        h-full
        w-1/4
        ${cartStep >= 2 && `
          bg-secondary
        `}
        ${cartStep >= 2 && cartStep !== 5 && `
          cursor-pointer
        `}
      `}
      >
        <AiOutlineCreditCard size={25} />
        <p className="ml-4 hidden md:flex font-semibold">Pagamento</p>
      </section>
      <section
        onClick={() => {
          if (cartStep >= 3 && cartStep !== 5) {
            dispatch(PecasAction.setCartStep(3));
          }
        }}
        className={`
          flex
          flex-row
          items-center
          justify-center
          h-full
          w-1/4
          ${cartStep >= 3 && `
            bg-secondary
          `}
          ${cartStep >= 3 && cartStep !== 5 && `
            cursor-pointer
          `}
        `}
      >
        <GrDeliver size={25} />
        <p className="ml-4 hidden md:flex font-semibold">Entrega</p>
      </section>
      <section
        onClick={() => {
          if (cartStep >= 4 && cartStep !== 5) {
            dispatch(PecasAction.setCartStep(3));
          }
        }}
        className={`
          flex
          flex-row
          items-center
          justify-center
          h-full
          w-1/4
          ${cartStep >= 4 && `
            bg-secondary
          `}
          ${cartStep >= 4 && cartStep !== 5 && `
            cursor-pointer
          `}
        `}
      >
        <RiFileList3Line size={25} />
        <p className="ml-4 hidden md:flex font-semibold">Resumo</p>
      </section>
      <section
        onClick={() => {
          if (cartStep >= 5) {
            dispatch(PecasAction.setCartStep(4));
          }
        }}
        className={`
          flex
          flex-row
          items-center
          justify-center
          h-full
          w-1/4
          ${cartStep >= 5 && `
            bg-secondary
            cursor-pointer
          `}
        `}
      >
        <AiOutlineCheck size={25} />
        <p className="ml-4 hidden md:flex font-semibold">Conclusão</p>
      </section>
    </div>
  );
}
