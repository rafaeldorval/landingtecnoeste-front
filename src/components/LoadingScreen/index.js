import React from 'react';
import ReactLoading from 'react-loading';
// import { Container } from './styles';

export default function LoadingScreen() {
  return (
    <div className="fixed h-full w-full z-50 bg-primary bg-opacity-75 flex flex-col items-center justify-center">
      <ReactLoading type="spin" color="#E6BF27" height={300} width={120} />
    </div>
  );
}
