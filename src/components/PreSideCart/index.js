import React from 'react';
import { useSelector } from 'react-redux';

// import { Container } from './styles';

export default function PreSideCart() {
  const pecasData = useSelector((store) => store.pecas.pecasData);
  const totalPrice = useSelector((store) => store.pecas.totalPrice);

  return totalPrice && (
    <div
      className="
        bg-red-400
        h-screen
        z-50
        flex
        flex-col
        items-center
        justify-center
        fixed
        right-0"
    >
      <button type="button">
        Abrir
      </button>
      {pecasData.docs.filter((pecas) => pecas.qtd > 0).map((item) => (
        <h3>{item.DESCRICAO}</h3>
      ))}
    </div>
  );
}
