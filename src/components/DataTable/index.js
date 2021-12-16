import React from 'react';
import MaterialTable from 'material-table';

export default function DataTable({ columns, data, title }) {
  return (
    <MaterialTable
      title={title}
      columns={columns}
      data={data}
      style={{
        boxShadow: 'none',
      }}
      localization={{
        body: {
          emptyDataSourceMessage: 'Sem pedidos',
        },
        toolbar: {
          searchPlaceholder: 'Pesquisar',
          searchTooltip: 'Pesquisar',
        },
        pagination: {
          labelDisplayedRows: '{from}-{to} de {count}',
          labelRowsSelect: 'Pedidos',
          firstAriaLabel: 'Primeira página',
          firstTooltip: 'Primeira página',
          previousAriaLabel: 'Página anterior',
          previousTooltip: 'Página anterior',
          nextAriaLabel: 'Próxima página',
          nextTooltip: 'Próxima página',
          lastAriaLabel: 'Ultima página',
          lastTooltip: 'Ultima página',
        },
      }}
      options={{
        pageSize: 5,
        pageSizeOptions: [10, 20, 30, 50],
        draggable: false,
        thirdSortClick: false,
      }}
    />
  );
}
