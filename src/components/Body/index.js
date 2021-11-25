/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React from 'react';
import { Img } from 'react-image';
import ReactPaginate from 'react-paginate';

import FallBackImage from '../../assets/images/imgfallback.png';
import { formatFloat } from '../../utils/formaters';
import './style.css';

function Body({ handleItemQtd, itemData }) {
  return (
    <div className="pt-10 px-10 pb-0">
      <section className="w-full flex flex-col items-center">
        <h3 className="text-4xl font-bold text-center">Escolha seu produto e aproveite essas ofertas</h3>
        {/* <p>*Exceto itens que já estão na promoção da CS Challenge, Pneus, MR e VTS*</p>
        <p><b>Promoção válida 26/11/2021</b></p> */}
      </section>
      <div className="mt-6 flex flex-col items-center">
        <div className="flex md:flex-row flex-wrap flex-col w-10/12 items-center justify-start mb-8">
          {itemData && itemData.map((item, index) => (
            <section key={`${item.REFERENCIA}-${index}`} className="flex flex-col items-center w-full md:w-2/6 mt-14">
              {/* <img src={item.imgData} alt="ref 11915157" className="w-8/12 md:w-7/12" /> */}
              <Img
                src={
              [
                item.imgData,
                FallBackImage,
              ]
            }
                style={{
                  width: '70px',
                }}
              />
              <h3 className="text-primary flex flex-col items-center justify-center text-center font-bold text-xl">{item.DESCRICAO}</h3>
              <p>Ref: {item.REFERENCIA}</p>
              {/* {item.volume && !item.destaque && (
              <p>Embalagem: {item.volume}</p>
              )} */}
              {/* {!item.volume && !item.destaque && (
              <p className="text-white">-</p>
              )}
              {item.destaque && (
              <p className="bg-primary text-secondary px-2 uppercase font-semibold">{item.destaque}</p>
              )} */}
              <p className="max-w-16 text-center mt-4 font-bold text-primary text-xl">
                10% de Desconto
              </p>
              <span className="flex flex-row items-center justify-center">
                <h4 className="text-red-600 font-bold line-through text-lg mr-1">R$ {formatFloat(item.PRECO).toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h4>
                <h5 className="text-green-500 font-bold text-2xl">R$ {formatFloat(item.newPrice).toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h5>
              </span>
              {item.qtd ? (
                <section className="flex flex-row items-center justify-between bg-primary w-full md:w-2/3 rounded mt-4">
                  <button className="bg-secondary py-2 px-4" type="button" onClick={() => handleItemQtd(item.REFERENCIA, '-')}>
                    <p className="text-primary font-bold">-</p>
                  </button>
                  <h3 className="text-secondary font-bold">{item.qtd}</h3>
                  <button className="bg-secondary py-2 px-4" type="button" onClick={() => handleItemQtd(item.REFERENCIA, '+')}>
                    <p className="text-primary font-bold">+</p>
                  </button>
                </section>
              ) : (
                <button
                  onClick={() => handleItemQtd(item.REFERENCIA, '+')}
                  className="bg-secondary py-2 w-full md:w-2/3 rounded mt-4"
                  type="button"
                >
                  <p className="text-primary font-bold">COMPRAR AGORA</p>
                </button>
              )}
            </section>
          ))}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={() => {}}
          pageRangeDisplayed={5}
          pageCount={25}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          previousLinkClassName="pagination__link"
          nextLinkClassName="pagination__link"
          disabledClassName="pagination__link--disabled"
          activeClassName="pagination__link--active"
        />
        {/* <div className="flex w-full items-center justify-center mt-8 mb-4">
          <p className="text-black px-2 font-semibold">
            *Válido para o cliente que utilizar o nosso serviço de instalação.
            Não esta incluso no valor da peça.
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default Body;
