import React from 'react';
import { ScrollTo } from 'react-scroll-to';
import './style.css';

export default function Body() {
  const classNamesTitles = 'text-white flex flex-row items-center font-semibold';
  const classNamesSubtitle = 'text-secondary font-bold text-xl ml-2';

  return (
    <div className="min-w-screen body-banner-bg flex flex-col items-start justify-center p-12 md:py-36 md:px-36">
      <h3 className="text-secondary text-4xl font-bold">ESPECIFICAÇÕES TÉCNICAS PARA SD110B</h3>
      <span className="text-white flex flex-row items-center mb-8">
        Estas são as principais especificações desse modelo do produto.
      </span>
      <span className={classNamesTitles}>
        Peso operacional (com ROPS)
        <h3 className={classNamesSubtitle}>10.700 kg</h3>
      </span>
      <span className={classNamesTitles}>
        Peso operacional (com ROPS, incl. cabine e raspador interno)
        <h3 className={classNamesSubtitle}>11.100 kg</h3>
      </span>
      <span className={classNamesTitles}>
        Força centrífuga
        <h3 className={classNamesSubtitle}>208/258 kN</h3>
      </span>
      <span className={classNamesTitles}>
        Frequência de vibração
        <h3 className={classNamesSubtitle}>34/31 Hz</h3>
      </span>
      <span className={classNamesTitles}>
        Potência nominal do motor
        <h3 className={classNamesSubtitle}>99 kW</h3>
      </span>
      <span className={classNamesTitles}>
        Amplitude
        <h3 className={classNamesSubtitle}>1,97/1,36 mm</h3>
      </span>
      <span className={classNamesTitles}>
        Largura do cilindro
        <h3 className={classNamesSubtitle}>2.134 mm</h3>
      </span>
      <span className={classNamesTitles}>
        Ângulo da articulação
        <h3 className={classNamesSubtitle}>+/-38 graus</h3>
      </span>
      <span className={classNamesTitles}>
        Ângulo da oscilação
        <h3 className={classNamesSubtitle}>+/-15 graus</h3>
      </span>
      <ScrollTo>
        {({ scroll }) => (
          <button
            type="button"
            onClick={() => scroll({ y: 3800, smooth: true })}
            className="bg-secondary mt-12 px-6 py-4 font-semibold text-primary text-4xl rounded"
          >
            <span>SABER PREÇO</span>
          </button>
        )}
      </ScrollTo>
    </div>
  );
}
