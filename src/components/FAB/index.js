import React, { useState } from 'react';
// import ScrollToTop from 'react-scroll-up';

import CartIcon from '../../assets/images/cart.png';
import { formatFloat } from '../../utils/formaters';
import './style.css';

function FAB({ totalPrice }) {
  const [showFab, setShowFab] = useState(true);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;

    if (scrolled === 0) {
      setShowFab(false);
    } else if (scrolled > 0) {
      setShowFab(true);
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'auto',
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return showFab && (
    <button
      onClick={() => scrollToBottom()}
      type="button"
      className="
        flex
        flex-col
        items-center
        justify-center
        fixed
        left-fab-left
        top-fab-top"
    >
      <div className="float-fab w-16 h-16">
        <img src={CartIcon} alt="cart icon" className="w-10" />
      </div>
      <h4 className="bg-black rounded-xl px-5 border border-secondary py-2 text-secondary border-dashed text-xs md:text-sm font-bold uppercase mt-4">Total: R$ {formatFloat(totalPrice).toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h4>
    </button>
  // <ScrollToTop showUnder={160}>
  // </ScrollToTop>
  );
}

export default FAB;
