/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Img } from 'react-image';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { GiSandsOfTime } from 'react-icons/gi';
import { MdSearchOff } from 'react-icons/md';
import PecasAction from '../../../store/ducks/pecas';

import ModalComponent from '../../../components/ModalComponent';
import FallBackImage from '../../../assets/images/imgfallback.png';
import FallBackImageLarge from '../../../assets/images/imgfallbackLarge.jpg';
import { formatFloat } from '../../../utils/formaters';
import './style.css';

function Body() {
  const dispatch = useDispatch();
  const pecasLoading = useSelector((state) => state.pecas.loading);
  const isSearchPecas = useSelector((state) => state.pecas.isSearchPecas);
  const pecasData = useSelector((state) => state.pecas.pecasData);

  const [pecasSearch, setPecasSearch] = useState('');
  const [imgProdModal, setImgProdModal] = useState(false);
  const [imgFocusUrl, setImgFocusUrl] = useState('');
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    if (pecasData && pecasData.docs) {
      setItemData(pecasData.docs);
    }
  }, [pecasData]);

  function handleSearchPecas() {
    window.scrollTo({
      top: 500,
      behavior: 'auto',
    });
    return dispatch(PecasAction.getSearchPecasRequest(pecasSearch));
  }

  function handlePecasQuery(e) {
    if (e) {
      if (e.key === 'Enter') {
        return handleSearchPecas();
      }
    }

    return null;
  }

  function handleClearSearchPecas() {
    setPecasSearch('');
    window.scrollTo({
      top: 500,
      behavior: 'auto',
    });
    return dispatch(PecasAction.clearSearchPecasRequest());
  }

  return (
    <div className="">
      <section className="w-full flex flex-col items-center mb-12 pt-10 px-10 pb-0">
        <h3 className="text-4xl font-bold text-center">Escolha seu produto e aproveite essas ofertas</h3>
      </section>
      {!pecasLoading && (
      <h3 className="text-xl font-semibold text-center mb-2">Pesquise pelo nome ou código das peças que você procura:</h3>
      )}
      <div className="w-full bg-white flex flex-col items-center sticky top-14 p-4 border-b-2">
        {!pecasLoading && (
          <section className="w-full flex flex-row items-center justify-center">
            <input
              value={pecasSearch}
              onChange={({ target }) => setPecasSearch(target.value)}
              onKeyPress={(e) => handlePecasQuery(e)}
              className="w-full md:w-6/12 h-10 p-4 rounded-l border border-primary"
            />
            <button
              type="button"
              onClick={() => handleSearchPecas()}
              className="h-10 p-4 bg-primary text-secondary flex flex-row items-center justify-center"
            >
              Pesquisar
            </button>
          </section>
        )}
        {isSearchPecas && (
          <section className="w-full flex flex-row items-center justify-center mt">
            <button
              type="button"
              onClick={() => handleClearSearchPecas()}
              className="text-xl flex flex-row items-center justify-center h-10 p-4 bg-secondary text-primary"
            >
              Limpar Pesquisa
              <MdSearchOff size={32} />
            </button>
          </section>
        )}

      </div>
      <div className="mt-6 flex flex-col items-center">
        <div className="flex md:flex-row flex-wrap flex-col w-10/12 items-center justify-start mb-8">
          {itemData && itemData.map((item, index) => (
            <section key={`${item.REFERENCIA}-${index}`} className="flex flex-col items-center w-full md:w-2/6 mt-14">
              <Img
                src={
                  [
                    item.imgData,
                    FallBackImage,
                  ]
                }
                style={{
                  width: '150px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setImgFocusUrl(item.imgData);
                  setImgProdModal(true);
                }}
              />
              <h3 className="text-primary flex flex-col items-center justify-center text-center font-bold text-xl">{item.DESCRICAO} {item.SLR !== '12' && item.Marca}</h3>
              <p>Ref: {item.REFERENCIA}</p>
              <p className="max-w-16 text-center mt-4 font-bold text-primary text-xl">
                {item.SEFMP} {item.SEFMP === 1 ? 'disponível' : 'disponíveis'}
              </p>
              <span className="flex flex-row items-center justify-center">
                <h4 className="text-red-600 font-bold line-through text-lg mr-1">R$ {formatFloat(item.PRECO).toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h4>
                <h5 className="text-green-500 font-bold text-2xl">R$ {item.newPrice.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h5>
              </span>
              {item.qtd ? (
                <section className="flex flex-row items-center justify-between bg-primary w-full md:w-2/3 rounded mt-4">
                  <button className="bg-secondary py-2 px-4" type="button" onClick={() => dispatch(PecasAction.handleItemQtd(item.REFERENCIA, '-'))}>
                    <p className="text-primary font-bold">-</p>
                  </button>
                  <h3 className="text-secondary font-bold">{item.qtd}</h3>
                  <button className="bg-secondary py-2 px-4" type="button" onClick={() => dispatch(PecasAction.handleItemQtd(item.REFERENCIA, '+'))}>
                    <p className="text-primary font-bold">+</p>
                  </button>
                </section>
              ) : (
                <button
                  onClick={() => dispatch(PecasAction.handleItemQtd(item.REFERENCIA, '+'))}
                  className="bg-secondary py-2 w-full md:w-2/3 rounded mt-4"
                  type="button"
                >
                  <p className="text-primary font-bold">COMPRAR AGORA</p>
                </button>
              )}
            </section>
          ))}
        </div>
        {itemData && pecasData.hasNextPage && !pecasLoading && (
        <button
          onClick={() => {
            if (isSearchPecas) {
              return dispatch(PecasAction.getSearchPecasRequest(pecasSearch, true));
            }
            return dispatch(PecasAction.getPecasRequest(true));
          }}
          className="bg-primary py-2 px-8 rounded mt-4 mb-8 flex flex-row align-center justify-center border-2 border-secondary"
          type="button"
        >
          <p className="text-secondary font-bold text-xl">Carregar mais</p>
          <AiOutlineArrowDown color="#E6BF27" size="30" />
        </button>
        )}
        {pecasLoading && itemData && (
        <button
          onClick={() => dispatch(PecasAction.getPecasRequest(true))}
          disabled
          className="bg-gray-400 py-2 px-8 rounded mt-4 mb-8 flex flex-row align-center justify-center"
          type="button"
        >
          <p className="text-white font-bold text-xl">Carregando...</p>
          <GiSandsOfTime color="#fff" size="30" />
        </button>
        )}
        <ModalComponent
          openState={imgProdModal}
          closeAction={() => setImgProdModal(!imgProdModal)}
          width="90%"
          height="90%"
          closeButton
        >
          <Img
            src={[imgFocusUrl, FallBackImageLarge]}
            style={{
              width: '50%',
            }}
          />
        </ModalComponent>
      </div>
    </div>
  );
}

export default Body;
