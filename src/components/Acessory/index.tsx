import React from 'react';
import { SvgProps } from 'react-native-svg';

import * as S from './styles';

interface IAcessoryProps {
  icon: React.FC<SvgProps>;
  name: string;
}

export function Acessory({ icon: Icon, name }: IAcessoryProps) {
  return (
    <S.Container>
      <Icon width={32} height={32} />
      <S.Name>{name}</S.Name>
    </S.Container>
  );
}