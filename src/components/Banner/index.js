import React from 'react';
import { ScrollTo } from 'react-scroll-to';
import './styles.css';
import SeloLogoImg from '../../assets/images/selo.png';

function Banner() {
  return (
    <div className="py-20 min-w-screen background-banner md:h-3/4 flex flex-col items-center justify-center w-full flex items-center justify-center flex-col md:flex-row">
      <div className="flex flex-col items-center p-4 md:p-0 md:w-2/4 container-banner">
        <div className="flex flex-col items-start w-full">
          <span className="text-secondary font-semibold text-2xl">COMPACTADORES DE SOLO</span>
          <span className="text-white font-bold text-6xl my-4">VOLVO SD110B</span>
          <span className="text-white font-semibold text-xl mb-8">O Compactador de solo Volvo SD110B é fabricado para durar, graças aos componentes de alta qualidade da Volvo. Esse compactador durável apresenta uma robusta estrutura de aço, um cilindro e um chassi resilientes e um excelente sistema hidráulico, que trabalham juntos para que você consiga enfrentar os trabalhos mais difíceis por um tempo maior.</span>
        </div>
        <div>
          <div className="flex md:hidden lg:hidden xl:hidden">
            <ScrollTo>
              {({ scroll }) => (
                <button
                  type="button"
                  onClick={() => scroll({ y: 600, smooth: true })}
                  className="bg-secondary px-4 py-2 font-semibold text-primary text-2xl rounded"
                >
                  <span>SABER PREÇO</span>
                </button>
              )}
            </ScrollTo>

          </div>
          <div className="hidden md:flex lg:flex xl:flex">
            <ScrollTo>
              {({ scroll }) => (
                <button
                  type="button"
                  onClick={() => scroll({ y: 3800, smooth: true })}
                  className="bg-secondary px-6 py-4 font-semibold text-primary text-4xl rounded"
                >
                  <span>SABER PREÇO</span>
                </button>
              )}
            </ScrollTo>

          </div>
        </div>
      </div>
      <img className="-mr-6 md:mr-0 selo-logo top-20" src={SeloLogoImg} alt="selo logo" />
    </div>
  );
}

export default Banner;
