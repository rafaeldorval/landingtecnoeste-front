/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Img } from 'react-image';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { GiSandsOfTime } from 'react-icons/gi';
import { MdSearchOff } from 'react-icons/md';
import { FaWindowClose } from 'react-icons/fa';
import PecasAction from '../../../store/ducks/pecas';

import ModalComponent from '../../../components/ModalComponent';
import FallBackImage from '../../../assets/images/imgfallback.png';
import FallBackImageLarge from '../../../assets/images/imgfallbackLarge.jpg';
import { formatFloat } from '../../../utils/formaters';
import './style.css';
import ScrollContainer from '../../../components/ScrollComponent';

function Body({
  carrinhoModal,
  setCarrinhoModal,
  handleClearItemQtd,
  clientData,
  finishOrcamento,
}) {
  const dispatch = useDispatch();
  const pecasLoading = useSelector((state) => state.pecas.loading);
  const isSearchPecas = useSelector((state) => state.pecas.isSearchPecas);
  const pecasData = useSelector((state) => state.pecas.pecasData);
  const totalPriceFator = useSelector((state) => state.pecas.totalPriceFator);

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

  function verifyUserData() {
    if (!clientData.nome || !clientData.email || !clientData.telefone) {
      return false;
    }

    return true;
  }

  return (
    <div className="pt-10 px-10 pb-0">
      <section className="w-full flex flex-col items-center mb-12">
        <h3 className="text-4xl font-bold text-center">Escolha seu produto e aproveite essas ofertas</h3>
        {/* <p>*Exceto itens que já estão na promoção da CS Challenge, Pneus, MR e VTS*</p>
        <p><b>Promoção válida 26/11/2021</b></p> */}
      </section>
      <div className="w-full bg-white bg-opacity-80 flex flex-col items-center z-40 sticky top-0">
        {!pecasLoading && (
          <h3 className="text-xl font-semibold text-center mb-2">Pesquise pelo nome ou código das peças que você procura:</h3>
        )}
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
          <section className="w-full flex flex-row items-center justify-center mt-4">
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
              {/* <img src={item.imgData} alt="ref 11915157" className="w-8/12 md:w-7/12" /> */}
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
        <ModalComponent
          openState={carrinhoModal}
          closeAction={setCarrinhoModal}
          width="90%"
          height="90%"
        >
          <div className="flex flex-row h-full w-full p-2 md:p-8">
            <ScrollContainer>
              <div className="flex flex-col md:flex-row md:justify-between">
                <div className="flex flex-col w-full md:w-3/4 px-2 md:p-4">
                  <div className="">
                    <h3 className="font-bold text-primary">Itens no carrinho</h3>
                    {itemData && (
                    <h3>{itemData && itemData.filter((item) => item.qtd > 0).length} {itemData && itemData.filter((item) => item.qtd > 0).length > 1 ? 'Itens' : 'Item'}</h3>
                    )}
                  </div>
                  {itemData && itemData.filter((item) => item.qtd > 0).map((item) => (
                    <div className="flex flex-col mb-4 border-b-2 pb-4 px-4 md:px-0">
                      <div className="flex flex-row justify-between w-full">
                        <section className="flex flex-row">
                          <Img
                            src={[item.imgData, FallBackImage]}
                            style={{
                              width: '70px',
                            }}
                          />
                          <h3 className="font-semibold text-primary ml-2">
                            {item.DESCRICAO}
                          </h3>
                        </section>
                        <section>
                          <button type="button" onClick={() => handleClearItemQtd(item.REFERENCIA)}>
                            <FaWindowClose size={25} color="#E6BF27" />
                          </button>
                        </section>
                      </div>
                      <div className="flex flex-row justify-between w-full mt-2">
                        <section className="flex flex-col">
                          <h3 className="font-semibold text-gray-500 ml-2">
                            Valor: R$ {item.newPrice.toLocaleString('pt-br', { minimumFractionDigits: 2 })}
                          </h3>
                          <h3 className="font-bold text-primary ml-2">
                            Total: R$ {(item.newPrice * item.qtd).toLocaleString('pt-br', { minimumFractionDigits: 2 })}
                          </h3>
                        </section>
                        <section className="flex flex-row items-center justify-between bg-primary w-1/2 md:w-1/4 rounded mt-4">
                          <button className="bg-secondary py-2 px-4" type="button" onClick={() => dispatch(PecasAction.handleItemQtd(item.REFERENCIA, '-'))}>
                            <p className="text-primary font-bold">-</p>
                          </button>
                          <h3 className="text-secondary font-bold">{item.qtd}</h3>
                          <button className="bg-secondary py-2 px-4" type="button" onClick={() => dispatch(PecasAction.handleItemQtd(item.REFERENCIA, '+'))}>
                            <p className="text-primary font-bold">+</p>
                          </button>
                        </section>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 w-full md:w-1/4 pb-4 px-4 md:px-8 mb-8">
                  <h3 className="font-bold text-primary">Resumo</h3>
                  <section className="flex flex-row justify-between border-b-2">
                    <h3 className="font-semibold text-primary">Subtotal</h3>
                    <h3 className="font-semibold text-primary">R$ {totalPriceFator.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h3>
                  </section>
                  <section className="flex flex-col items-center justify-center">
                    {!verifyUserData() && (
                      <h3 className="mt-2 font-semibold text-red-500">Para finalizar preencha todos os dados do formulario</h3>
                    )}
                    <button
                      onClick={() => finishOrcamento()}
                      disabled={!verifyUserData()}
                      className={`
                      ${!verifyUserData() ? 'bg-gray-500' : 'bg-primary'}
                      ${!verifyUserData() ? '' : 'border-secondary'}
                      ${!verifyUserData() ? 'text-gray-400' : 'text-secondary '}
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
                      <p className="font-bold text-xl">Finalizar</p>
                    </button>
                    <button
                      onClick={setCarrinhoModal}
                      className="bg-white py px-4 rounded mt-2 flex flex-row align-center justify-center border-2 border-secondary"
                      type="button"
                    >
                      <p className="text-secondary font-bold">Continuar comprando</p>
                    </button>
                  </section>
                </div>
              </div>
            </ScrollContainer>
          </div>
        </ModalComponent>
      </div>
    </div>
  );
}

export default Body;
