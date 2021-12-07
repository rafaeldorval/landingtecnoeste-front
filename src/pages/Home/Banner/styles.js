import styled, { keyframes } from 'styled-components';
import { pulse } from 'react-animations';

const bounceAnimation = keyframes`${pulse}`;

export const BouncyDiv = styled.div`
  animation: infinite 1s ${bounceAnimation};
  cursor: pointer;
`;
