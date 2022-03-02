import React from 'react';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';

import CheckoutStep from './CheckoutStep';
import CartItems from './CartItems';
import FormPagamento from './FormPagamento';
// import DeliveryAddress from './DeliveryAddress';
import ResumeCart from './ResumeCart';
import SuccessOrc from './SuccessOrc';

export default function FinishOrcamento() {
  const pecasDataStore = useSelector((store) => store.pecas.pecasData);
  const cartStep = useSelector((store) => store.pecas.cartStep);

  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <Header showUserAction={false} stickOff />
      <div className="h-full w-full md:w-10/12">
        <CheckoutStep />
        {pecasDataStore && cartStep === 1 && (
          <CartItems />
        )}
        {pecasDataStore && cartStep === 2 && (
          <FormPagamento />
        )}
        {/* {pecasDataStore && cartStep === 3 && (
          <DeliveryAddress />
        )} */}
        {pecasDataStore && cartStep === 3 && (
          <ResumeCart />
        )}
        {pecasDataStore && cartStep === 4 && (
          <SuccessOrc />
        )}
      </div>
    </div>
  );
}
