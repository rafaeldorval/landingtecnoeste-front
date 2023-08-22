/* eslint-disable no-underscore-dangle */
import React from 'react';
import Cookies from 'universal-cookie';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaUserAlt } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { IoCart } from 'react-icons/io5';
import { Img } from 'react-image';

import PecasAction from '../../store/ducks/pecas';
import ClientAction from '../../store/ducks/client';
import LogoTecnoeste from '../../assets/images/logotecnoeste.png';

function Header({ showUserAction = true, stickOff = false }) {
  const history = useHistory();
  const cookie = new Cookies();
  const dispatch = useDispatch();
  const sideCartStatus = useSelector((store) => store.pecas.sideCartStatus);
  const pecasData = useSelector((store) => store.pecas.pecasData);
  const loginModalStatus = useSelector((store) => store.client.loginModalStatus);
  const clientData = useSelector((store) => store.client.clientData);

  const queryV = cookie.get('v');
  const queryO = cookie.get('o');

  function handleGoHome() {
    dispatch(PecasAction.setSideCartStatus(false));
    dispatch(PecasAction.setCarrinho(null));
    dispatch(PecasAction.setCartStep(1));
    return dispatch(PecasAction.clearPrices());
  }

  return (
    <div style={{ zIndex: '590' }} className={`min-w-screen w-full z-full bg-black p-2 ${stickOff ? '' : 'sticky'} top-0 flex flex-row justify-between items-center`}>
      <Link onClick={() => handleGoHome()} to={`/app?${queryV ? `v=${queryV}&` : ''}${queryO ? `o=${queryO}` : ''}`}>
        <Img
          src={LogoTecnoeste}
          alt="logo tecnoeste"
          style={{
            height: 45,
          }}
        />
      </Link>
      {showUserAction && (
        <div className="flex flex-row items-center mr-8 md:mr-24">
          <button
            type="button"
            className="flex flex-row items-center mr-4"
            onClick={() => (clientData && clientData._id
              ? history.push('/cliente/pedidos')
              : dispatch(ClientAction.setLoginModalStatus(!loginModalStatus))
            )}
          >
            <FaUserAlt size={15} color="#E6BF27" />
            <h3 className="mx-2 text-secondary font-semibold capitalize">
              { clientData && clientData._id ? clientData.firstName : 'Entrar'}
            </h3>
            <IoIosArrowDown size={15} color="#E6BF27" />
          </button>
          <button
            type="button"
            className="flex flex-row items-center"
            onClick={() => dispatch(PecasAction.setSideCartStatus(!sideCartStatus))}
          >
            <IoCart size={25} color="#E6BF27" />
            <h3 className="mx-2 text-secondary font-semibold">
              {pecasData && pecasData.docs.filter((item) => item.qtd > 0).length}
            </h3>
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
