import React from 'react';
import { BackButton } from '../../Components/BackButton';

import * as S from './styles';

export function CarDetails() {
  return (
    <S.Container>
      <S.Header>
        <BackButton />
      </S.Header>
    </S.Container>
  );
}