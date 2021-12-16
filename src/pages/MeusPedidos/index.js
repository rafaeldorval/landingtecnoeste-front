import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import { FaSearch } from 'react-icons/fa';
import ClientAction from '../../store/ducks/client';

import Header from '../../components/Header';
import DataTable from '../../components/DataTable';
import { isAuthenticated } from '../../services/auth';
import PecasModal from './PecasModal';

export default function MeusPedidos() {
  const dispatch = useDispatch();
  const clientData = useSelector((store) => store.client.clientData);
  const pedidosData = useSelector((store) => store.client.pedidosData);
  const [modalPecasDetail, setModalPecasDetail] = useState(false);
  const [pedidoSelect, setPedidoSelect] = useState(null);

  function handlePecasModal(rowData) {
    setPedidoSelect(rowData);

    setTimeout(() => {
      setModalPecasDetail(true);
    }, 200);
  }

  const columns = [
    { title: 'Nº Pedido', field: 'leadNumber' },
    {
      title: 'Criado em',
      render: (rowData) => (
        <span>
          {format(parseISO(rowData.createdAt), 'dd/MM/yyyy')}
        </span>
      ),
    },
    { title: 'Meio de pagamento', field: 'formaPgmName' },
    {
      title: 'Total',
      render: (rowData) => (
        <span>
          R$ {rowData.valorFator}
        </span>
      ),
    },
    {
      title: 'Ação',
      render: (rowData) => (
        <button
          type="button"
          className="bg-secondaryDark p-2 rounded"
          onClick={() => handlePecasModal(rowData)}
        >
          <FaSearch />
        </button>
      ),
    },
  ];

  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(ClientAction.getClientInfoRequest());
      dispatch(ClientAction.getPedidosClientRequest());
    }
  }, []);

  return (
    <div>
      <Header showUserAction={false} stickOff />
      <div className="p-12">
        <h3 className="font-bold text-2xl">Seus dados</h3>
        {clientData && (
          <div className="w-full border-t-2 border-b-2 py-4 mt-8">
            <section className="flex flex-row items-center">
              <h3 className="font-semibold text-secondaryDark">Nome:</h3>
              <h3 className="ml-2 font-semibold text-lg capitalize">{clientData.nome}</h3>
            </section>
            <section className="flex flex-row items-center">
              <h3 className="font-semibold text-secondaryDark">Celular:</h3>
              <h3 className="ml-2 font-semibold text-lg">{clientData.celular}</h3>
            </section>
            <section className="flex flex-row items-center">
              <h3 className="font-semibold text-secondaryDark">Email:</h3>
              <h3 className="ml-2 font-semibold text-lg">{clientData.email}</h3>
            </section>
          </div>
        )}
        <h3 className="font-bold text-2xl mt-4">Seus pedidos</h3>
        {pedidosData && (
          <DataTable
            title=""
            columns={columns}
            data={pedidosData}
          />
        )}
      </div>
      <PecasModal
        pecasData={pedidoSelect}
        modalPecasDetail={modalPecasDetail}
        setModalPecasDetail={setModalPecasDetail}
      />
    </div>
  );
}
