/* eslint-disable consistent-return */
import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NavigationActions from '../../store/ducks/navigation';
import Header from '../../components/Header';

// import { Container } from './styles';

export default function FinishRegister() {
  const cookie = new Cookies();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(NavigationActions.setNavigation(history));
  }, []);

  return (
    <div className="w-full">
      <Header showUserAction={false} stickOff />
      <div className="flex flex-col items-center justify-center h-full mt-12">
        <div className="flex flex-col items-center bg-white p-12 shadow-lg w-2/3 h-1/3">
          <h3 className="font-bold text-3xl">Cadastro finalizado com sucesso</h3>
          <p className="font-thin text-xl mt-2">Se o email informado for valido, em breve você recebera um email para confirmação de conta.</p>
          <button
            onClick={() => {
              const queryV = cookie.get('v');
              const queryO = cookie.get('o');
              history.push(`/app?${queryV ? `v=${queryV}&` : ''}${queryO ? `o=${queryO}` : ''}`);
            }}
            className={`
              bg-secondary
              py
              px-8
              rounded
              mt-4
              flex
              flex-row
              align-center
              justify-center
              border-2
              w-3/4
            `}
            type="button"
          >
            <p className="font-bold text-xl">
              Voltar para a tela inicial
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
