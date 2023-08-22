import React from 'react';
import './style.css';
import './customborder.scss';

export default function SeloPreco({ preco }) {
  return (
    <div
      className="flex flex-col items-end justify-center"
      style={{
        width: '150px',
      }}
    >
      <div className="">
        <div className="">
          <section className="gradient-border">
            <h1>{preco}%</h1>
            <h2>OFF</h2>
          </section>
        </div>
      </div>
      {/* <div className="circle-wrapper">
        <div className="warning circle">
          <section className="icon">
            <h1>{preco}%</h1>
            <h2>OFF</h2>
          </section>
        </div>
      </div> */}
    </div>
  );
}
