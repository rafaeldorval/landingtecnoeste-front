/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Img } from 'react-image';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaWindowClose } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import PecasAction from '../../store/ducks/pecas';
import FallBackImage from '../../assets/images/imgfallback.png';
import ScrollContainer from '../ScrollComponent';
import { formatFloat } from '../../utils/formaters';

// import { Container } from './styles';

export default function PreSideCart() {
  const dispatch = useDispatch();
  const pecasData = useSelector((store) => store.pecas.pecasData);
  const totalPriceFator = useSelector((store) => store.pecas.totalPriceFator);
  const sideCartStatus = useSelector((store) => store.pecas.sideCartStatus);
  const [openSideCar, setOpenSideCar] = useState(true);
  const [hiddenSideCar, setHiddenSideCar] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;

    if (scrolled === 0) {
      setHiddenSideCar(true);
    } else if (scrolled > 0) {
      setHiddenSideCar(false);
    }
  };

  window.addEventListener('scroll', toggleVisible);

  useEffect(() => {
    setOpenSideCar(sideCartStatus);
    console.tron.log('sideCartStatus', sideCartStatus);
  }, [sideCartStatus]);

  return (
    <div
      className={`
        bg-white
        h-screen
        z-50
        p-4
        ${openSideCar && `
          w-4/5
          flex
          items-start
          justify-start
        `}
        ${!openSideCar && `
          hidden
          items-center
          justify-center
        `}
        shadow-2xl
        md:hidden
        flex-col
        fixed
        right-0`}
    >
      <button
        type="button"
        className="
          flex
          flex-row
          justify-center
          items-center
          font-bold
        "
        onClick={() => dispatch(PecasAction.setSideCartStatus(!sideCartStatus))}
      >
        {openSideCar ? <IoIosArrowForward color="#E6BF27" /> : <IoIosArrowBack color="#E6BF27" />}
        {openSideCar ? 'Recolher' : 'Abrir'}
      </button>
      {openSideCar && (
      <h3
        className="font-bold flex justify-center items-center"
      >
        Resumo do pedido
      </h3>
      )}
      <ScrollContainer>
        {pecasData.docs.filter((pecas) => pecas.qtd > 0).map((item) => (
          <section className={`
            flex
            w-full
            ${openSideCar && `
              flex-row
              items-start
            `}
            ${!openSideCar && `
              flex-col
              items-center
            `}
            mb-2
            border-b-2
            pb-2
            mt-2
          `}
          >
            <Img
              src={
              [
                item.imgData,
                FallBackImage,
              ]
            }
              style={{
                width: '50px',
              }}
            />
            {/* <h3>{item.qtd}</h3> */}
            {!openSideCar && (
              <h3
                style={{ width: '50px' }}
                className="text-secondary bg-primary font-bold flex justify-center items-center"
              >
                {item.qtd}
              </h3>
            )}
            <div className="flex w-3/4 flex-col">
              {openSideCar && (
                <p className="w-3/5 text-primary font-bold truncate">{item.DESCRICAO}</p>
              )}
              {openSideCar && (
              <section className="w-full flex flex-row items-center justify-between">
                <section className="flex flex-row items-center">
                  <button
                    className="bg-secondary px-2"
                    type="button"
                    onClick={() => dispatch(PecasAction.handleItemQtd(item.REFERENCIA, '-'))}
                  >
                    <p className="text-primary font-bold">-</p>
                  </button>
                  <h3 className="text-secondary bg-primary px-8 font-bold">{item.qtd}</h3>
                  <button
                    className="bg-secondary px-2"
                    type="button"
                    onClick={() => dispatch(PecasAction.handleItemQtd(item.REFERENCIA, '+'))}
                  >
                    <p className="text-primary font-bold">+</p>
                  </button>
                </section>
                <button type="button" onClick={() => dispatch(PecasAction.handleClearItemQtd(item.REFERENCIA))}>
                  <FaWindowClose size={25} color="#E6BF27" />
                </button>
              </section>
              )}
            </div>
          </section>
        ))}
      </ScrollContainer>
      {openSideCar && (
        <div className="w-full p-2 flex flex-col items-center">
          <h3 className="text-xs">
            {
            pecasData.docs.filter((pecas) => pecas.qtd > 0).length > 1
              ? `${pecasData.docs.filter((pecas) => pecas.qtd > 0).length} Itens`
              : `${pecasData.docs.filter((pecas) => pecas.qtd > 0).length} Item`
            }
          </h3>
          <h3 className="font-semibold">
            Total: R$ {formatFloat(totalPriceFator, true)}
          </h3>
          <button
            onClick={() => {}}
            className={`
              bg-secondary
              py
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
            <p className="font-bold text-xl">Finalizar pedido</p>
          </button>
        </div>
      )}
    </div>
  );
}