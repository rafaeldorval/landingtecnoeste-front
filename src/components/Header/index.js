import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaUserAlt } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { IoCart } from 'react-icons/io5';
import { Img } from 'react-image';

import PecasAction from '../../store/ducks/pecas';
import ClientAction from '../../store/ducks/client';
import LogoTecnoeste from '../../assets/images/logotecnoeste.png';

function SectionFooter() {
  const dispatch = useDispatch();
  const pecasData = useSelector((store) => store.pecas.pecasData);
  const loginModalStatus = useSelector((store) => store.client.loginModalStatus);

  return (
    <div className="min-w-screen w-full bg-black p-2 sticky sticky top-0 flex flex-row justify-between items-center">
      <a href="http://www.tecnoeste.net" target="_blank" rel="noreferrer">
        <Img
          src={LogoTecnoeste}
          alt="logo tecnoeste"
          style={{
            height: 45,
          }}
        />
      </a>
      <div className="flex flex-row items-center mr-8 md:mr-24">
        <button
          type="button"
          className="flex flex-row items-center mr-4"
          onClick={() => dispatch(ClientAction.setLoginModalStatus(!loginModalStatus))}
        >
          <FaUserAlt size={15} color="#E6BF27" />
          <h3 className="mx-2 text-white text-secondary font-semibold">Entrar</h3>
          <IoIosArrowDown size={15} color="#E6BF27" />
        </button>
        <button
          type="button"
          className="flex flex-row items-center"
          onClick={() => dispatch(PecasAction.setSideCartStatus(true))}
        >
          <IoCart size={25} color="#E6BF27" />
          <h3 className="mx-2 text-white text-secondary font-semibold">
            {pecasData && pecasData.docs.filter((item) => item.qtd > 0).length}
          </h3>
        </button>
      </div>
    </div>
  );
}

export default SectionFooter;
