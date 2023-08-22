/* eslint-disable consistent-return */
import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ClientActions from '../../store/ducks/client';
import NavigationActions from '../../store/ducks/navigation';
import { useQuery } from '../../hooks/useQuery';
import Header from '../../components/Header';

// import { Container } from './styles';

export default function RecoveryPassword() {
  const cookie = new Cookies();
  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();
  const invalidAccontToken = useSelector(
    (store) => store.client.invalidAccontToken,
  );

  useEffect(() => {
    const tokenRecovery = query.get('token');
    const userId = query.get('user');

    dispatch(NavigationActions.setNavigation(history));

    if (!tokenRecovery && !userId) {
      return dispatch(ClientActions.setInvalidAccontToken(true));
    }

    dispatch(ClientActions.accontTokenVerifyRequest({
      token: tokenRecovery,
      userId,
    }));
  }, []);

  return (
    <div className="w-full">
      <Header showUserAction={false} stickOff />
      {invalidAccontToken ? (
        <div className="flex flex-col items-center justify-center h-full mt-12">
          <div className="flex flex-col items-center bg-white p-12 shadow-lg w-2/3 h-1/3">
            <h3 className="font-bold text-3xl">Token de verificação invalido</h3>
            <p className="font-thin text-xl mt-2">O token informado é invalido, ou esta vencido, solicite outro novamente.</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full mt-12">
          <div className="flex flex-col items-center bg-white p-12 shadow-lg w-2/3 h-1/3">
            <h3 className="font-bold text-3xl">Conta ativada com sucesso</h3>
            <p className="font-thin text-xl mt-2">Sua conta foi ativada com sucesso, agora você utilizar sua conta para acessar o nosso site e nosso aplicativo.</p>
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
      )}
    </div>
  );
}
