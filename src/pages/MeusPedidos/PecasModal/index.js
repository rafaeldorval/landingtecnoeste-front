import React from 'react';
import { Img } from 'react-image';
import ModalComponent from '../../../components/ModalComponent';
import ScrollContainer from '../../../components/ScrollComponent';
import FallBackImage from '../../../assets/images/imgfallback.png';

export default function PecasModal({ modalPecasDetail, setModalPecasDetail, pecasData }) {
  return (
    <ModalComponent
      openState={modalPecasDetail}
      closeAction={() => setModalPecasDetail(!modalPecasDetail)}
      width="80%"
      height="80%"
    >
      <div className="w-full h-full flex flex-col">
        <section className="w-full p-2 flex flex-row justify-between">
          <h3 className="font-bold text-xl">Peças do pedido</h3>
          <button type="button" onClick={() => setModalPecasDetail(!modalPecasDetail)}>
            <h3 className="font-bold">Fechar</h3>
          </button>
        </section>
        <div className="p-4 h-full w-full">
          <ScrollContainer>
            {pecasData && pecasData.produtos.map((prod) => (
              <section
                key={prod.ref}
                className={`
                  flex
                  w-full
                  flex-row
                  items-start
                  mb-2
                  border-b-2
                  pb-2
                  mt-2
              `}
              >
                <Img
                  src={
                  [
                    prod.imgData,
                    FallBackImage,
                  ]
                }
                  style={{
                    width: '75px',
                  }}
                />
                <div className="flex w-3/4 flex-col">
                  <p className="w-3/5 text-primary font-bold truncate">{prod.nome}</p>
                  <h3 className="font-bold">Qtd: {prod.qtd}</h3>
                  <h3 className="font-bold">Ref: {prod.ref}</h3>
                </div>
              </section>
            ))}
          </ScrollContainer>
        </div>
      </div>
    </ModalComponent>
  );
}
