import React from 'react';
// import { ScrollTo } from 'react-scroll-to';

// import NovembroLogo from '../../../assets/images/novlogo.png';
import Logotecnoestemono from '../../../assets/images/logotecnoestemono.png';
import Logoesq from '../../../assets/images/logoesq.png';
import Logodir from '../../../assets/images/logodir.png';
import './styles.css';

function Header() {
  return (
    <div className="min-w-screen background-home-banner md:h-2/4  w-full flex items-center justify-center flex-col">
      {/* <div className="flex flex-col items-center md:items-start p-4 md:p-0">
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
      </div> */}
      <img src={Logotecnoestemono} alt="logo tecnoeste" className="home-img-tecnoeste-logo" />
      <div className="flex flex-row w-full justify-center">
        <div className="flex flex-col md:w-1/3 items-center">
          <img src={Logoesq} alt="logo tecnoeste" className="home-img-logo" />
        </div>
        <div className="flex flex-col md:w-1/3 items-center">
          <img src={Logodir} alt="logo tecnoeste" className="home-img-logo" />
        </div>
      </div>
    </div>
  );
}

export default Header;
