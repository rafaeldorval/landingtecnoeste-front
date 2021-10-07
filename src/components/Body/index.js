import React, { forwardRef } from 'react';

import './style.css';

const Body = forwardRef(({ itemData, handleItemQtd }, ref) => (
  <div className="pt-10 px-10 pb-0" ref={ref}>
    <section className="w-full flex flex-col items-center">
      <h3 className="text-4xl font-bold text-center">Escolha seu produto e aproveite essas ofertas</h3>
      <p>Preços <b>À VISTA</b> somente até <b>30/10/2021*</b></p>
    </section>
    <div className="mt-6 flex flex-col items-center">
      <div className="flex md:flex-row flex-wrap flex-col w-8/12 items-center justify-start">
        {itemData.map((item) => (
          <section key={item.ref} className="flex flex-col items-center w-full md:w-2/6 mt-4">
            <img src={item.imgData} alt="ref 11915157" className="w-8/12 md:w-5/12" />
            <h3 className="text-primary flex flex-col items-center justify-center text-center font-bold min-h-h3">{item.title}</h3>
            <p>Ref: {item.ref}</p>
            {item.volume && !item.destaque && (
            <p>Embalagem: {item.volume}</p>
            )}
            {!item.volume && !item.destaque && (
            <p className="text-white">-</p>
            )}
            {item.destaque && (
            <p className="bg-primary text-secondary px-2 uppercase font-semibold">{item.destaque}</p>
            )}
            <p className="max-w-16 text-center mt-4 leading-tight min-h-p">
              {item.description}
            </p>
            <span className="flex flex-row items-center justify-center mt-4">
              <h4 className="text-red-600 font-bold line-through text-lg mr-1">R$ {item.oldPrice}</h4>
              <h5 className="text-green-500 font-bold text-2xl">R$ {item.newPrice.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h5>
            </span>
            {item.qtd ? (
              <section className="flex flex-row items-center justify-between bg-primary w-full md:w-2/3 rounded mt-4">
                <button className="bg-secondary py-2 px-4" type="button" onClick={() => handleItemQtd(item.ref, '-')}>
                  <p className="text-primary font-bold">-</p>
                </button>
                <h3 className="text-secondary font-bold">{item.qtd}</h3>
                <button className="bg-secondary py-2 px-4" type="button" onClick={() => handleItemQtd(item.ref, '+')}>
                  <p className="text-primary font-bold">+</p>
                </button>
              </section>
            ) : (
              <button
                onClick={() => handleItemQtd(item.ref, '+')}
                className="bg-primary py-2 w-full md:w-2/3 rounded mt-4"
                type="button"
              >
                <p className="text-secondary font-bold">COMPRAR AGORA</p>
              </button>
            )}
          </section>
        ))}
      </div>
      <div className="flex w-full items-center justify-center mt-8 mb-4">
        <p className="text-black px-2 font-semibold">
          *Válido para o cliente que utilizar o nosso serviço de instalação.
          Não esta incluso no valor da peça.
        </p>
      </div>
    </div>
  </div>
));

export default Body;
