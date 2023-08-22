import React from 'react';
import bodyData from './bodyData';

export default function BodySection() {
  return (
    <div className="min-w-screen flex flex-col items-center justify-center p-4 md:p-14">
      <h3 className="text-primary text-4xl font-bold text-center mb-8">RECURSOS E BENEFÍCIOS</h3>
      <div className="flex flex-col md:flex-row md:p-12">
        {bodyData.map((card) => (
          <div className="w-full md:w-1/3 flex flex-col items-center mb-14 md:mb">
            <img
              src={card.img}
              alt="imagem do card"
              style={{
                width: '226px',
                height: '116px',
              }}
            />
            <h3 className="h-16 font-bold text-primary text-2xl text-center mb-4 mt-2">{card.title}</h3>
            <span className="text-justify w-4/5">{card.des}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
