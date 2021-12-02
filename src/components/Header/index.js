import React from 'react';
import { ScrollTo } from 'react-scroll-to';

import LogoTecnoeste from '../../assets/images/logotecnoeste.png';
import NovembroLogo from '../../assets/images/novlogo.png';

function Header() {
  return (
    <div className="min-w-screen background-banner md:h-2/4 flex flex-col items-center justify-center w-full flex items-center justify-center flex-col md:flex-row">
      <div className="flex flex-col items-center md:items-start p-4 md:p-0">
        <a href="http://www.tecnoeste.net" target="_blank" rel="noreferrer">
          <img src={LogoTecnoeste} alt="logo tecnoeste" />
        </a>
        <span className="text-white font-semibold text-2xl my-4">TODA LOJA COM 10% DE DESCONTO
          <br />
          <span className="text-white text-sm my-4">
            *Exceto itens que já estão na promoção da CS Challenge, Pneus, MR e VTS*
          </span>

          <br />Promoção <b>ESTENDIDA ATÉ 30/11/2021</b>
        </span>
        <div>
          <div className="flex md:hidden lg:hidden xl:hidden">
            <ScrollTo>
              {({ scroll }) => (
                <button
                  type="button"
                  onClick={() => scroll({ y: 600, smooth: true })}
                  className="bg-secondary px-4 py-2 font-semibold text-primary text-2xl rounded"
                >
                  <span>COMPRAR AGORA</span>
                </button>
              )}
            </ScrollTo>

          </div>
          <div className="hidden md:flex lg:flex xl:flex">
            <ScrollTo>
              {({ scroll }) => (
                <button
                  type="button"
                  onClick={() => scroll({ y: 300, smooth: true })}
                  className="bg-secondary px-4 py-2 font-semibold text-primary text-2xl rounded"
                >
                  <span>COMPRAR AGORA</span>
                </button>
              )}
            </ScrollTo>

          </div>
        </div>
      </div>
      <div className="flex flex-col md:w-1/3 items-start">
        <img src={NovembroLogo} alt="logo tecnoeste" />
      </div>
    </div>
  );
}

export default Header;
