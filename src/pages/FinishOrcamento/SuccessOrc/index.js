import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import PecasActions from '../../../store/ducks/pecas';

// import { Container } from './styles';

export default function SuccessOrc() {
  const dispatch = useDispatch();
  const navigation = useHistory();

  function handlePageNavigation() {
    const cookie = new Cookies();
    const queryV = cookie.get('v');
    const queryO = cookie.get('o');

    dispatch(PecasActions.setSideCartStatus(false));
    dispatch(PecasActions.setCarrinho(null));
    dispatch(PecasActions.setCartStep(1));
    dispatch(PecasActions.clearPrices());

    return navigation.push(`/?${queryV ? `v=${queryV}&` : ''}${queryO ? `o=${queryO}` : ''}`);
  }
  return (
    <div className="flex flex-col items-center mt-8 shadow bg-white w-full p-12">
      <h3 className="font-bold text-3xl uppercase text-green-500">Pedido gerado com sucesso</h3>
      <h3 className="mt-4 font-semibold text-xl">Agora é só aguardar. Em breve entraremos em contato com você.</h3>
      <button
        onClick={() => handlePageNavigation()}
        className={`
          bg-secondary
          border-secondary
          text-black
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
        <p className="font-bold text-xl">Voltar para tela inicial</p>
      </button>
    </div>
  );
}
