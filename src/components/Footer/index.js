import React from 'react';

import LogoTecnoeste from '../../assets/images/logotecnoestemono.png';

function SectionFooter() {
  return (
    <div className="min-w-screen bg-black p-16 h-20 items-center flex justify-center flex-col">
      <img src={LogoTecnoeste} alt="logo tecnoeste" />
      <p className="text-primary">® Todos os direitos reservados.</p>
    </div>
  );
}

export default SectionFooter;
