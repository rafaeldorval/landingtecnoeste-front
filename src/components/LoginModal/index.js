import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClientActions from '../../store/ducks/client';
import ModalComponent from '../ModalComponent';

// import { Container } from './styles';

export default function LoginModal() {
  const dispatch = useDispatch();
  const loginModal = useSelector((store) => store.client.loginModalStatus);
  return (
    <ModalComponent
      openState={loginModal}
      closeAction={() => dispatch(ClientActions.setLoginModalStatus(!loginModal))}
      width="90%"
      height="90%"
    >
      <h3>Login modal</h3>
    </ModalComponent>
  );
}
