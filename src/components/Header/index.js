import React from 'react';

import LogoTecnoeste from '../../assets/images/logotecnoeste.png';

function Header() {
  return (
    <div className="min-w-screen bg-primary p-12 h-20 items-center flex justify-center flex-row">
      <a href="http://www.tecnoeste.net" target="_blank" rel="noreferrer">
        <img src={LogoTecnoeste} alt="logo tecnoeste" />
      </a>
    </div>
  );
}

export default Header;
