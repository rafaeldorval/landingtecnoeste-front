/* eslint-disable func-names */
/* eslint-disable consistent-return */
export default function (lojaId) {
  if (lojaId === '0001') {
    return {
      rua: 'Av Gury Marques',
      numero: '5526',
      bairro: '',
      cep: '79071390',
      estado: 'MS',
      cidade: 'Campo Grande',
    };
  }

  if (lojaId === '0002') {
    return {
      rua: 'Av Fernando Correa Da Costa',
      numero: '2360',
      bairro: '',
      cep: '78070000',
      estado: 'MT',
      cidade: 'Cuiaba',
    };
  }

  if (lojaId === '0012') {
    return {
      rua: 'Rua João Pedro Moreira de Carvalho',
      numero: '2151',
      bairro: '',
      cep: '78559349',
      estado: 'MT',
      cidade: 'Sinop',
    };
  }

  if (lojaId === '0014') {
    return {
      rua: 'Av. Marcelino Píres',
      numero: '7520',
      bairro: '',
      cep: '79801004',
      estado: 'MS',
      cidade: 'Dourados',
    };
  }
}
