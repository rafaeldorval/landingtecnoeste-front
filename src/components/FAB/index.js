/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CartIcon from '../../assets/images/cart.png';
import { formatFloat } from '../../utils/formaters';
import PecasActions from '../../store/ducks/pecas';
import './style.css';

function FAB() {
  const dispatch = useDispatch();
  const totalPriceFator = useSelector((store) => store.pecas.totalPriceFator);
  const sideCartStatus = useSelector((store) => store.pecas.sideCartStatus);
  const [showFab, setShowFab] = useState(false);

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

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []);

  return showFab && (
    <button
      onClick={() => dispatch(PecasActions.setSideCartStatus(!sideCartStatus))}
      // onClick={() => scrollToBottom()}
      type="button"
      className="
        flex
        md:hidden
        flex-col
        items-center
        justify-center
        fixed
        z-40
        right-fab-right
        bottom-fab-bottom"
    >
      <div className="float-fab w-16 h-16">
        <img src={CartIcon} alt="cart icon" className="w-10" />
      </div>
      <h4 className="
            bg-black
            rounded-xl
            px-5
            border
            border-secondary
            py-2
            text-secondary
            border-dashed
            text-xs
            md:text-sm
            font-bold
            uppercase
            mt-4
          "
      >
        Total: R$ {formatFloat(totalPriceFator, true)}
      </h4>
    </button>
  // <ScrollToTop showUnder={160}>
  // </ScrollToTop>
  );
}

export default FAB;
