import React from 'react';

import './style.css';

function SectionBanner() {
  return (
    <div className="min-w-screen section-banner-bg p-10 flex flex-col items-center justify-center py-12">
      <h3 className="text-2xl md:text-4xl font-bold text-white">Realize o cadastro e</h3>
      <h3 className="text-4xl md:text-6xl font-bold text-white text-center">FAÇA SEU ORÇAMENTO!</h3>
    </div>
  );
}

export default SectionBanner;
