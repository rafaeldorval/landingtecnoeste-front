import React from 'react';

import LogoTecnoeste from '../../assets/images/logotecnoeste.png';

function SectionFooter() {
  return (
    <div className="min-w-screen w-full bg-black h-18 p-2 sticky sticky top-0 flex-row justify-start items-center">
      <a href="http://www.tecnoeste.net" target="_blank" rel="noreferrer">
        <img src={LogoTecnoeste} alt="logo tecnoeste" />
      </a>
    </div>
  );
}

export default SectionFooter;
