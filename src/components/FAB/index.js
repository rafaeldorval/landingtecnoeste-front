import React from 'react';
import ScrollToTop from 'react-scroll-up';

import CartIcon from '../../assets/images/cart.png';
import './style.css';

function FAB({ totalPrice }) {
  return (
    <ScrollToTop showUnder={160}>
      <div className="flex flex-col items-center justify-center">
        <div className="float-fab w-16 h-16">
          <img src={CartIcon} alt="cart icon" className="w-10" />
        </div>
        <h4 className="bg-black rounded-xl px-5 border border-secondary py-2 text-secondary border-dashed text-xs md:text-sm font-bold uppercase mt-4">Total: R$ {totalPrice.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h4>
      </div>
    </ScrollToTop>
  );
}

export default FAB;
