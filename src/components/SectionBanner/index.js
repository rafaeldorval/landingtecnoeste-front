import React from 'react';

import './style.css';

function SectionBanner() {
  return (
    <div className="min-w-screen section-banner-bg p-8 flex items-center justify-center flex-col py-4">
      <h3 className="text-4xl font-bold text-white">Realize o cadastro acima</h3>
      <h3 className="text-4xl font-bold text-primary mb-2">E iremos te avisar assim que tivermos novidade.</h3>
      <p className="text-primary">® Todos os direitos reservados.</p>
    </div>
  );
}

export default SectionBanner;
